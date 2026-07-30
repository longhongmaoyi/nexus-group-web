declare module '@/lib/cms-media-core.mjs' {
  export const MAX_IMAGE_SIZE_BYTES: number
  export const ALLOWED_IMAGE_TYPES: readonly string[]
  export type ValidatedMediaUpload = {
    originalName: string
    contentType: string
    sizeBytes: number
    altEn: string
    altZh: string
    altFr: string
  }
  export type MediaUploadTokenPayload = ValidatedMediaUpload & {
    uploadedById: string
  }
  export type BlobUploadDetails = {
    contentType?: string | null
    size: number
  }
  export type BlobUploadResult = {
    downloadUrl: string
    pathname: string
    etag: string
  }
  export type MediaAssetPersistenceData = {
    downloadUrl: string
    pathname: string
    originalName: string
    contentType: string
    sizeBytes: number
    altEn: string
    altZh: string
    altFr: string
    storageProvider: 'VERCEL_BLOB'
    etag: string
    createdById: string | null
  }
  export type ExtractedMediaReference = {
    assetId: string
    sectionKey: string
    fieldPath: string
  }
  export function sanitizeMediaFilename(value: unknown, contentType?: string): string
  export function validateMediaUploadInput(value: unknown): ValidatedMediaUpload
  export function serializeMediaUploadTokenPayload(input: ValidatedMediaUpload, uploadedById?: string): string
  export function parseMediaUploadTokenPayload(value: unknown): MediaUploadTokenPayload
  export function buildMediaAssetPersistenceData(input: {
    input: MediaUploadTokenPayload
    blob: BlobUploadResult
    details: BlobUploadDetails
  }): MediaAssetPersistenceData
  export function extractMediaReferences(sections: unknown): ExtractedMediaReference[]
}
