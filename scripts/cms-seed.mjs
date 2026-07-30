import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const l = (en, zh, fr) => ({ en, zh, fr })
const item = (title, body, image, href, value) => ({ title, body, ...(image ? { image } : {}), ...(href ? { href } : {}), ...(value ? { value } : {}) })

const pages = [
  {
    slug: 'home', pageType: 'HOME', label: l('Home', '首页', 'Accueil'),
    seoTitle: l('Building Spaces. Creating Life.', '构筑空间，创造生活。', 'Bâtir des espaces. Créer la vie.'),
    seoDescription: l('Thoughtfully designed modular spaces for living, working and stronger communities.', '为生活、工作与社区精心设计的模块化空间。', 'Des espaces modulaires pour vivre, travailler et renforcer les collectivités.'),
    sections: [
      { key: 'hero', type: 'HERO', content: { title: l('Building Spaces. Creating Life.', '构筑空间，创造生活。', 'Bâtir des espaces. Créer la vie.'), body: l('Thoughtfully designed modular spaces that make everyday life simpler, more connected, and closer to nature.', '用心设计的模块化空间，让日常生活更简单、更紧密，也更亲近自然。', 'Des espaces modulaires soigneusement conçus pour une vie plus simple, plus connectée et plus proche de la nature.'), ctaLabel: l('Discover Our Story', '了解我们的故事', 'Découvrir notre histoire'), ctaHref: '/en/about', items: [
        item(l('Living together, naturally', '自然相伴，共同生活', 'Vivre ensemble, naturellement'), l('Hero image', '主图', 'Image principale'), '/images/nexus-lakeside-community-hero-v1.jpg'),
        item(l('Spaces made for real life', '为真实生活打造的空间', 'Des espaces faits pour la vraie vie'), l('Hero image', '主图', 'Image principale'), '/images/hero-slide-02.jpg'),
        item(l('Modular design with a human heart', '以人为本的模块化设计', 'Un design modulaire profondément humain'), l('Hero image', '主图', 'Image principale'), '/images/hero-slide-03.jpg'),
      ] } },
      { key: 'categories', type: 'FEATURE_GRID', content: { title: l('Spaces for every way of life', '适合每一种生活方式的空间', 'Des espaces pour chaque mode de vie'), body: l('Explore controlled NEXUS solution pathways.', '探索 NEXUS 解决方案路径。', 'Explorez les solutions NEXUS.'), items: [
        item(l('Living', '居住', 'Habitat'), l('Homes for modern life', '现代生活住宅', 'Des maisons pour la vie moderne'), '/images/modular-living.jpg', 'products'),
        item(l('Tourism', '旅游', 'Tourisme'), l('Spaces for travel and hospitality', '旅游与旅居空间', 'Espaces de voyage et d’accueil'), '/images/tourism.jpg', 'industries'),
        item(l('Business', '商业', 'Affaires'), l('Commercial spaces that grow with you', '与业务共同成长的商业空间', 'Des espaces commerciaux évolutifs'), '/images/commercial.jpg', 'products'),
        item(l('Work', '工作', 'Travail'), l('Workspaces that support people', '支持团队的工作空间', 'Des espaces qui soutiennent les équipes'), '/images/industrial.jpg', 'industries'),
        item(l('Wellness', '康养', 'Bien-être'), l('Spaces for health and care', '健康与关怀空间', 'Des espaces de santé et de soins'), '/images/project-cabin.jpg', 'products'),
        item(l('Community', '社区', 'Collectivité'), l('Places for connection and belonging', '连接与归属的场所', 'Des lieux de lien et d’appartenance'), '/images/nexus-community-evening-v1.jpg', 'industries'),
      ] } },
      { key: 'metrics', type: 'FEATURE_GRID', content: { title: l('NEXUS at a Glance', 'NEXUS 概览', 'NEXUS en bref'), body: l('A multilingual, coordinated platform.', '多语言协同平台。', 'Une plateforme multilingue et coordonnée.'), items: [
        item(l('Languages', '网站语言', 'Langues'), l('English, Chinese and French', '英文、中文和法文', 'Anglais, chinois et français'), undefined, undefined, '3'),
        item(l('Delivery stages', '交付阶段', 'Étapes de livraison'), l('Coordinated delivery', '协同交付', 'Livraison coordonnée'), undefined, undefined, '5'),
        item(l('Lifestyle pathways', '生活方式路径', 'Parcours de vie'), l('Controlled solutions', '可控解决方案', 'Solutions contrôlées'), undefined, undefined, '6'),
      ] } },
      { key: 'ecosystem', type: 'PROCESS', content: { title: l('Our Connected Ecosystem', '我们的协同生态', 'Notre écosystème intégré'), body: l('From global capability to local service, every step is coordinated around the people who will use the space.', '从全球能力到本地服务，每一步都围绕空间使用者进行协调。', 'De la capacité mondiale au service local, chaque étape est coordonnée autour des personnes.'), items: [
        item(l('Global sourcing', '全球寻源', 'Approvisionnement mondial'), l('Discover', '发现', 'Découvrir')),
        item(l('Product integration', '产品集成', 'Intégration produit'), l('Integrate', '集成', 'Intégrer')),
        item(l('Canadian assembly', '加拿大组装', 'Assemblage canadien'), l('Assemble', '组装', 'Assembler')),
        item(l('Local delivery', '本地交付', 'Livraison locale'), l('Deliver', '交付', 'Livrer')),
        item(l('Ongoing care', '持续支持', 'Soutien continu'), l('Support', '支持', 'Soutenir')),
      ] } },
      { key: 'featured', type: 'PROJECT', content: { title: l('Lakeview Retreat', '湖景度假区', 'Refuge Lakeview'), body: l('A nature-connected modular retreat designed around comfort, belonging and the landscape.', '围绕舒适、归属与自然景观打造的模块化度假社区。', 'Une retraite modulaire liée à la nature, pensée autour du confort et de l’appartenance.'), image: '/images/project-lake-hd-v1.jpg', ctaLabel: l('View Concept', '查看概念', 'Voir le concept'), ctaHref: '/en/projects' } },
      { key: 'closing', type: 'CTA', content: { title: l('One Platform. Endless Possibilities.', '一个平台，无限可能。', 'Une plateforme. Des possibilités infinies.'), body: l('For a better future, together.', '携手共创更美好的未来。', 'Ensemble, pour un avenir meilleur.'), image: '/images/nexus-community-evening-v1.jpg', ctaLabel: l('Start a Conversation', '开始沟通', 'Commencer une conversation'), ctaHref: '/en/contact', items: [] } },
    ],
  },
  ...[
    ['about', l('About Nexus Group', '关于 NEXUS 集团', 'À propos de NEXUS'), l('A modular solutions group built around integration.', '以集成为核心的模块化解决方案集团。', 'Un groupe de solutions modulaires fondé sur l’intégration.'), l('NEXUS combines global product capability with Canadian assembly and project execution.', 'NEXUS 融合全球产品能力、加拿大组装与项目落地。', 'NEXUS combine capacité mondiale, assemblage canadien et exécution de projets.')],
    ['assembly-centre', l('Assembly Centre', '加拿大组装中心', "Centre d’assemblage"), l('Canadian integration from import to after-sales.', '从进口到售后的加拿大一体化服务。', "Une intégration canadienne de l’importation à l’après-vente."), l('The operational link between global manufacturers, Canadian requirements, project sites and customers.', '连接全球制造商、加拿大要求、项目现场与客户的运营枢纽。', 'Le lien opérationnel entre fabricants mondiaux, exigences canadiennes, sites et clients.')],
    ['products', l('Products', '产品', 'Produits'), l('Modular products for living, business and infrastructure.', '面向生活、商业与基础设施的模块化产品。', 'Des produits modulaires pour l’habitat, les affaires et les infrastructures.'), l('Compare controlled solution categories and request project-specific guidance.', '比较受控解决方案类别并获取项目专项指导。', 'Comparez les solutions et demandez des conseils adaptés.')],
    ['industries', l('Industries', '行业方案', 'Secteurs'), l('Purpose-built systems for different operating environments.', '针对不同运营环境打造的系统。', 'Des systèmes adaptés à chaque environnement opérationnel.'), l('Solutions for residential, tourism, commercial, public and industrial applications.', '服务住宅、旅游、商业、公共与工业应用。', 'Solutions résidentielles, touristiques, commerciales, publiques et industrielles.')],
    ['projects', l('Projects', '项目', 'Projets'), l('A transparent portfolio of modular environments.', '透明的模块化空间项目组合。', 'Un portfolio transparent d’environnements modulaires.'), l('Every project is clearly identified as verified, in development or a design concept.', '每个项目均明确标注为已核验、开发中或设计概念。', 'Chaque projet est identifié comme vérifié, en développement ou conceptuel.')],
    ['suppliers', l('Suppliers', '供应商', 'Fournisseurs'), l('A structured gateway for qualified global partners.', '面向优质全球合作伙伴的结构化入口。', 'Une passerelle structurée pour des partenaires mondiaux qualifiés.'), l('Supplier onboarding is based on capability, documentation and accountability.', '供应商入驻基于能力、文件与责任。', 'L’intégration repose sur la capacité, les documents et la responsabilité.')],
    ['news', l('News & Insights', '新闻与洞察', 'Actualités et perspectives'), l('Ideas shaping the future of modular infrastructure.', '塑造模块化基础设施未来的观点。', 'Des idées qui façonnent l’avenir des infrastructures modulaires.'), l('Source-based intelligence for Canadian and global partners.', '面向加拿大及全球伙伴的有来源洞察。', 'Des analyses sourcées pour les partenaires canadiens et mondiaux.')],
    ['contact', l('Contact', '联系我们', 'Contact'), l('Start a conversation with NEXUS GROUP.', '与 NEXUS 集团开启合作对话。', 'Entamez une conversation avec NEXUS GROUP.'), l('Tell us about your organization, project, location and target timeline.', '请说明您的组织、项目、地点与目标时间。', 'Parlez-nous de votre organisation, projet, lieu et échéancier.')],
  ].map(([slug, label, title, body]) => ({
    slug, pageType: slug === 'assembly-centre' ? 'PROCESS' : 'STANDARD', label,
    seoTitle: label, seoDescription: body,
    sections: [
      { key: 'hero', type: 'HERO', content: { eyebrow: label, title, body } },
      { key: 'overview', type: slug === 'assembly-centre' ? 'PROCESS' : 'CONTENT', content: { title: label, body, items: [] } },
    ],
  })),
]

try {
  for (const page of pages) {
    const exists = await prisma.cmsPage.findUnique({ where: { slug: page.slug }, select: { id: true } })
    if (exists) {
      console.log(`Skipped existing page: ${page.slug}`)
      continue
    }
    await prisma.cmsPage.create({
      data: {
        slug: page.slug, pageType: page.pageType, status: 'DRAFT',
        labelEn: page.label.en, labelZh: page.label.zh, labelFr: page.label.fr,
        seoTitleEn: page.seoTitle.en, seoTitleZh: page.seoTitle.zh, seoTitleFr: page.seoTitle.fr,
        seoDescriptionEn: page.seoDescription.en, seoDescriptionZh: page.seoDescription.zh, seoDescriptionFr: page.seoDescription.fr,
        sections: { create: page.sections.map((section, position) => ({ ...section, position, enabled: true })) },
      },
    })
    console.log(`Seeded draft page: ${page.slug}`)
  }
} finally {
  await prisma.$disconnect()
}
