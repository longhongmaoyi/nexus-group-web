export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = Object.freeze([
  'image/avif',
  'image/jpeg',
  'image/png',
  'image/webp',
])

const extensionForType = Object.freeze({
  'image/avif': 'avif',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
})

export function sanitizeMediaFilename(value, contentType = '') {
  const raw = String(value || 'image').normalize('NFKD')
  const base = raw
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'image'
  const extension = extensionForType[contentType]
  if (!extension) throw new Error('Unsupported image type.')
  return `${base}.${extension}`
}

export function validateMediaUploadInput(value) {
  const record = value && typeof value === 'object' ? value : {}
  const originalName = String(record.originalName || '').trim().slice(0, 255)
  const contentType = String(record.contentType || '').trim().toLowerCase()
  const sizeBytes = Number(record.sizeBytes)
  const alt = record.alt && typeof record.alt === 'object' ? record.alt : {}
  const altEn = String(alt.en || '').trim().slice(0, 300)
  const altZh = String(alt.zh || '').trim().slice(0, 300)
  const altFr = String(alt.fr || '').trim().slice(0, 300)
  if (!originalName) throw new Error('Original filename is required.')
  if (!ALLOWED_IMAGE_TYPES.includes(contentType)) throw new Error('Only AVIF, JPEG, PNG and WebP images are allowed.')
  if (!Number.isInteger(sizeBytes) || sizeBytes <= 0 || sizeBytes > MAX_IMAGE_SIZE_BYTES) {
    throw new Error('Images must be between 1 byte and 10 MB.')
  }
  if (!altEn || !altZh || !altFr) throw new Error('Alt text is required in English, Chinese and French.')
  return { originalName, contentType, sizeBytes, altEn, altZh, altFr }
}

export function serializeMediaUploadTokenPayload(input, uploadedById = '') {
  return JSON.stringify({
    originalName: input.originalName,
    contentType: input.contentType,
    sizeBytes: input.sizeBytes,
    alt: {
      en: input.altEn,
      zh: input.altZh,
      fr: input.altFr,
    },
    uploadedById: String(uploadedById || ''),
  })
}

export function parseMediaUploadTokenPayload(value) {
  const record = typeof value === 'string'
    ? JSON.parse(value || '{}')
    : value && typeof value === 'object'
      ? value
      : {}
  const normalized = record.alt && typeof record.alt === 'object'
    ? record
    : {
        ...record,
        alt: {
          en: record.altEn,
          zh: record.altZh,
          fr: record.altFr,
        },
      }
  return {
    ...validateMediaUploadInput(normalized),
    uploadedById: String(record.uploadedById || ''),
  }
}

export function buildMediaAssetPersistenceData({ input, blob, details }) {
  return {
    downloadUrl: blob.downloadUrl,
    pathname: blob.pathname,
    originalName: input.originalName,
    contentType: details.contentType || input.contentType,
    sizeBytes: details.size,
    altEn: input.altEn,
    altZh: input.altZh,
    altFr: input.altFr,
    storageProvider: 'VERCEL_BLOB',
    etag: blob.etag,
    createdById: input.uploadedById || null,
  }
}

export function extractMediaReferences(sections) {
  const references = []
  for (const section of Array.isArray(sections) ? sections : []) {
    const sectionKey = String(section?.key || '')
    const content = section?.content || {}
    if (content.mediaId) {
      references.push({ assetId: String(content.mediaId), sectionKey, fieldPath: 'image' })
    }
    for (const [index, item] of (Array.isArray(content.items) ? content.items : []).entries()) {
      if (item?.mediaId) {
        references.push({ assetId: String(item.mediaId), sectionKey, fieldPath: `items.${index}.image` })
      }
    }
  }
  return references
}
