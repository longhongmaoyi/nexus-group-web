import type { Locale, LocalizedText } from '@/lib/i18n'

const t = (en: string, zh: string, fr: string): LocalizedText => ({ en, zh, fr })

export const navigation = [
  { slug: 'about', label: t('About Nexus Group', '关于 NEXUS 集团', 'À propos de NEXUS') },
  { slug: 'assembly-centre', label: t('Assembly Centre', '加拿大组装中心', "Centre d’assemblage") },
  { slug: 'products', label: t('Products', '产品', 'Produits') },
  { slug: 'industries', label: t('Industries', '行业方案', 'Secteurs') },
  { slug: 'projects', label: t('Projects', '项目', 'Projets') },
  { slug: 'suppliers', label: t('Suppliers', '供应商', 'Fournisseurs') },
  { slug: 'news', label: t('News', '新闻', 'Actualités') },
  { slug: 'contact', label: t('Contact', '联系我们', 'Contact') },
]

export const homeCopy = {
  utility: t('Assembled in Canada. Engineered for North America.', '加拿大组装，为北美市场而设计。', 'Assemblé au Canada. Conçu pour l’Amérique du Nord.'),
  heroEyebrow: t('Canada + Global Modular Infrastructure', '加拿大 + 全球模块化基础设施', 'Infrastructures modulaires — Canada + Monde'),
  heroTitle: t('Redefining Modular Living', '重新定义模块化生活', 'Redéfinir la vie modulaire'),
  heroSubtitle: t(
    'Integrated solutions for living, working and exploring the future.',
    '为未来生活、工作与探索提供一体化解决方案。',
    'Des solutions intégrées pour vivre, travailler et explorer l’avenir.'
  ),
  heroBody: t(
    'NEXUS GROUP connects global supply, Canadian assembly, compliance coordination, installation and long-term support in one premium platform.',
    'NEXUS 集团将全球供应链、加拿大组装、认证协调、安装与长期售后整合于一个高端平台。',
    'NEXUS GROUP réunit l’approvisionnement mondial, l’assemblage canadien, la conformité, l’installation et le soutien à long terme.'
  ),
  primaryCta: t('Explore Products', '浏览产品', 'Découvrir les produits'),
  secondaryCta: t('Start a Project', '启动项目', 'Démarrer un projet'),
  trust: [
    t('Canadian Assembly', '加拿大组装', 'Assemblage canadien'),
    t('Compliance Coordination', '认证协调', 'Coordination de conformité'),
    t('Four-Season Ready', '四季适用', 'Adapté aux quatre saisons'),
    t('Global Supply Network', '全球供应网络', 'Réseau mondial de fournisseurs'),
  ],
  solutionsEyebrow: t('One group. Multiple possibilities.', '一个集团，多种可能。', 'Un groupe. Des possibilités multiples.'),
  solutionsTitle: t('Solutions for Every Way of Life', '适用于多元生活方式的空间方案', 'Des solutions pour chaque mode de vie'),
  solutionsBody: t(
    'From modular cabins and resort villas to kiosks, offices and workforce infrastructure.',
    '从模块化小屋、度假别墅到商业亭、办公室及工人营地基础设施。',
    'Des chalets et villas de villégiature aux kiosques, bureaux et infrastructures pour travailleurs.'
  ),
  assemblyEyebrow: t('NEXUS Assembly Centre', 'NEXUS 加拿大组装中心', 'Centre d’assemblage NEXUS'),
  assemblyTitle: t('One Platform. End-to-End Delivery.', '一个平台，端到端交付。', 'Une plateforme. Une livraison de bout en bout.'),
  assemblyBody: t(
    'A Canadian integration centre built to coordinate imported modules, local assembly, regulatory requirements, installation and after-sales service.',
    '加拿大模块化产品集成中心，统一协调进口、组装、合规认证、安装与售后服务。',
    'Un centre canadien qui coordonne l’importation, l’assemblage local, la conformité, l’installation et le service après-vente.'
  ),
  footprintEyebrow: t('Our Global Ecosystem', '我们的全球生态系统', 'Notre écosystème mondial'),
  footprintTitle: t('Global capability. Canadian execution.', '全球能力，加拿大落地。', 'Capacité mondiale. Exécution canadienne.'),
  footprintBody: t(
    'NEXUS is positioned as an integrated solution group—not simply a modular home seller. The platform connects manufacturers, project partners, local specialists and customers.',
    'NEXUS 的定位不是普通模块化房屋销售商，而是连接制造商、项目伙伴、本地专业团队与客户的综合解决方案集团。',
    'NEXUS se positionne comme un groupe de solutions intégré, reliant fabricants, partenaires de projet, spécialistes locaux et clients.'
  ),
  projectsEyebrow: t('Featured Concepts', '精选概念项目', 'Concepts en vedette'),
  projectsTitle: t('Built for Canada. Designed for the world.', '立足加拿大，面向全球。', 'Conçu pour le Canada. Pensé pour le monde.'),
  projectsNote: t('Concept imagery and project names are placeholders until verified portfolio content is supplied.', '以下为概念图片与示例项目名称，待提供已验证案例后替换。', 'Les visuels et noms sont des concepts à remplacer par un portfolio vérifié.'),
  supplierEyebrow: t('Supplier Network', '供应商网络', 'Réseau de fournisseurs'),
  supplierTitle: t('Build the next generation of modular spaces with us.', '与我们共同打造新一代模块化空间。', 'Construisons ensemble la prochaine génération d’espaces modulaires.'),
  supplierBody: t(
    'The future supplier portal will support onboarding, product submissions, certification records, project matching and communication with the Canadian assembly team.',
    '未来供应商后台将支持入驻、产品提交、认证资料、项目匹配及与加拿大组装团队沟通。',
    'Le futur portail fournisseur prendra en charge l’intégration, les produits, les certifications, le jumelage de projets et les échanges avec l’équipe canadienne.'
  ),
  ctaTitle: t('Let’s Build a Better Future Together', '携手共建更美好的未来', 'Construisons ensemble un avenir meilleur'),
  ctaBody: t(
    'Bring your modular living, hospitality, commercial or infrastructure vision to life with NEXUS GROUP.',
    '与 NEXUS 集团一起，将模块化生活、旅游住宿、商业空间或基础设施构想变为现实。',
    'Donnez vie à votre vision résidentielle, hôtelière, commerciale ou d’infrastructure avec NEXUS GROUP.'
  ),
  viewAll: t('View all projects', '查看全部项目', 'Voir tous les projets'),
  learnMore: t('Learn more', '了解更多', 'En savoir plus'),
  supplierCta: t('Become a Supplier', '成为供应商', 'Devenir fournisseur'),
  contactCta: t('Get in Touch', '联系我们', 'Nous contacter'),
}

