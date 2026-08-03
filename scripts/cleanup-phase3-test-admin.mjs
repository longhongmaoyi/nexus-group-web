import { PrismaClient } from '@prisma/client'

const email = String(process.env.PHASE3_TEST_ADMIN_EMAIL || '').trim().toLowerCase()
if (!email.startsWith('release-a-test+') || !email.endsWith('@nexuslife.ca')) {
  throw new Error('Refusing to delete a non-disposable administrator.')
}

const prisma = new PrismaClient()
try {
  const deleted = await prisma.adminUser.deleteMany({ where: { email } })
  console.log(`Disposable local administrators removed: ${deleted.count}.`)
} finally {
  await prisma.$disconnect()
}
