type PrismaLike = {
  inquiry: {
    create: (args: unknown) => Promise<{ id: string; createdAt: Date }>
  }
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaLike }

export async function getPrisma(): Promise<PrismaLike> {
  if (globalForPrisma.prisma) return globalForPrisma.prisma

  // A non-literal dynamic import keeps the project type-checkable before
  // `prisma generate` has run. After npm install/postinstall, this resolves
  // to the generated Prisma Client in the normal way.
  const moduleName: string = '@prisma/client'
  const prismaModule = (await import(moduleName)) as { PrismaClient: new (options?: unknown) => PrismaLike }
  const client = new prismaModule.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client
  return client
}
