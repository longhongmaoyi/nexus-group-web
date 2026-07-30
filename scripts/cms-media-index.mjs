import { stat, readdir } from 'node:fs/promises'
import path from 'node:path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const root = path.resolve(process.cwd(), 'public/images')
const contentTypes = {
  '.avif': 'image/avif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
}

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolute = path.join(directory, entry.name)
    return entry.isDirectory() ? files(absolute) : [absolute]
  }))
  return nested.flat()
}

function label(filename) {
  return path.basename(filename, path.extname(filename))
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
    .slice(0, 300)
}

try {
  let indexed = 0
  for (const absolute of await files(root)) {
    const extension = path.extname(absolute).toLowerCase()
    const contentType = contentTypes[extension]
    if (!contentType) continue
    const relative = path.relative(root, absolute).split(path.sep).join('/')
    const url = `/images/${relative}`
    const details = await stat(absolute)
    const alt = label(relative)
    await prisma.mediaAsset.upsert({
      where: { url },
      create: {
        url,
        pathname: `public/images/${relative}`,
        originalName: path.basename(relative),
        contentType,
        sizeBytes: details.size,
        altEn: alt,
        altZh: alt,
        altFr: alt,
        storageProvider: 'STATIC_PUBLIC',
      },
      update: {
        contentType,
        sizeBytes: details.size,
      },
    })
    indexed += 1
  }
  console.log(`Indexed ${indexed} existing public images without modifying the files.`)
} finally {
  await prisma.$disconnect()
}