export const solutionCards = [
  {
    slug: 'modular-living',
    image: '/images/modular-living.jpg',
    title: t('Modular Living', '模块化生活', 'Habitat modulaire'),
    description: t('Glamping cabins, tiny houses, modular cabins and resort villas.', '豪华露营小屋、微型住宅、模块化小屋与度假别墅。', 'Chalets glamping, minimaisons, cabines modulaires et villas de villégiature.'),
  },
  {
    slug: 'tourism-hospitality',
    image: '/images/tourism.jpg',
    title: t('Tourism & Hospitality', '旅游与酒店', 'Tourisme et hôtellerie'),
    description: t('Campgrounds, resorts, eco-tourism and hospitality projects.', '营地、度假村、生态旅游与酒店项目。', 'Terrains de camping, complexes, écotourisme et projets hôteliers.'),
  },
  {
    slug: 'commercial-solutions',
    image: '/images/commercial.jpg',
    title: t('Commercial Solutions', '商业解决方案', 'Solutions commerciales'),
    description: t('Coffee kiosks, food kiosks, retail units and modular offices.', '咖啡亭、餐饮亭、零售单元与模块化办公室。', 'Kiosques café, restauration, unités commerciales et bureaux modulaires.'),
  },
  {
    slug: 'industrial-solutions',
    image: '/images/industrial.jpg',
    title: t('Industrial Solutions', '工业解决方案', 'Solutions industrielles'),
    description: t('Worker camps, site offices, storage modules and mining camps.', '工人营地、工地办公室、仓储模块与矿区营地。', 'Camps de travailleurs, bureaux de chantier, stockage et camps miniers.'),
  },
  {
    slug: 'public-community',
    image: '/images/community.jpg',
    title: t('Public & Community', '公共与社区', 'Public et communautaire'),
    description: t('Flexible spaces for education, healthcare and community use.', '面向教育、医疗与社区用途的灵活空间。', 'Espaces flexibles pour l’éducation, la santé et la vie communautaire.'),
  },
]

