import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { getAdminSession, isSameOrigin } from '@/lib/admin-auth'
import { asJson, getCmsPageDraft, snapshotFromDraft } from '@/lib/cms'
import { validatePageInput } from '@/lib/cms-validation'
import { getPrisma } from '@/lib/prisma'

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  if (!getAdminSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  try {
    const draft = await getCmsPageDraft(params.slug)
    if (!draft) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    validatePageInput(draft)
    const snapshot = snapshotFromDraft(draft)
    const prisma = await getPrisma()
    await prisma.cmsPage.update({
      where: { slug: params.slug },
      data: { status: 'PUBLISHED', publishedAt: new Date(snapshot.publishedAt), publishedSnapshot: asJson(snapshot) },
    })
    for (const locale of ['en', 'zh', 'fr']) {
      revalidatePath(params.slug === 'home' ? `/${locale}` : `/${locale}/${params.slug}`)
    }
    return NextResponse.json({ ok: true, snapshot })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Publish failed' }, { status: 400 })
  }
}
