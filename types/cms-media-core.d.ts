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
  export type ExtractedMediaReference = {
    assetId: string
    sectionKey: string
    fieldPath: string
  }
  export function sanitizeMediaFilename(value: unknown, contentType?: string): string
  export function validateMediaUploadInput(value: unknown): ValidatedMediaUpload
  export function extractMediaReferences(sections: unknown): ExtractedMediaReference[]
}
