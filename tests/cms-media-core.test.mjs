import assert from 'node:assert/strict'
import test from 'node:test'
import {
  extractMediaReferences,
  MAX_IMAGE_SIZE_BYTES,
  sanitizeMediaFilename,
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