export const deliverySteps = [
  { key: '01', title: t('Import', '进口', 'Importation'), body: t('Global sourcing and logistics coordination.', '全球采购与物流协调。', 'Approvisionnement mondial et coordination logistique.') },
  { key: '02', title: t('Assembly', '组装', 'Assemblage'), body: t('Integrated assembly and finishing in Canada.', '在加拿大完成集成组装与饰面。', 'Assemblage et finition intégrés au Canada.') },
  { key: '03', title: t('Compliance', '认证协调', 'Conformité'), body: t('Documentation and coordination for applicable requirements.', '协调适用法规所需资料与流程。', 'Documentation et coordination des exigences applicables.') },
  { key: '04', title: t('Installation', '安装', 'Installation'), body: t('Site planning, delivery and installation coordination.', '场地规划、运输与安装协调。', 'Planification du site, livraison et installation.') },
  { key: '05', title: t('After-sales', '售后', 'Après-vente'), body: t('Ongoing service and lifecycle support.', '持续服务与全生命周期支持。', 'Service continu et soutien sur le cycle de vie.') },
]

export const metrics = [
  { value: '1', label: t('Integrated Group', '综合解决方案集团', 'Groupe intégré') },
  { value: '5', label: t('Delivery Stages', '交付阶段', 'Étapes de livraison') },
  { value: '4', label: t('Core Business Sectors', '核心业务板块', 'Secteurs principaux') },
  { value: '3', label: t('Launch Languages', '首发语言', 'Langues de lancement') },
]

export const conceptProjects = [
  { image: '/images/project-lake.jpg', title: t('Lakefront Modular Retreat', '湖畔模块化度假区', 'Retraite modulaire au bord du lac'), meta: t('Tourism & Hospitality · Concept', '旅游与酒店 · 概念项目', 'Tourisme et hôtellerie · Concept') },
  { image: '/images/project-workforce.jpg', title: t('Northern Workforce Campus', '北方工人营地', 'Campus nordique pour travailleurs'), meta: t('Industrial · Concept', '工业 · 概念项目', 'Industriel · Concept') },
  { image: '/images/project-cabin.jpg', title: t('Four-Season Cabin Collection', '四季小屋系列', 'Collection de chalets quatre saisons'), meta: t('Modular Living · Concept', '模块化生活 · 概念项目', 'Habitat modulaire · Concept') },
  { image: '/images/project-kiosk.jpg', title: t('Urban Coffee Pavilion', '城市咖啡亭', 'Pavillon café urbain'), meta: t('Commercial · Concept', '商业 · 概念项目', 'Commercial · Concept') },
]

