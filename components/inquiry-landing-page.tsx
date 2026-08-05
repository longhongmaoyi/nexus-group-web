import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { QuickInquiryForm, type InquiryMode } from '@/components/quick-inquiry-form'
import type { Locale } from '@/lib/i18n'

const heading = {
  call: { en: 'A quick first conversation.', zh: '一次简短的首次沟通。', fr: 'Un premier échange rapide.' },
  supplier: { en: 'Show us what the factory can document.', zh: '向我们说明工厂能够提供哪些证明。', fr: 'Montrez ce que l’usine peut documenter.' },
  partner: { en: 'Help build a reliable Canadian delivery network.', zh: '共同建设可靠的加拿大交付网络。', fr: 'Contribuez à un réseau de livraison canadien fiable.' },
} as const

const intro = {
  call: { en: 'Use this short form when you need to test an idea, explain a blocker or decide whether a full project brief is worth preparing.', zh: '当您需要验证想法、说明困难或判断是否值得准备完整项目简报时，请使用此简短表单。', fr: 'Utilisez ce formulaire pour tester une idée, expliquer un blocage ou décider si un dossier complet vaut la peine.' },
  supplier: { en: 'We review the legal company, factory, product file, quality records, testing, export readiness and after-sales plan before treating a supplier as project-ready.', zh: '在把供应商视为适合项目之前，我们会审查合法主体、工厂、产品档案、质量记录、测试、出口准备及售后计划。', fr: 'Nous examinons l’entreprise, l’usine, le dossier produit, la qualité, les essais, l’exportation et l’après-vente avant de considérer un fournisseur prêt.' },
  partner: { en: 'We want to hear from qualified Canadian professionals and delivery companies with clear regional experience and a practical service scope.', zh: '我们希望了解具备明确地区经验及实际服务范围的加拿大专业人士和交付企业。', fr: 'Nous souhaitons connaître des professionnels et entreprises de livraison qualifiés, avec une expérience régionale claire et une portée concrète.' },
} as const

export function InquiryLandingPage({ locale, mode }: { locale: Locale; mode: InquiryMode }) {
  return (
    <>
      <main className="min-h-screen bg-[#f4f1e9] text-[#11191b]">
        <section className="relative overflow-hidden bg-[#082328] pb-16 pt-40 text-white">
          <SiteHeader locale={locale} />
          <div className="mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-12">
            <p className="eyebrow text-[#b8d683]">NEXUS / CONTACT</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">{heading[mode][locale]}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{intro[mode][locale]}</p>
          </div>
        </section>
        <section className="mx-auto max-w-[1120px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <QuickInquiryForm locale={locale} mode={mode} />
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  )
}
