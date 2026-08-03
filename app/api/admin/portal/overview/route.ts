import { NextResponse } from 'next/server'

import { getAdminSession } from '@/lib/admin-auth'
import { getPrisma } from '@/lib/prisma'
import { isPhase4AdminEnabled } from '@/lib/portal-auth'

export async function GET() {
  if (!isPhase4AdminEnabled()) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const admin = await getAdminSession()
  if (admin?.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const prisma = await getPrisma()
  const [tenants, projects, quotations, documents, suppliers, products, audits] = await Promise.all([
    prisma.portalTenant.findMany({ include: { memberships: { include: { user: { select: { id: true, email: true, name: true, status: true } } } } }, orderBy: { createdAt: 'desc' } }),
    prisma.portalProject.findMany({ include: { tenant: { select: { name: true, slug: true, type: true } } }, orderBy: { updatedAt: 'desc' }, take: 100 }),
    prisma.portalQuotation.findMany({ include: { tenant: { select: { name: true, slug: true } }, project: { select: { title: true } }, decisions: { orderBy: { createdAt: 'desc' }, take: 1 } }, orderBy: { updatedAt: 'desc' }, take: 100 }),
    prisma.portalDocument.findMany({ select: { id: true, tenantId: true, projectId: true, supplierId: true, productId: true, name: true, category: true, contentType: true, sizeBytes: true, visibility: true, status: true, libraryPublishedAt: true, verifiedAt: true, createdAt: true, tenant: { select: { name: true, type: true } } }, orderBy: { createdAt: 'desc' }, take: 100 }),
    prisma.supplier.findMany({ where: { portalTenantId: { not: null } }, orderBy: { createdAt: 'desc' } }),
    prisma.product.findMany({ where: { status: 'PUBLISHED' }, select: { id: true, titleEn: true, sku: true, category: true }, orderBy: { titleEn: 'asc' } }),
    prisma.portalAuditEvent.findMany({ include: { tenant: { select: { name: true } } }, orderBy: { createdAt: 'desc' }, take: 30 }),
  ])
  return NextResponse.json({ tenants, projects, quotations, documents, suppliers, products, audits })
}