export const sectionPages = {
  about: {
    eyebrow: t('About Nexus Group', '关于 NEXUS 集团', 'À propos de NEXUS'),
    title: t('A modular solutions group built around integration.', '以集成为核心的模块化解决方案集团。', 'Un groupe de solutions modulaires fondé sur l’intégration.'),
    intro: t('NEXUS GROUP combines global product capability with Canadian assembly and project execution for living, tourism, commercial and industrial applications.', 'NEXUS 集团融合全球产品能力、加拿大组装与项目落地，服务于居住、旅游、商业和工业应用。', 'NEXUS GROUP combine capacité mondiale, assemblage canadien et exécution de projets résidentiels, touristiques, commerciaux et industriels.'),
    blocks: [
      { title: t('Brand Positioning', '品牌定位', 'Positionnement'), body: t('International, premium, technology-led and solution-focused.', '国际化、高端、科技驱动、以解决方案为导向。', 'International, haut de gamme, technologique et orienté solutions.') },
      { title: t('Operating Model', '运营模式', 'Modèle opérationnel'), body: t('Global sourcing connected to Canadian integration and local delivery partners.', '全球采购连接加拿大集成中心与本地交付伙伴。', 'Approvisionnement mondial relié à l’intégration canadienne et aux partenaires locaux.') },
      { title: t('Future Platform', '未来平台', 'Plateforme future'), body: t('Prepared for product data, customer accounts, supplier workflows, CRM and AI service.', '为产品数据库、客户账户、供应商流程、CRM 与 AI 客服预留架构。', 'Préparée pour les données produits, comptes clients, fournisseurs, CRM et service IA.') },
    ],
  },
  'assembly-centre': {
    eyebrow: t('NEXUS Assembly Centre', 'NEXUS 加拿大组装中心', 'Centre d’assemblage NEXUS'),
    title: t('Canadian integration from import to after-sales.', '从进口到售后的加拿大一体化服务。', 'Une intégration canadienne de l’importation à l’après-vente.'),
    intro: t('The assembly centre is the operational link between global manufacturers, Canadian requirements, project sites and customers.', '组装中心是全球制造商、加拿大要求、项目现场与客户之间的运营枢纽。', 'Le centre relie les fabricants mondiaux, les exigences canadiennes, les sites de projet et les clients.'),
    blocks: deliverySteps.map((step) => ({ title: step.title, body: step.body })),
  },
  products: {
    eyebrow: t('Products', '产品', 'Produits'),
    title: t('Modular products for living, business and infrastructure.', '面向生活、商业与基础设施的模块化产品。', 'Des produits modulaires pour l’habitat, les affaires et les infrastructures.'),
    intro: t('A CMS-ready catalogue structure is prepared for product specifications, galleries, downloadable documents, multilingual content and online inquiries.', '已准备好 CMS 产品目录结构，可管理规格、图库、下载资料、多语言内容与在线询价。', 'Une structure de catalogue est prête pour les spécifications, galeries, documents, contenus multilingues et demandes en ligne.'),
    blocks: solutionCards.slice(0, 4).map((item) => ({ title: item.title, body: item.description })),
  },
  industries: {
    eyebrow: t('Industries', '行业方案', 'Secteurs'),
    title: t('Purpose-built modular systems for different operating environments.', '针对不同运营环境打造的模块化系统。', 'Des systèmes modulaires adaptés à chaque environnement opérationnel.'),
    intro: t('NEXUS GROUP serves residential, tourism, hospitality, commercial, public, community and industrial applications.', 'NEXUS 集团服务住宅、旅游、酒店、商业、公共、社区与工业应用。', 'NEXUS GROUP dessert les secteurs résidentiel, touristique, hôtelier, commercial, public, communautaire et industriel.'),
    blocks: solutionCards.map((item) => ({ title: item.title, body: item.description })),
  },
  projects: {
    eyebrow: t('Projects', '项目', 'Projets'),
    title: t('A future portfolio of modular environments.', '未来模块化空间项目组合。', 'Un futur portfolio d’environnements modulaires.'),
    intro: t('The initial project cards are clearly identified as concepts. Replace them with verified locations, clients, specifications and photography before public launch.', '当前项目卡片已明确标注为概念内容。正式上线前请替换为已验证的地点、客户、规格与图片。', 'Les projets initiaux sont clairement identifiés comme concepts. Ils devront être remplacés par des données et photos vérifiées avant le lancement.'),
    blocks: conceptProjects.map((item) => ({ title: item.title, body: item.meta })),
  },
  suppliers: {
    eyebrow: t('Suppliers', '供应商', 'Fournisseurs'),
    title: t('A structured gateway for qualified global partners.', '面向优质全球合作伙伴的结构化入口。', 'Une passerelle structurée pour des partenaires mondiaux qualifiés.'),
    intro: t('The supplier workflow is planned for onboarding, product submissions, certifications, capability profiles and project matching.', '供应商流程将支持入驻、产品提交、认证、能力档案与项目匹配。', 'Le flux fournisseur est prévu pour l’intégration, les produits, certifications, profils de capacité et jumelage de projets.'),
    blocks: [
      { title: t('Company Profile', '企业档案', 'Profil d’entreprise'), body: t('Business information, manufacturing capability and export experience.', '企业信息、制造能力与出口经验。', 'Informations, capacité de fabrication et expérience export.') },
      { title: t('Product Submission', '产品提交', 'Soumission de produits'), body: t('Structured product data, specifications, media and pricing references.', '结构化产品数据、规格、媒体与价格参考。', 'Données structurées, spécifications, médias et références de prix.') },
      { title: t('Compliance Records', '认证资料', 'Dossiers de conformité'), body: t('Certificates, test reports and supporting documentation.', '证书、检测报告与支持文件。', 'Certificats, rapports d’essai et documents justificatifs.') },
    ],
  },
  news: {
    eyebrow: t('News & Insights', '新闻与洞察', 'Actualités et perspectives'),
    title: t('Ideas shaping the future of modular infrastructure.', '塑造模块化基础设施未来的观点。', 'Des idées qui façonnent l’avenir des infrastructures modulaires.'),
    intro: t('The CMS is prepared for bilingual administration and English, Chinese and French publishing.', 'CMS 已准备好中英文后台管理，并支持英文、中文和法文发布。', 'Le CMS est prêt pour une administration en anglais et chinois, avec publication en anglais, chinois et français.'),
    blocks: [
      { title: t('Market Insights', '市场洞察', 'Perspectives de marché'), body: t('Canadian modular construction, tourism and infrastructure trends.', '加拿大模块化建筑、旅游与基础设施趋势。', 'Tendances canadiennes de la construction modulaire, du tourisme et des infrastructures.') },
      { title: t('Product Innovation', '产品创新', 'Innovation produit'), body: t('Materials, energy systems, smart controls and adaptable design.', '材料、能源系统、智能控制与适应性设计。', 'Matériaux, énergie, contrôles intelligents et conception adaptable.') },
      { title: t('Project Stories', '项目故事', 'Histoires de projets'), body: t('Verified case studies and partner stories after launch.', '上线后发布已验证的案例与合作伙伴故事。', 'Études de cas vérifiées et histoires de partenaires après le lancement.') },
    ],
  },
  contact: {
    eyebrow: t('Contact', '联系我们', 'Contact'),
    title: t('Start a conversation with NEXUS GROUP.', '与 NEXUS 集团开启合作对话。', 'Entamez une conversation avec NEXUS GROUP.'),
    intro: t('Use the inquiry form to describe your project, product interest, location and expected timeline. Contact details should be confirmed before production launch.', '请通过询价表说明项目、产品兴趣、地点与预计时间。正式上线前需确认联系方式。', 'Décrivez votre projet, votre intérêt produit, le lieu et l’échéancier. Les coordonnées devront être confirmées avant le lancement.'),
    blocks: [
      { title: t('Project Inquiries', '项目询价', 'Demandes de projet'), body: t('Living, hospitality, commercial and industrial modular solutions.', '生活、酒店、商业与工业模块化解决方案。', 'Solutions modulaires résidentielles, hôtelières, commerciales et industrielles.') },
      { title: t('Supplier Partnerships', '供应商合作', 'Partenariats fournisseurs'), body: t('Manufacturers and technology partners interested in the Canadian market.', '希望进入加拿大市场的制造商与技术伙伴。', 'Fabricants et partenaires technologiques intéressés par le marché canadien.') },
      { title: t('Media & Collaboration', '媒体与合作', 'Médias et collaboration'), body: t('News, investment, design and strategic collaboration.', '新闻、投资、设计与战略合作。', 'Actualités, investissement, design et collaboration stratégique.') },
    ],
  },
} as const

export type SectionSlug = keyof typeof sectionPages
export const sectionSlugs = Object.keys(sectionPages) as SectionSlug[]

export function localized(value: LocalizedText, locale: Locale) {
  return value[locale]
}
