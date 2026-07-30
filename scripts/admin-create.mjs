import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth-core.mjs'

const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase()
const password = String(process.env.ADMIN_PASSWORD || '')
const name = String(process.env.ADMIN_NAME || 'NEXUS Administrator').trim()

if (!email.includes('@')) throw new Error('Set ADMIN_EMAIL to a valid address.')
if (password.length < 12) throw new Error('Set ADMIN_PASSWORD to at least 12 characters.')

const prisma = new PrismaClient()
try {
  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { name, passwordHash: hashPassword(password) },
    create: { email, name, passwordHash: hashPassword(password), role: 'ADMIN' },
    select: { id: true, email: true, role: true },
  })
  console.log(`Admin ready: ${user.email} (${user.role})`)
} finally {
  await prisma.$disconnect()
}
