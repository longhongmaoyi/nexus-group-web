import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildMediaAssetPersistenceData,
  extractMediaReferences,
  MAX_IMAGE_SIZE_BYTES,
  parseMediaUploadTokenPayload,
  sanitizeMediaFilename,
  serializeMediaUploadTokenPayload,
  validateMediaUploadInput,
} from '../lib/cms-media-core.mjs'

test('media uploads accept only bounded multilingual web images', () => {
  const valid = validateMediaUploadInput({
    originalName: 'Remote Camp.JPG',
    contentType: 'image/jpeg',
    sizeBytes: 250_000,
    alt: { en: 'Remote camp', zh: '远程营地', fr: 'Camp éloigné' },
  })
  assert.equal(valid.contentType, 'image/jpeg')
  assert.equal(valid.altZh, '远程营地')
  assert.throws(() => validateMediaUploadInput({
    originalName: 'payload.svg',
    contentType: 'image/svg+xml',
    sizeBytes: 100,
    alt: { en: 'x', zh: 'x', fr: 'x' },
  }), /Only AVIF/)
  assert.throws(() => validateMediaUploadInput({
    originalName: 'huge.jpg',
    contentType: 'image/jpeg',
    sizeBytes: MAX_IMAGE_SIZE_BYTES + 1,
    alt: { en: 'x', zh: 'x', fr: 'x' },
  }), /10 MB/)
})

test('client media payload survives the Blob token callback contract', () => {
  const clientPayload = {
    originalName: 'Remote Camp.JPG',
    contentType: 'image/jpeg',
    sizeBytes: 250_000,
    alt: { en: 'Remote camp', zh: '远程营地', fr: 'Camp éloigné' },
  }
  const validated = validateMediaUploadInput(clientPayload)
  const tokenPayload = serializeMediaUploadTokenPayload(validated, 'admin-123')
  const parsed = parseMediaUploadTokenPayload(tokenPayload)

  assert.deepEqual(parsed, {
    ...validated,
    uploadedById: 'admin-123',
  })
  assert.deepEqual(JSON.parse(tokenPayload).alt, clientPayload.alt)
})

test('Blob callback accepts legacy flattened alt fields without weakening client validation', () => {
  const legacy = parseMediaUploadTokenPayload({
    originalName: 'legacy.png',
    contentType: 'image/png',
    sizeBytes: 68,
    altEn: 'Archived test image',
    altZh: '已归档测试图像',
    altFr: 'Image de test archivée',
    uploadedById: 'admin-legacy',
  })
  assert.equal(legacy.altFr, 'Image de test archivée')
  assert.throws(() => validateMediaUploadInput({
    originalName: 'legacy.png',
    contentType: 'image/png',
    sizeBytes: 68,
    altEn: 'flat fields are not a valid client payload',
    altZh: '无效',
    altFr: 'invalide',
  }), /Alt text is required/)
})

test('validated callback metadata maps exactly to media persistence fields', () => {
  const input = parseMediaUploadTokenPayload(serializeMediaUploadTokenPayload(
    validateMediaUploadInput({
      originalName: 'camp.webp',
      contentType: 'image/webp',
      sizeBytes: 2048,
      alt: { en: 'Camp', zh: '营地', fr: 'Campement' },
    }),
    'admin-456',
  ))
  const data = buildMediaAssetPersistenceData({
    input,
    blob: {
      downloadUrl: 'https://blob.example/camp.webp?download=1',
      pathname: 'cms/camp.webp',
      etag: 'etag-123',
    },
    details: { contentType: 'image/webp', size: 2048 },
  })
  assert.deepEqual(data, {
    downloadUrl: 'https://blob.example/camp.webp?download=1',
    pathname: 'cms/camp.webp',
    originalName: 'camp.webp',
    contentType: 'image/webp',
    sizeBytes: 2048,
    altEn: 'Camp',
    altZh: '营地',
    altFr: 'Campement',
    storageProvider: 'VERCEL_BLOB',
    etag: 'etag-123',
    createdById: 'admin-456',
  })
})

test('media filenames are normalized and extensions follow verified MIME types', () => {
  assert.equal(sanitizeMediaFilename('../../Remote Camp FINAL.PNG', 'image/webp'), 'remote-camp-final.webp')
  assert.throws(() => sanitizeMediaFilename('diagram.svg', 'image/svg+xml'), /Unsupported/)
})

test('media reference extraction finds section and item usage without URLs', () => {
  const references = extractMediaReferences([
    {
      key: 'hero',
      content: {
        mediaId: 'cm123456789',
        items: [
          { mediaId: 'cm987654321' },
          { image: '/images/static.jpg' },
        ],
      },
    },
  ])
  assert.deepEqual(references, [
    { assetId: 'cm123456789', sectionKey: 'hero', fieldPath: 'image' },
    { assetId: 'cm987654321', sectionKey: 'hero', fieldPath: 'items.0.image' },
  ])
})
