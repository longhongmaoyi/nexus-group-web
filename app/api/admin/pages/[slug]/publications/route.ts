import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import { getPrisma } from '@/lib/prisma'

export async function GET(_: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  if (!(await getAdminSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const prisma = await getPrisma()
  const page = await prisma.cmsPage.findUnique({
    where: { slug: params.slug },
    select: {
      id: true,
      publications: {
        orderBy: { version: 'desc' },
        take: 50,
        select: {
          id: true,
          version: true,
          note: true,
          sourcePublicationId: true,
          createdAt: true,
          publishedBy: { select: { email: true } },
        },
      },
    },
  })
  return page
    ? NextResponse.json(page.publications)
    : NextResponse.json({ error: 'Not found' }, { status: 404 })
}
