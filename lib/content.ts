import type { Locale, LocalizedText } from '@/lib/i18n'
import { privacyNotice } from '@/lib/legal-content'

const t = (en: string, zh: string, fr: string): LocalizedText => ({ en, zh, fr })

export const navigation = [
  { slug: 'about', label: t('About Nexus Group', '关于 NEXUS 集团', 'À propos de NEXUS') },
  { slug: 'assembly-centre', label: t('Assembly Centre', '加拿大组装中心', "Centre d’assemblage") },
  { slug: 'compliance-centre', label: t('Compliance Centre', '加拿大合规中心', 'Centre de conformité') },
  { slug: 'products', label: t('Products', '产品', 'Produits') },
  { slug: 'industries', label: t('Industries', '行业方案', 'Secteurs') },
  { slug: 'projects', label: t('Projects', '项目', 'Projets') },
  { slug: 'suppliers', label: t('Suppliers', '供应商', 'Fournisseurs') },
  { slug: 'news', label: t('News', '新闻', 'Actualités') },
  { slug: 'contact', label: t('Contact', '联系我们', 'Contact') },
]

export const homeCopy = {
  utility: t('Canadian coordination for globally sourced modular systems.', '为全球采购的模块化系统提供加拿大本地协调。', 'Coordination canadienne de systèmes modulaires provenant du monde entier.'),
  heroEyebrow: t('Modular projects, coordinated from source to site', '模块化项目，从源头到现场全程协调', 'Des projets modulaires coordonnés de la source au site'),
  heroTitle: t('Global Capability. Built for Canadian Business.', '全球能力，为加拿大企业而建。', 'Capacité mondiale. Conçue pour les entreprises canadiennes.'),
  heroSubtitle: t(
    'Spaces for accommodation, business, tourism and remote operations.',
    '面向住宿、商业、旅游及偏远地区运营的空间方案。',
    'Des espaces pour l’hébergement, les affaires, le tourisme et les activités éloignées.'
  ),
  heroBody: t(
    'A modular project is more than a product order. NEXUS helps define the need, compare suitable systems and coordinate the work required to bring them into service in Canada.',
    '模块化项目不只是下单采购。NEXUS 协助明确需求、比较合适系统，并协调产品在加拿大投入使用所需的各项工作。',
    'Un projet modulaire ne se résume pas à une commande. NEXUS aide à préciser le besoin, à comparer les systèmes adaptés et à coordonner leur mise en service au Canada.'
  ),
  primaryCta: t('Explore Products', '浏览产品', 'Découvrir les produits'),
  secondaryCta: t('Start a Project', '启动项目', 'Démarrer un projet'),
  trust: [
    t('Canadian Assembly', '加拿大组装', 'Assemblage canadien'),
    t('Compliance Coordination', '认证协调', 'Coordination de conformité'),
    t('Site and climate review', '场地与气候审查', 'Examen du site et du climat'),
    t('Global Supply Network', '全球供应网络', 'Réseau mondial de fournisseurs'),
  ],
  solutionsEyebrow: t('Start with the real need.', '从真实需求出发。', 'Partir du besoin réel.'),
  solutionsTitle: t('Start with the job the space needs to do.', '先明确空间需要完成什么任务。', 'Commencez par la fonction que l’espace doit remplir.'),
  solutionsBody: t(
    'From modular cabins and resort villas to kiosks, offices and workforce infrastructure.',
    '从模块化小屋、度假别墅到商业亭、办公室及工人营地基础设施。',
    'Des chalets et villas de villégiature aux kiosques, bureaux et infrastructures pour travailleurs.'
  ),
  assemblyEyebrow: t('NEXUS Assembly Centre', 'NEXUS 加拿大组装中心', 'Centre d’assemblage NEXUS'),
  assemblyTitle: t('From supplier selection to site handover.', '从供应商选择到现场移交。', 'Du choix du fournisseur à la remise sur le site.'),
  assemblyBody: t(
    'A Canadian integration centre built to coordinate imported modules, local assembly, regulatory requirements, installation and after-sales service.',
    '加拿大模块化产品集成中心，统一协调进口、组装、合规认证、安装与售后服务。',
    'Un centre canadien qui coordonne l’importation, l’assemblage local, la conformité, l’installation et le service après-vente.'
  ),
  footprintEyebrow: t('How the model works', '我们的运作方式', 'Fonctionnement du modèle'),
  footprintTitle: t('Global sourcing, with local accountability.', '全球采购，本地责任清晰。', 'Approvisionnement mondial, responsabilité locale.'),
  footprintBody: t(
    'NEXUS is positioned as an integrated solution group—not simply a modular home seller. The platform connects manufacturers, project partners, local specialists and customers.',
    'NEXUS 的定位不是普通模块化房屋销售商，而是连接制造商、项目伙伴、本地专业团队与客户的综合解决方案集团。',
    'NEXUS se positionne comme un groupe de solutions intégré, reliant fabricants, partenaires de projet, spécialistes locaux et clients.'
  ),
  projectsEyebrow: t('Project directions', '项目方向', 'Orientations de projet'),
  projectsTitle: t('Concepts shown honestly, with their status attached.', '项目概念如实呈现，并明确标注状态。', 'Des concepts présentés honnêtement, avec leur statut.'),
  projectsNote: t('Design concepts are identified by status and are not presented as completed work.', '设计概念均按状态标注，不作为已完工项目呈现。', 'Les concepts sont identifiés par leur statut et ne sont pas présentés comme des projets livrés.'),
  supplierEyebrow: t('Supplier Network', '供应商网络', 'Réseau de fournisseurs'),
  supplierTitle: t('Canadian projects need more than a competitive factory price.', '加拿大项目需要的不只是有竞争力的工厂价格。', 'Les projets canadiens exigent plus qu’un prix usine compétitif.'),
  supplierBody: t(
    'Qualified suppliers are reviewed for manufacturing capability, documentation, quality control, export readiness, communication and after-sales responsibility.',
    '合格供应商将接受制造能力、文件、质量控制、出口准备度、沟通及售后责任等方面的审查。',
    'Les fournisseurs qualifiés sont évalués selon leur capacité de fabrication, leur documentation, leur contrôle qualité, leur préparation à l’exportation, leur communication et leur service après-vente.'
  ),
  ctaTitle: t('Tell us what you are trying to build.', '告诉我们您想建设什么。', 'Parlez-nous de ce que vous cherchez à construire.'),
  ctaBody: t(
    'Share the location, intended use, capacity, budget range and target date. We will use that information to identify a sensible next step.',
    '请提供地点、用途、容量、预算范围及目标日期。我们将据此判断合理的下一步。',
    'Indiquez le lieu, l’usage, la capacité, le budget et la date cible. Nous pourrons alors proposer une prochaine étape réaliste.'
  ),
  viewAll: t('View all projects', '查看全部项目', 'Voir tous les projets'),
  learnMore: t('View details', '查看详情', 'Voir les détails'),
  supplierCta: t('Become a Supplier', '成为供应商', 'Devenir fournisseur'),
  contactCta: t('Discuss Your Project', '讨论您的项目', 'Discuter de votre projet'),
}

export const solutionCards = [
  {
    slug: 'modular-living',
    image: '/images/modular-living.jpg',
    title: t('Modular Living', '模块化生活', 'Habitat modulaire'),
    description: t('Cabins, compact homes and villas planned around climate, occupancy, utilities and site access.', '围绕气候、居住人数、公用设施及现场通行条件规划的小屋、紧凑型住宅和别墅。', 'Chalets, habitations compactes et villas conçus selon le climat, l’occupation, les services et l’accès au site.'),
  },
  {
    slug: 'tourism-hospitality',
    image: '/images/tourism.jpg',
    title: t('Tourism & Hospitality', '旅游与酒店', 'Tourisme et hôtellerie'),
    description: t('Guest accommodation and support buildings for resorts, campgrounds and destination properties.', '面向度假村、营地及目的地项目的住宿与配套建筑。', 'Hébergement et bâtiments de soutien pour centres de villégiature, terrains de camping et destinations.'),
  },
  {
    slug: 'commercial-solutions',
    image: '/images/commercial.jpg',
    title: t('Commercial Solutions', '商业解决方案', 'Solutions commerciales'),
    description: t('Kiosks, food-service units, retail spaces and offices shaped around the operating model.', '根据实际运营模式规划的售卖亭、餐饮单元、零售空间及办公室。', 'Kiosques, unités de restauration, commerces et bureaux adaptés au modèle d’exploitation.'),
  },
  {
    slug: 'industrial-solutions',
    image: '/images/industrial.jpg',
    title: t('Industrial Solutions', '工业解决方案', 'Solutions industrielles'),
    description: t('Accommodation, offices, storage and service modules for remote and fast-moving operations.', '面向偏远及快速推进项目的住宿、办公室、仓储和服务模块。', 'Hébergement, bureaux, stockage et modules de service pour les opérations éloignées ou en évolution rapide.'),
  },
  {
    slug: 'public-community',
    image: '/images/community.jpg',
    title: t('Public & Community', '公共与社区', 'Public et communautaire'),
    description: t('Flexible buildings for education, community programs, administration and essential services.', '面向教育、社区项目、行政管理及基本服务的灵活建筑。', 'Bâtiments flexibles pour l’éducation, les programmes communautaires, l’administration et les services essentiels.'),
  },
]


export const buyerResources = [
  {
    slug: 'project-brief-guide',
    title: t('Project Brief Guide', '项目简报指南', 'Guide du dossier de projet'),
    description: t(
      'Turn a broad idea into information that suppliers and local professionals can assess.',
      '把宽泛想法转化为供应商及本地专业人士能够评估的信息。',
      'Transformer une idée générale en renseignements que fournisseurs et professionnels peuvent évaluer.'
    ),
  },
  {
    slug: 'landed-cost-guide',
    title: t('Landed Cost Guide', '落地成本指南', 'Guide du coût rendu'),
    description: t(
      'See what sits between a factory price and a working asset on the site.',
      '了解工厂价格与现场可运行资产之间还包含哪些成本。',
      'Voir ce qui se trouve entre le prix usine et un actif opérationnel sur le site.'
    ),
  },
  {
    slug: 'delivery-timeline-guide',
    title: t('Delivery Timeline Guide', '交付时间指南', 'Guide de l’échéancier'),
    description: t(
      'Understand the stages and dependencies behind a realistic project schedule.',
      '了解现实项目时间表背后的阶段与依赖关系。',
      'Comprendre les étapes et dépendances derrière un calendrier réaliste.'
    ),
  },
  {
    slug: 'document-checklist',
    title: t('Product Document Checklist', '产品文件清单', 'Liste de contrôle des documents'),
    description: t(
      'Track the evidence received, the gaps that remain and who is responsible.',
      '跟踪已收到的证据、仍存在的缺口及责任方。',
      'Suivre les preuves reçues, les lacunes restantes et les responsables.'
    ),
  },
] as const

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
  { image: '/images/tourism.jpg', title: t('Lakefront Modular Retreat', '湖畔模块化度假区', 'Retraite modulaire au bord du lac'), meta: t('Tourism & Hospitality · Concept', '旅游与酒店 · 概念项目', 'Tourisme et hôtellerie · Concept') },
  { image: '/images/industrial.jpg', title: t('Northern Workforce Campus', '北方工人营地', 'Campus nordique pour travailleurs'), meta: t('Industrial · Concept', '工业 · 概念项目', 'Industriel · Concept') },
  { image: '/images/project-cabin.jpg', title: t('Four-Season Cabin Collection', '四季小屋系列', 'Collection de chalets quatre saisons'), meta: t('Modular Living · Concept', '模块化生活 · 概念项目', 'Habitat modulaire · Concept') },
  { image: '/images/commercial.jpg', title: t('Urban Coffee Pavilion', '城市咖啡亭', 'Pavillon café urbain'), meta: t('Commercial · Concept', '商业 · 概念项目', 'Commercial · Concept') },
]

export const sectionPages = {
  about: {
    eyebrow: t('About Nexus Group', '关于 NEXUS 集团', 'À propos de NEXUS'),
    title: t(
      'A practical bridge between global manufacturing and Canadian project delivery.',
      '连接全球制造与加拿大项目交付的务实桥梁。',
      'Un lien concret entre la fabrication mondiale et la livraison de projets au Canada.'
    ),
    intro: t(
      'NEXUS helps Canadian organizations evaluate modular systems from global manufacturers and coordinate the work needed to use them responsibly in Canada. The goal is not to sell every product to every buyer. It is to find a workable match, make responsibilities visible and reduce avoidable surprises.',
      'NEXUS 协助加拿大机构评估全球制造商的模块化系统，并协调其在加拿大负责任落地所需的工作。我们的目标不是把所有产品卖给所有买家，而是找到可行匹配、明确责任，并减少可避免的问题。',
      'NEXUS aide les organisations canadiennes à évaluer des systèmes modulaires fabriqués à l’étranger et à coordonner leur utilisation responsable au Canada. Il ne s’agit pas de vendre n’importe quel produit à n’importe quel client, mais de trouver une solution viable, de clarifier les responsabilités et de réduire les mauvaises surprises.'
    ),
    blocks: [
      {
        title: t('What NEXUS actually does', 'NEXUS 实际做什么', 'Ce que fait réellement NEXUS'),
        body: t(
          'We begin with the operating need: what the space must do, where it will be used, who will occupy it and when it is required. From there, we coordinate product research, supplier discussions, documentation review, commercial comparison, import planning and the Canadian delivery pathway.',
          '我们从运营需求出发：空间需要完成什么功能、在哪里使用、由谁使用、何时需要。随后协调产品研究、供应商沟通、文件审查、商业比较、进口规划及加拿大交付路径。',
          'Nous partons du besoin opérationnel : fonction de l’espace, lieu d’utilisation, occupants et échéance. Nous coordonnons ensuite la recherche de produits, les échanges avec les fournisseurs, l’examen des documents, la comparaison commerciale, l’importation et le parcours de livraison au Canada.'
        )
      },
      {
        title: t('Who we are built to support', '我们服务的客户', 'Les clients que nous accompagnons'),
        body: t(
          'The model is suited to developers, hospitality operators, mining and construction companies, institutions, retailers and owners planning projects where speed, repeatability or difficult site conditions make modular delivery worth considering.',
          '我们的模式适合开发商、酒店与旅游运营商、矿业及建筑企业、机构、零售商，以及因速度、可复制性或复杂场地条件而考虑模块化交付的业主。',
          'Notre modèle s’adresse aux promoteurs, exploitants hôteliers, sociétés minières et de construction, institutions, détaillants et propriétaires qui envisagent le modulaire pour gagner du temps, répéter un concept ou intervenir sur un site complexe.'
        )
      },
      {
        title: t('How the Canada–global model works', '加拿大全球模式如何运作', 'Fonctionnement du modèle Canada–monde'),
        body: t(
          'Global manufacturers may offer strong product capability, but the project still needs Canadian decisions around site, design, permits, utilities, installation and service. NEXUS keeps those two sides connected so technical and commercial decisions are not made in isolation.',
          '全球制造商可能具备很强的产品能力，但项目仍需要在加拿大完成场地、设计、许可、公用设施、安装及服务等决策。NEXUS 连接两端，避免技术和商业决策彼此脱节。',
          'Les fabricants mondiaux peuvent offrir d’excellents produits, mais le projet exige encore des décisions canadiennes sur le site, la conception, les permis, les services, l’installation et l’entretien. NEXUS relie ces deux réalités afin que les décisions techniques et commerciales ne soient pas prises séparément.'
        )
      },
      {
        title: t('Where our role begins and ends', '我们的职责边界', 'Les limites de notre rôle'),
        body: t(
          'NEXUS can coordinate information, suppliers, logistics, local partners and project records. We do not replace the authority having jurisdiction, the client’s legal responsibilities, or the work of licensed architects, engineers, trades and inspectors when they are required.',
          'NEXUS 可协调信息、供应商、物流、本地伙伴及项目记录，但不会取代主管机构、客户的法律责任，或项目所需的持牌建筑师、工程师、专业工种及检查人员。',
          'NEXUS peut coordonner l’information, les fournisseurs, la logistique, les partenaires locaux et les dossiers. Nous ne remplaçons ni l’autorité compétente, ni les obligations légales du client, ni les architectes, ingénieurs, métiers et inspecteurs autorisés lorsque leur intervention est requise.'
        )
      },
      {
        title: t('How suppliers are evaluated', '如何评估供应商', 'Comment les fournisseurs sont évalués'),
        body: t(
          'Price matters, but it is only one part of the decision. We also look at manufacturing capability, drawing quality, material traceability, test records, export experience, response time, change control, packaging, spare parts and willingness to stand behind the product.',
          '价格很重要，但只是决策的一部分。我们还关注制造能力、图纸质量、材料追溯、测试记录、出口经验、响应速度、变更控制、包装、备件及供应商承担产品责任的意愿。',
          'Le prix compte, mais il ne suffit pas. Nous examinons aussi la capacité de fabrication, la qualité des plans, la traçabilité des matériaux, les essais, l’expérience export, la réactivité, le contrôle des changements, l’emballage, les pièces et la volonté d’assumer la responsabilité du produit.'
        )
      },
      {
        title: t('How trust will be earned', '如何建立信任', 'Comment la confiance se construit'),
        body: t(
          'Claims will be tied to evidence. Concepts will remain labelled as concepts. Product information will identify assumptions and missing documents. As projects move forward, verified photographs, approvals, delivery records and measurable results will replace promotional language wherever possible.',
          '所有声明都应有证据支持。概念项目始终标注为概念。产品信息会明确假设及缺失文件。随着项目推进，我们将尽可能用经核验的照片、批准文件、交付记录及可衡量结果取代宣传语言。',
          'Les affirmations seront liées à des preuves. Les concepts resteront identifiés comme tels. Les fiches produits préciseront les hypothèses et les documents manquants. À mesure que les projets avanceront, des photos vérifiées, approbations, dossiers de livraison et résultats mesurables remplaceront le langage promotionnel.'
        )
      }
    ]
  },
  'assembly-centre': {
    eyebrow: t('NEXUS Assembly Centre', 'NEXUS 加拿大组装中心', 'Centre d’assemblage NEXUS'),
    title: t(
      'The Canadian operating link between the factory and the site.',
      '连接工厂与项目现场的加拿大运营枢纽。',
      'Le lien opérationnel canadien entre l’usine et le site.'
    ),
    intro: t(
      'Imported modules arrive with factory drawings, components and assumptions. Canadian projects add local requirements, trades, inspections and site conditions. The Assembly Centre coordinates that handoff through documented stages from assessment to lifecycle support.',
      '进口模块带有工厂图纸、部件及既有假设；加拿大项目则增加本地要求、专业工种、检查及场地条件。组装中心通过从评估到生命周期支持的有记录阶段协调这一交接。',
      'Les modules importés arrivent avec des plans, composants et hypothèses d’usine. Les projets canadiens ajoutent des exigences locales, des métiers, des inspections et des conditions de site. Le Centre d’assemblage coordonne cette transition par des étapes documentées, de l’évaluation au soutien du cycle de vie.'
    ),
    blocks: deliverySteps.map((step) => ({ title: step.title, body: step.body }))
  },
  'compliance-centre': {
    eyebrow: t('Canada Compliance Centre', '加拿大合规中心', 'Centre canadien de conformité'),
    title: t(
      'Compliance starts with the project location—not the catalogue.',
      '合规从项目地点开始，而不是从产品目录开始。',
      'La conformité commence par le lieu du projet, pas par le catalogue.'
    ),
    intro: t(
      'Canada publishes national model codes, while provinces and territories decide which rules apply in their jurisdictions and local authorities often administer permits and inspections. A product cannot be called “Canada approved” without identifying the exact project, use, location and approval pathway.',
      '加拿大发布国家示范规范，但各省和地区决定本辖区适用的规则，地方主管机构通常负责许可与检查。因此，在未明确具体项目、用途、地点及审批路径前，不能笼统地称某产品“已获加拿大批准”。',
      'Le Canada publie des codes modèles nationaux, mais les provinces et territoires déterminent les règles applicables, tandis que les autorités locales gèrent souvent les permis et inspections. On ne peut donc pas qualifier un produit d’« approuvé au Canada » sans préciser le projet, l’usage, le lieu et le parcours d’approbation.'
    ),
    blocks: [
      {
        title: t('Confirm the jurisdiction and intended use', '确认司法辖区与用途', 'Confirmer la juridiction et l’usage'),
        body: t(
          'A private seasonal cabin may follow a different path from staff accommodation, a classroom, a restaurant or a care facility. Municipality, province or territory, occupancy, zoning and operating licences can all change what must be reviewed.',
          '私人季节性小屋、员工住宿、教室、餐厅或护理设施可能遵循完全不同的路径。市政、省或地区、占用类别、场地分区及运营许可都可能改变审查要求。',
          'Un chalet saisonnier privé, un logement de personnel, une salle de classe, un restaurant ou un établissement de soins peuvent suivre des parcours différents. La municipalité, la province ou le territoire, l’usage, le zonage et les licences influencent les examens requis.'
        )
      },
      {
        title: t('Assign design responsibility', '明确设计责任', 'Attribuer la responsabilité de conception'),
        body: t(
          'The project must identify who is responsible for the building design, structural loads, foundation, fire and life safety, accessibility, energy performance, plumbing, electrical work and other disciplines. Factory drawings are useful inputs, but they do not automatically replace Canadian professional review.',
          '项目必须明确建筑设计、结构荷载、基础、消防与生命安全、无障碍、能源性能、给排水、电气及其他专业的责任方。工厂图纸可作为重要输入，但不能自动替代加拿大专业审查。',
          'Le projet doit préciser qui assume la conception, les charges, les fondations, la sécurité incendie, l’accessibilité, la performance énergétique, la plomberie, l’électricité et les autres disciplines. Les plans d’usine sont utiles, mais ne remplacent pas automatiquement un examen professionnel canadien.'
        )
      },
      {
        title: t('Build the product evidence file', '建立产品证据档案', 'Constituer le dossier de preuves du produit'),
        body: t(
          'Reviewers may need drawings, calculations, material specifications, component listings, test reports, quality-control records, installation instructions and traceability information. The required package depends on the product and the pathway selected by the responsible professionals and authority.',
          '审查人员可能需要图纸、计算书、材料规格、部件认证信息、测试报告、质量控制记录、安装说明及追溯资料。所需文件包取决于产品以及责任专业人士和主管机构确定的路径。',
          'Les examinateurs peuvent demander des plans, calculs, spécifications, inscriptions de composants, rapports d’essai, dossiers qualité, instructions d’installation et renseignements de traçabilité. Le contenu requis dépend du produit et du parcours retenu par les professionnels et l’autorité compétente.'
        )
      },
      {
        title: t('Coordinate permits and local reviews', '协调许可与本地审查', 'Coordonner les permis et examens locaux'),
        body: t(
          'Planning, development, building, fire, plumbing, electrical, gas, health or operating approvals may be involved. A realistic schedule should allow time for questions, revisions and resubmissions instead of assuming the first submission will be final.',
          '项目可能涉及规划、开发、建筑、消防、给排水、电气、燃气、卫生或运营审批。合理的时间表应预留提问、修改及重新提交时间，而不能假设首次提交即为最终版本。',
          'Des approbations d’urbanisme, de développement, de construction, d’incendie, de plomberie, d’électricité, de gaz, de santé ou d’exploitation peuvent être nécessaires. Un échéancier réaliste prévoit des questions, révisions et nouvelles soumissions.'
        )
      },
      {
        title: t('Verify the site, installation and inspections', '核实场地、安装与检查', 'Vérifier le site, l’installation et les inspections'),
        body: t(
          'Approval of a module does not finish the project. Foundations, access, drainage, utilities, lifting, connections, site-built work, licensed trades, inspections, commissioning and occupancy conditions still need to be coordinated and documented.',
          '模块获得相关认可并不代表项目完成。基础、通行、排水、公用设施、吊装、连接、现场施工、持牌工种、检查、调试及占用条件仍需协调并记录。',
          'L’acceptation d’un module ne termine pas le projet. Les fondations, l’accès, le drainage, les services, le levage, les raccordements, les travaux sur site, les métiers autorisés, les inspections, la mise en service et l’occupation doivent encore être coordonnés.'
        )
      },
      {
        title: t('Keep the decision trail visible', '保持决策记录清晰', 'Conserver une trace claire des décisions'),
        body: t(
          'NEXUS can organize the compliance register, document requests, reviewer comments, supplier responses and approval records. Final interpretations and approvals remain with the responsible authorities and qualified professionals. This page provides general guidance, not legal, architectural or engineering advice.',
          'NEXUS 可组织合规登记表、文件请求、审查意见、供应商回复及批准记录。最终解释与批准仍由相应主管机构和合格专业人士负责。本页面提供一般指导，不构成法律、建筑或工程建议。',
          'NEXUS peut organiser le registre de conformité, les demandes de documents, les commentaires, les réponses des fournisseurs et les approbations. Les décisions finales appartiennent aux autorités et professionnels qualifiés. Cette page fournit des renseignements généraux, et non des avis juridiques, architecturaux ou d’ingénierie.'
        )
      }
    ]
  },
  products: {
    eyebrow: t('Products', '产品', 'Produits'),
    title: t(
      'Choose a system by use, site and evidence—not by appearance alone.',
      '根据用途、场地和证据选择系统，而不是只看外观。',
      'Choisir un système selon l’usage, le site et les preuves, pas seulement l’apparence.'
    ),
    intro: t(
      'The right product is the one that can perform the required job, fit the site, travel through the planned logistics route and support the documentation needed for the Canadian project. Product selection should follow a clear project brief, not the other way around.',
      '合适的产品必须能够完成所需功能、适应场地、符合既定物流路径，并支持加拿大项目所需文件。产品选择应建立在清晰项目简报之上，而不是反过来。',
      'Le bon produit doit remplir sa fonction, convenir au site, suivre le parcours logistique prévu et fournir les documents nécessaires au projet canadien. Le choix du produit doit suivre un dossier clair, et non l’inverse.'
    ),
    blocks: [
      {
        title: t('Modular Living', '模块化生活', 'Habitat modulaire'),
        body: t(
          'Cabins, compact homes and resort villas for private, rental or hospitality use. Important decisions include occupancy, season of use, climate, envelope performance, kitchen and bathroom scope, utility connections, transport dimensions and local approval requirements.',
          '适用于私人、出租或酒店用途的小屋、紧凑型住宅及度假别墅。关键决策包括居住人数、使用季节、气候、围护性能、厨房与卫生间范围、公用设施连接、运输尺寸及本地审批要求。',
          'Chalets, habitations compactes et villas pour usage privé, locatif ou hôtelier. Les décisions clés concernent l’occupation, la saison, le climat, l’enveloppe, les cuisines et salles de bain, les services, le transport et les approbations locales.'
        )
      },
      {
        title: t('Tourism & Hospitality', '旅游与酒店', 'Tourisme et hôtellerie'),
        body: t(
          'Guest units, reception buildings, washroom facilities, food-service spaces and staff support areas for campgrounds, resorts and destination properties. The operating model, guest experience, housekeeping, accessibility and seasonal demand should shape the solution.',
          '面向营地、度假村及目的地项目的客房单元、接待建筑、卫生设施、餐饮空间和员工配套区域。运营模式、宾客体验、清洁维护、无障碍及季节性需求应共同决定方案。',
          'Unités d’hébergement, réception, sanitaires, restauration et espaces pour le personnel des terrains de camping, centres de villégiature et destinations. Le modèle d’exploitation, l’expérience client, l’entretien, l’accessibilité et la saisonnalité doivent guider la solution.'
        )
      },
      {
        title: t('Commercial Solutions', '商业解决方案', 'Solutions commerciales'),
        body: t(
          'Coffee kiosks, food units, retail spaces and modular offices should be designed around actual workflow: queueing, storage, equipment loads, ventilation, cleaning, staff movement, deliveries, customer access and brand presentation.',
          '咖啡亭、餐饮单元、零售空间和模块化办公室应围绕真实工作流程设计，包括排队、仓储、设备负荷、通风、清洁、员工动线、补货、顾客通行及品牌呈现。',
          'Les kiosques café, unités alimentaires, commerces et bureaux modulaires doivent suivre le flux réel : files, stockage, charges d’équipement, ventilation, nettoyage, déplacements, livraisons, accès client et image de marque.'
        )
      },
      {
        title: t('Industrial & Remote Operations', '工业与偏远运营', 'Opérations industrielles et éloignées'),
        body: t(
          'Workforce accommodation, site offices, change rooms, dining, storage and service modules for mining, construction and remote operations. Durability, transport sequencing, cold-weather operation, maintenance access, safety and camp management usually matter more than decorative finishes.',
          '面向矿业、建筑及偏远运营的员工住宿、现场办公室、更衣室、餐厅、仓储及服务模块。耐用性、运输排序、寒冷天气运行、维护通道、安全及营地管理通常比装饰效果更重要。',
          'Hébergement, bureaux de chantier, vestiaires, restauration, stockage et modules de service pour mines, construction et sites éloignés. La robustesse, le transport, le froid, l’entretien, la sécurité et la gestion du camp comptent souvent plus que les finitions.'
        )
      },
      {
        title: t('Public & Community Spaces', '公共与社区空间', 'Espaces publics et communautaires'),
        body: t(
          'Classrooms, administration, community rooms and service buildings require careful attention to occupancy, accessibility, safeguarding, acoustics, durability, public procurement and long-term maintenance.',
          '教室、行政空间、社区活动室及服务建筑需要重点考虑占用人数、无障碍、安全保护、声学、耐用性、公共采购及长期维护。',
          'Les salles de classe, bureaux administratifs, espaces communautaires et bâtiments de service exigent une attention particulière à l’occupation, l’accessibilité, la sécurité, l’acoustique, la durabilité, l’approvisionnement public et l’entretien.'
        )
      },
      {
        title: t('How products are compared', '如何比较产品', 'Comment les produits sont comparés'),
        body: t(
          'A useful comparison covers drawings, materials, dimensions, weights, utilities, equipment, documentation status, factory capability, packing, freight, installation, site exclusions, warranty, spare parts and the assumptions that can still change price or schedule.',
          '有效比较应涵盖图纸、材料、尺寸、重量、公用设施、设备、文件状态、工厂能力、包装、运输、安装、现场排除项、质保、备件，以及仍可能改变价格或时间的假设。',
          'Une comparaison utile couvre plans, matériaux, dimensions, poids, services, équipements, état documentaire, capacité d’usine, emballage, fret, installation, exclusions de site, garantie, pièces et hypothèses pouvant encore modifier le prix ou le calendrier.'
        )
      }
    ]
  },

  'modular-living': {
    eyebrow: t('Modular Living', '模块化生活', 'Habitat modulaire'),
    title: t(
      'A good cabin starts with the site and the people who will use it.',
      '好的小屋方案从场地和真实使用者开始。',
      'Un bon chalet commence par le site et les personnes qui l’utiliseront.'
    ),
    intro: t(
      'Modular living can mean a private retreat, a rental cabin, staff housing or a larger resort villa. Before choosing a floor plan, settle the basics: who will stay there, when it will be used, how utilities will work and how the module will reach the site.',
      '模块化生活可以是私人度假屋、出租小屋、员工住房或较大的度假别墅。在选择户型前，应先明确谁来使用、何时使用、公用设施如何运行，以及模块如何运到现场。',
      'L’habitat modulaire peut être une retraite privée, un chalet locatif, un logement du personnel ou une villa. Avant de choisir un plan, il faut préciser qui l’utilisera, à quelle saison, comment fonctionneront les services et comment le module arrivera sur le site.'
    ),
    blocks: [
      {
        title: t('Start with real use', '从真实使用方式开始', 'Commencer par l’usage réel'),
        body: t(
          'A weekend guest cabin and a year-round rental may look similar in a rendering, but they do not have the same occupancy, storage, maintenance or privacy needs. The first brief should describe the people, length of stay and daily routine—not only the bedroom count.',
          '周末客房与全年出租物业在效果图上可能很相似，但居住人数、储物、维护及隐私需求并不相同。第一份简报应说明使用者、停留时间及日常习惯，而不只是卧室数量。',
          'Un chalet d’invités et une location ouverte à l’année peuvent se ressembler sur une image, sans avoir les mêmes besoins d’occupation, de rangement, d’entretien ou d’intimité. Le dossier doit décrire les personnes, la durée des séjours et les habitudes quotidiennes.'
        )
      },
      {
        title: t('Climate changes the specification', '气候会改变规格', 'Le climat change la spécification'),
        body: t(
          'Insulation, windows, air sealing, vapour control, roof design, moisture management, heating and ventilation must work together. A model used in a mild climate cannot simply be called four-season without checking the exact Canadian location and use.',
          '保温、门窗、气密、隔汽、屋面、防潮、供暖及通风必须协同工作。在温和气候中使用的型号，不能在未核实加拿大具体地点及用途前就笼统称为四季适用。',
          'Isolation, fenêtres, étanchéité à l’air, contrôle de la vapeur, toiture, humidité, chauffage et ventilation doivent fonctionner ensemble. Un modèle utilisé sous un climat doux ne peut pas être qualifié de quatre saisons sans vérifier le lieu et l’usage.'
        )
      },
      {
        title: t('Utilities shape the layout', '公用设施会影响布局', 'Les services influencent le plan'),
        body: t(
          'Confirm power, water, wastewater, hot water, heating and cooling, ventilation, appliances and internet. Off-grid or limited-service sites need equipment space, storage, maintenance access and backup systems that standard floor plans may not show.',
          '应确认电力、供水、污水、热水、供暖制冷、通风、家电及网络。离网或服务受限场地需要设备空间、储存、维护通道及备用系统，而标准户型通常不会展示这些内容。',
          'Il faut confirmer l’électricité, l’eau, les eaux usées, l’eau chaude, le chauffage, la climatisation, la ventilation, les appareils et Internet. Les sites hors réseau exigent de l’espace pour les équipements, l’entretien et les systèmes de secours.'
        )
      },
      {
        title: t('The route and site work matter', '运输路线与现场工作很重要', 'Le trajet et les travaux de site comptent'),
        body: t(
          'Module dimensions, bridge clearances, turning space, seasonal roads, crane access and unloading areas can influence the design. Foundations, drainage, utility connections, decks, stairs and grading also need named owners and coordinated drawings.',
          '模块尺寸、桥梁净空、转弯空间、季节性道路、吊车通行及卸货区域都会影响设计。基础、排水、公用设施连接、平台、楼梯及场地平整也需要明确责任方和协调图纸。',
          'Les dimensions, les ponts, les rayons de virage, les routes saisonnières, la grue et le déchargement peuvent modifier le design. Fondations, drainage, raccordements, terrasses, escaliers et nivellement exigent aussi des responsables et des plans coordonnés.'
        )
      },
      {
        title: t('What a useful proposal should show', '一份有用的方案应说明什么', 'Ce qu’une proposition utile doit montrer'),
        body: t(
          'Look for the exact configuration, dimensions, weights, drawings, materials, included finishes and equipment, document status, packaging, freight assumptions, site exclusions, installation responsibilities, warranty terms and anything that can still change the price or schedule.',
          '方案应明确具体配置、尺寸、重量、图纸、材料、包含的饰面与设备、文件状态、包装、运费假设、现场排除项、安装责任、质保条款，以及仍可能改变价格或时间的因素。',
          'La proposition doit préciser la configuration, les dimensions, le poids, les plans, les matériaux, les finitions et équipements inclus, l’état des documents, l’emballage, le fret, les exclusions, les responsabilités, la garantie et les facteurs pouvant encore modifier le prix ou le délai.'
        )
      }
    ]
  },
  'tourism-hospitality': {
    eyebrow: t('Tourism & Hospitality', '旅游与酒店', 'Tourisme et hôtellerie'),
    title: t(
      'Plan the guest experience and the operating system together.',
      '宾客体验与运营体系应同步规划。',
      'Planifier ensemble l’expérience client et le système d’exploitation.'
    ),
    intro: t(
      'A hospitality project is more than a row of guest units. Reception, housekeeping, staff space, food service, accessibility, utilities, maintenance and the journey from arrival to departure all affect whether the property works well.',
      '旅游酒店项目不只是一排客房。接待、清洁、员工空间、餐饮、无障碍、公用设施、维护，以及宾客从抵达到离开的完整动线，都会影响项目能否顺利运营。',
      'Un projet hôtelier ne se résume pas à une rangée d’unités. Réception, entretien ménager, espaces du personnel, restauration, accessibilité, services, maintenance et parcours du client déterminent si le site fonctionne bien.'
    ),
    blocks: [
      {
        title: t('Define the guest and business model', '明确客群与商业模式', 'Définir la clientèle et le modèle d’affaires'),
        body: t(
          'Start with the target guest, length of stay, season, nightly rate, service level and expected occupancy. A simple campground cabin, a premium resort suite and staff accommodation should not be planned from the same brief.',
          '应先明确目标客群、停留时间、运营季节、房价、服务水平及预计入住率。普通营地小屋、高端度假套房及员工住宿不应使用同一份简报。',
          'Commencez par la clientèle, la durée des séjours, la saison, le tarif, le niveau de service et l’occupation prévue. Un chalet simple, une suite haut de gamme et un logement du personnel ne doivent pas partir du même dossier.'
        )
      },
      {
        title: t('Plan the whole site', '规划整个场地', 'Planifier tout le site'),
        body: t(
          'Roads, parking, paths, lighting, reception, common areas, washrooms, staff facilities, waste, utilities and emergency access all compete for space. The first phase should also leave a workable route for future units and shared services.',
          '道路、停车、步道、照明、接待、公共空间、卫生间、员工设施、垃圾、公用设施及应急通道都会占用场地。第一期还应为未来单元及共享服务预留可行扩展路径。',
          'Routes, stationnement, sentiers, éclairage, réception, espaces communs, sanitaires, installations du personnel, déchets, services et accès d’urgence se partagent le terrain. La première phase doit aussi laisser une voie réaliste pour les futures unités.'
        )
      },
      {
        title: t('Guest flow and staff flow are different', '宾客动线与员工动线不同', 'Le parcours client et celui du personnel sont différents'),
        body: t(
          'Guests need a comfortable arrival and private access. Staff need efficient routes for cleaning, laundry, supplies, waste, maintenance and emergency response. Good planning keeps those movements from interfering with each other.',
          '宾客需要舒适的抵达体验及私密通道；员工则需要高效完成清洁、洗衣、补给、垃圾、维护及应急响应。良好规划应避免两类动线彼此干扰。',
          'Les clients ont besoin d’une arrivée simple et d’un accès privé. Le personnel doit circuler efficacement pour le ménage, la buanderie, les fournitures, les déchets, l’entretien et les urgences. Un bon plan évite que ces parcours se gênent.'
        )
      },
      {
        title: t('Shared infrastructure can limit unit count', '共享基础设施可能限制单元数量', 'L’infrastructure commune peut limiter le nombre d’unités'),
        body: t(
          'Power, potable water, wastewater, fire access, snow management, roads and staff housing can determine how many guest units the site supports. Adding rooms before checking those systems can create a plan that looks good but cannot operate.',
          '电力、饮用水、污水、消防通道、积雪管理、道路及员工住宿可能决定场地可承载多少客房。在核实这些系统前增加房间，可能得到一个漂亮但无法运营的方案。',
          'Électricité, eau potable, eaux usées, accès incendie, neige, routes et logement du personnel peuvent déterminer le nombre d’unités possibles. Ajouter des chambres avant de vérifier ces systèmes peut produire un beau plan impossible à exploiter.'
        )
      },
      {
        title: t('What should be clear before a quote', '报价前应明确什么', 'Ce qui doit être clair avant un devis'),
        body: t(
          'The site, room mix, unit count, season, service level, common facilities, utility strategy, accessibility needs, target opening and responsibility for site work should be clear enough to support a meaningful scope. Otherwise, the number may be little more than a factory price.',
          '场地、房型组合、单元数量、运营季节、服务水平、公共设施、公用设施策略、无障碍需求、目标开业时间及现场工作责任应足够清晰，才能形成有意义的范围。否则，报价可能只是一个工厂价格。',
          'Le site, la combinaison de chambres, le nombre d’unités, la saison, le niveau de service, les espaces communs, les services, l’accessibilité, la date d’ouverture et les responsabilités de chantier doivent être assez clairs pour établir une vraie portée.'
        )
      }
    ]
  },
  'commercial-solutions': {
    eyebrow: t('Commercial Solutions', '商业解决方案', 'Solutions commerciales'),
    title: t(
      'Build the unit around the business, not the other way around.',
      '让空间适应业务，而不是让业务迁就空间。',
      'Concevoir l’unité autour de l’entreprise, et non l’inverse.'
    ),
    intro: t(
      'A small kiosk or modular workplace leaves little room for mistakes. Equipment, staff movement, storage, customers, deliveries, cleaning and approvals all compete for the same area. The operating plan should be settled before the shell is ordered.',
      '小型售卖亭或模块化工作空间几乎没有容错空间。设备、员工动线、仓储、顾客、补货、清洁及审批都在争夺有限面积。因此在订购外壳前，必须先明确运营计划。',
      'Un petit kiosque ou espace de travail laisse peu de marge d’erreur. Équipements, personnel, stockage, clients, livraisons, nettoyage et approbations se partagent le même espace. Le plan d’exploitation doit être établi avant de commander l’enveloppe.'
    ),
    blocks: [
      {
        title: t('Write the operating brief first', '先写清运营简报', 'Rédiger d’abord le dossier d’exploitation'),
        body: t(
          'Describe what is sold or delivered, expected customer volume, peak periods, service time, staffing and hours. A walk-up coffee kiosk, food counter, retail unit and appointment-based office need different circulation and equipment.',
          '应说明销售或提供什么、预计客流、高峰时段、服务时间、人员配置及营业时间。步入式咖啡亭、餐饮柜台、零售单元及预约制办公室需要不同的动线和设备。',
          'Décrivez l’offre, le volume de clients, les périodes de pointe, le temps de service, le personnel et les heures. Un kiosque café, un comptoir alimentaire, un commerce et un bureau sur rendez-vous exigent des flux et équipements différents.'
        )
      },
      {
        title: t('Confirm major equipment early', '尽早确认主要设备', 'Confirmer tôt les équipements importants'),
        body: t(
          'List appliances, electrical loads, plumbing, ventilation, heat-producing equipment, data connections and clearances. A late change can alter panels, wiring, ducts, counters, approvals, cost and delivery time.',
          '应列出家电、电气负荷、给排水、通风、发热设备、数据连接及净空。后期变更可能改变配电箱、布线、风管、台面、审批、成本及交期。',
          'Dressez la liste des appareils, charges électriques, plomberie, ventilation, équipements produisant de la chaleur, connexions et dégagements. Un changement tardif peut modifier panneaux, câblage, conduits, comptoirs, approbations, coût et délai.'
        )
      },
      {
        title: t('Map customer and staff movement', '规划顾客与员工动线', 'Cartographier les déplacements'),
        body: t(
          'Ordering, payment, preparation, pickup, seating, waste, deliveries and emergency exits should be mapped before walls and counters are fixed. Attractive finishes cannot repair a poor workflow.',
          '点单、付款、制作、取餐、座位、垃圾、补货及紧急出口应在墙体和柜台定稿前完成规划。漂亮饰面无法弥补糟糕流程。',
          'Commande, paiement, préparation, retrait, places assises, déchets, livraisons et sorties doivent être cartographiés avant de fixer murs et comptoirs. De belles finitions ne corrigent pas un mauvais fonctionnement.'
        )
      },
      {
        title: t('The site is part of the business', '场地属于业务的一部分', 'Le site fait partie de l’activité'),
        body: t(
          'Parking, pedestrian access, queues, accessibility, weather protection, signage, lighting, security, waste pickup and delivery vehicles all affect how the business works. A small building can still need a carefully planned site.',
          '停车、步行通道、排队、无障碍、防风雨、标识、照明、安防、垃圾清运及配送车辆都会影响业务运行。建筑可以很小，但场地仍需认真规划。',
          'Stationnement, accès piéton, files, accessibilité, protection, signalisation, éclairage, sécurité, collecte des déchets et livraisons influencent l’activité. Un petit bâtiment exige malgré tout un site bien planifié.'
        )
      },
      {
        title: t('Separate every part of the quoted scope', '报价范围应逐项拆分', 'Distinguer chaque partie de la portée'),
        body: t(
          'The proposal should separate the shell, fixed equipment, loose equipment, branding, export packaging, freight, customs, foundation, site services, crane, installation, inspections and operating licences. One unexplained total hides gaps and makes comparison difficult.',
          '方案应分别列明外壳、固定设备、活动设备、品牌、出口包装、运输、海关、基础、场地服务、吊车、安装、检查及运营许可。一个没有解释的总价会掩盖缺口并增加比较难度。',
          'La proposition doit distinguer enveloppe, équipements fixes et mobiles, marque, emballage export, fret, douane, fondations, services de site, grue, installation, inspections et licences. Un total sans explication cache les lacunes.'
        )
      }
    ]
  },
  'industrial-solutions': {
    eyebrow: t('Industrial & Remote Operations', '工业与偏远运营', 'Opérations industrielles et éloignées'),
    title: t(
      'Remote sites need dependable systems and a clear deployment plan.',
      '偏远场地需要可靠系统和清晰的部署计划。',
      'Les sites éloignés exigent des systèmes fiables et un plan de déploiement clair.'
    ),
    intro: t(
      'Mining, construction and remote projects often need accommodation and operational space before permanent infrastructure is available. The solution has to work for the people, climate, transport route, utility plan, maintenance team and sequence in which the site grows.',
      '矿业、建筑及偏远项目通常在永久基础设施建成前就需要住宿和运营空间。方案必须适合人员、气候、运输路线、公用设施计划、维护团队及场地扩展顺序。',
      'Les projets miniers, de construction et éloignés ont souvent besoin d’hébergement et d’espaces opérationnels avant l’infrastructure permanente. La solution doit convenir aux personnes, au climat, au transport, aux services, à l’équipe d’entretien et à la croissance du site.'
    ),
    blocks: [
      {
        title: t('Plan the workforce, not only the beds', '规划人员体系，而不只是床位', 'Planifier les effectifs, pas seulement les lits'),
        body: t(
          'Define headcount by shift, room standard, rotation, privacy needs, dining, recreation, laundry, medical, administration and security. A camp is an operating environment, not a collection of sleeping boxes.',
          '应按班次明确人数、房间标准、轮班、隐私需求、餐饮、娱乐、洗衣、医疗、行政及安保。营地是一个运营环境，而不是一组睡眠盒子。',
          'Définissez les effectifs par quart, le type de chambres, les rotations, l’intimité, la restauration, les loisirs, la buanderie, le médical, l’administration et la sécurité. Un camp est un environnement d’exploitation, pas une série de boîtes-dortoirs.'
        )
      },
      {
        title: t('Design for real climate and hazards', '针对真实气候与风险设计', 'Concevoir pour le climat et les risques réels'),
        body: t(
          'Cold, wind, snow, dust, mud, wildfire smoke, long darkness or limited water can change the envelope and mechanical systems. Freeze protection, redundancy, emergency power, monitoring and safe shutdown procedures may be essential.',
          '寒冷、强风、积雪、粉尘、泥泞、野火烟雾、长时间黑暗或水资源有限都会改变围护和机电系统。防冻、冗余、应急电源、监测及安全停机程序可能至关重要。',
          'Froid, vent, neige, poussière, boue, fumée, longues périodes d’obscurité ou manque d’eau peuvent modifier l’enveloppe et la mécanique. Protection contre le gel, redondance, alimentation d’urgence, surveillance et arrêt sécuritaire peuvent être essentiels.'
        )
      },
      {
        title: t('Deployment order matters', '部署顺序很重要', 'L’ordre de déploiement compte'),
        body: t(
          'Road limits, seasonal access, escorts, cranes, staging areas and receiving capacity affect module size and delivery order. Power, water, kitchen, medical, administration and accommodation may need to arrive in a specific sequence so the site can start safely.',
          '道路限制、季节通行、护送、吊车、暂存区及收货能力会影响模块尺寸和交付顺序。电力、供水、厨房、医疗、行政及住宿可能需要按特定顺序到场，确保现场安全启动。',
          'Limites routières, accès saisonnier, escortes, grues, zones de dépôt et capacité de réception influencent la taille et l’ordre des modules. Énergie, eau, cuisine, médical, administration et hébergement doivent parfois arriver dans un ordre précis.'
        )
      },
      {
        title: t('Utilities need clear owners and interfaces', '公用设施需要明确责任方与接口', 'Les services exigent des responsables et interfaces clairs'),
        body: t(
          'Power generation, fuel, potable water, wastewater, waste storage and communications may sit inside the modular scope or in separate site infrastructure. The split and connection points must be documented before procurement.',
          '发电、燃料、饮用水、污水、垃圾储存及通信可能属于模块范围，也可能属于独立场地基础设施。采购前必须记录责任划分及连接点。',
          'Production d’énergie, carburant, eau potable, eaux usées, déchets et communications peuvent faire partie du module ou de l’infrastructure du site. La séparation et les points de connexion doivent être documentés avant l’achat.'
        )
      },
      {
        title: t('Handover should prepare the operator', '移交应让运营方做好准备', 'La remise doit préparer l’exploitant'),
        body: t(
          'Remote downtime is expensive. The handover package should include operating procedures, preventive maintenance, critical spares, warranty contacts, issue escalation, training and records that remain useful after staff changes.',
          '偏远项目停机成本很高。移交资料应包括操作程序、预防性维护、关键备件、质保联系人、问题升级、培训及在人事变化后仍可使用的记录。',
          'Les arrêts en région éloignée coûtent cher. La remise doit comprendre procédures, entretien préventif, pièces critiques, contacts de garantie, escalade, formation et dossiers qui restent utiles malgré les changements de personnel.'
        )
      }
    ]
  },
  'public-community': {
    eyebrow: t('Public & Community Spaces', '公共与社区空间', 'Espaces publics et communautaires'),
    title: t(
      'Public-serving spaces have to work for more people, for longer.',
      '服务公众的空间必须适用于更多人，并经得起更长期使用。',
      'Les espaces publics doivent servir davantage de personnes, plus longtemps.'
    ),
    intro: t(
      'Education, administration and community buildings carry responsibilities that go beyond the room layout. Accessibility, safeguarding, durability, acoustics, procurement, records and long-term maintenance should be considered from the beginning.',
      '教育、行政及社区建筑的责任远不止房间布局。无障碍、安全保护、耐用性、声学、采购、记录及长期维护都应从一开始考虑。',
      'Les bâtiments d’éducation, d’administration et communautaires impliquent plus qu’un plan. Accessibilité, protection, durabilité, acoustique, approvisionnement, dossiers et entretien à long terme doivent être intégrés dès le départ.'
    ),
    blocks: [
      {
        title: t('Start with the people and program', '从使用者与功能开始', 'Commencer par les personnes et le programme'),
        body: t(
          'Define who will use the building, in what numbers, for how long and under whose supervision. Children, seniors, staff, visitors and people with disabilities may need different circulation, washrooms, visibility, security and comfort.',
          '应明确谁来使用建筑、人数、使用时长及监督责任。儿童、老年人、员工、访客及残障人士在动线、卫生间、可视性、安全及舒适方面可能有不同需求。',
          'Précisez qui utilisera le bâtiment, en quel nombre, pendant combien de temps et sous quelle supervision. Enfants, aînés, personnel, visiteurs et personnes handicapées peuvent avoir des besoins différents.'
        )
      },
      {
        title: t('Plan accessibility from the start', '从一开始规划无障碍', 'Planifier l’accessibilité dès le début'),
        body: t(
          'Entrances, routes, doors, washrooms, controls, signage, acoustics and emergency procedures should be planned for inclusive use. Adding them later is usually more expensive, more disruptive and less effective.',
          '入口、路径、门、卫生间、控制装置、标识、声学及应急程序都应按包容性使用进行规划。后期增加通常成本更高、干扰更大且效果更差。',
          'Entrées, parcours, portes, sanitaires, commandes, signalisation, acoustique et procédures d’urgence doivent être planifiés pour un usage inclusif. Les ajouter plus tard coûte généralement plus cher et fonctionne moins bien.'
        )
      },
      {
        title: t('Choose materials for daily reality', '根据日常现实选择材料', 'Choisir les matériaux pour la réalité quotidienne'),
        body: t(
          'High-use buildings need robust surfaces, replaceable components, practical storage, easy cleaning and safe maintenance access. Material choices should reflect impact, moisture, snow, salt, cleaning products and the maintenance team actually available.',
          '高频使用建筑需要耐用表面、可更换部件、实用储物、便于清洁及安全维护通道。材料选择应考虑撞击、潮湿、积雪、融雪盐、清洁剂及实际可用的维护团队。',
          'Les bâtiments très fréquentés ont besoin de surfaces robustes, de composants remplaçables, de rangement, d’un nettoyage simple et d’un accès sûr. Les matériaux doivent tenir compte des chocs, de l’humidité, de la neige, du sel et de l’équipe disponible.'
        )
      },
      {
        title: t('Visibility and safeguarding affect the layout', '可视性与安全保护会影响布局', 'La visibilité et la protection influencent le plan'),
        body: t(
          'Reception, entry control, sightlines, secure storage, staff-only areas, exterior lighting and emergency exits should support the way the organization supervises and protects users. These are planning decisions, not accessories.',
          '接待、门禁、视线、安全储物、员工专用区、外部照明及紧急出口应支持机构监督和保护使用者的实际方式。这些属于规划决策，而不是附加配件。',
          'Réception, contrôle d’accès, lignes de vue, rangement sécurisé, zones réservées, éclairage extérieur et sorties doivent soutenir la façon dont l’organisation supervise et protège les usagers. Ce sont des décisions de planification.'
        )
      },
      {
        title: t('A responsible proposal connects all the pieces', '负责任的方案应连接所有要素', 'Une proposition responsable relie tous les éléments'),
        body: t(
          'The proposal should connect the program and users to the layout, accessibility, safety, durability, maintenance, site work, document status, approval path, responsibilities and cost assumptions. A public-serving building should not be sold from a photograph and a square-metre price alone.',
          '方案应把功能与使用者同布局、无障碍、安全、耐用性、维护、现场工作、文件状态、审批路径、责任及成本假设连接起来。服务公众的建筑不能只凭一张图片和每平方米价格销售。',
          'La proposition doit relier le programme et les usagers au plan, à l’accessibilité, la sécurité, la durabilité, l’entretien, les travaux de site, l’état des documents, le parcours d’approbation, les responsabilités et les hypothèses de coût.'
        )
      }
    ]
  },

  industries: {
    eyebrow: t('Industries', '行业方案', 'Secteurs'),
    title: t(
      'Different operating problems need different modular answers.',
      '不同运营问题需要不同的模块化答案。',
      'À chaque problème d’exploitation, une réponse modulaire différente.'
    ),
    intro: t(
      'NEXUS begins with the operating environment rather than forcing every client into the same product list. The people, workflow, safety requirements, site conditions, service expectations and business model should shape the project brief.',
      'NEXUS 从运营环境出发，而不是把所有客户塞进同一份产品清单。人员、流程、安全要求、场地条件、服务预期及商业模式应共同塑造项目简报。',
      'NEXUS part de l’environnement opérationnel au lieu d’imposer le même catalogue à tous. Les personnes, les flux, la sécurité, le site, le niveau de service et le modèle d’affaires doivent façonner le dossier du projet.'
    ),
    blocks: [
      {
        title: t('Mining & Remote Resources', '矿业与偏远资源项目', 'Mines et ressources éloignées'),
        body: t(
          'Typical needs include workforce accommodation, dining, administration, change rooms, medical, storage and utility support. The brief should cover headcount by shift, rotation, climate, access, camp standards, emergency planning and the sequence of site development.',
          '典型需求包括员工住宿、餐饮、行政、更衣、医疗、仓储及公用设施支持。项目简报应涵盖各班次人数、轮班、气候、通行、营地标准、应急规划及场地开发顺序。',
          'Les besoins comprennent souvent hébergement, restauration, administration, vestiaires, médical, stockage et services. Le dossier doit préciser effectifs par quart, rotations, climat, accès, normes du camp, urgence et séquence de développement.'
        )
      },
      {
        title: t('Construction & Site Operations', '建筑与现场运营', 'Construction et opérations de chantier'),
        body: t(
          'Projects may need offices, meeting rooms, welfare facilities, secure storage, workshops and temporary accommodation that can arrive quickly, move as the site changes and remain serviceable under heavy daily use.',
          '项目可能需要办公室、会议室、福利设施、安全仓储、车间及临时住宿。这些空间需要快速到场、随现场变化移动，并能承受高强度日常使用。',
          'Les chantiers peuvent nécessiter bureaux, salles de réunion, installations de bien-être, stockage sécurisé, ateliers et hébergement temporaire, livrés rapidement, déplaçables et capables de supporter un usage intensif.'
        )
      },
      {
        title: t('Tourism, Resorts & Campgrounds', '旅游、度假村与营地', 'Tourisme, villégiature et camping'),
        body: t(
          'The project should connect guest accommodation with reception, staff space, washrooms, food service, utilities, maintenance, accessibility and the seasonal business model. Unit count alone does not define a viable resort.',
          '项目应把客房与接待、员工空间、卫生设施、餐饮、公用设施、维护、无障碍及季节性商业模式连接起来。单元数量本身不能构成可行度假项目。',
          'Le projet doit relier hébergement, réception, espaces du personnel, sanitaires, restauration, services, entretien, accessibilité et modèle saisonnier. Le nombre d’unités ne suffit pas à rendre un complexe viable.'
        )
      },
      {
        title: t('Retail, Food & Service Businesses', '零售、餐饮与服务业', 'Commerce, restauration et services'),
        body: t(
          'Kiosks and compact units work best when equipment, utilities, customer flow, staff movement, storage, deliveries, cleaning and approvals are resolved before the shell is ordered.',
          '售卖亭和紧凑型单元只有在订购外壳前就解决设备、公用设施、顾客动线、员工移动、仓储、补货、清洁及审批问题，才能真正高效运行。',
          'Les kiosques et petites unités fonctionnent mieux lorsque équipements, services, circulation, personnel, stockage, livraisons, nettoyage et approbations sont réglés avant la commande de l’enveloppe.'
        )
      },
      {
        title: t('Education & Community Programs', '教育与社区项目', 'Éducation et programmes communautaires'),
        body: t(
          'Classrooms, administration and community spaces should be planned around the people served, accessibility, safeguarding, acoustics, storage, public procurement, maintenance and future program changes.',
          '教室、行政及社区空间应围绕服务人群、无障碍、安全保护、声学、储物、公共采购、维护及未来功能变化进行规划。',
          'Salles de classe, administration et espaces communautaires doivent être planifiés selon les usagers, l’accessibilité, la protection, l’acoustique, le rangement, l’approvisionnement public, l’entretien et l’évolution des programmes.'
        )
      },
      {
        title: t('Developers & Property Owners', '开发商与业主', 'Promoteurs et propriétaires'),
        body: t(
          'Modular delivery may support phased development, repeatable unit types and earlier off-site production. The business case still needs land-use review, site servicing, financing assumptions, approval timing, transport analysis and a clear division between factory and site work.',
          '模块化交付可能支持分期开发、可重复单元及更早的场外生产，但商业可行性仍需土地用途审查、场地服务、融资假设、审批时间、运输分析及清晰的工厂与现场工作划分。',
          'Le modulaire peut favoriser le phasage, la répétition et une production hors site plus tôt. Le dossier commercial doit néanmoins couvrir l’usage du terrain, les services, le financement, les délais d’approbation, le transport et la séparation entre usine et chantier.'
        )
      },
      {
        title: t('Institutions & Essential Services', '机构与基本服务', 'Institutions et services essentiels'),
        body: t(
          'Organizations planning administration, service delivery, temporary capacity or remote facilities need transparent procurement, durable systems, clear documentation, local service arrangements and an approval pathway suited to the people and activities inside.',
          '规划行政、服务交付、临时容量或偏远设施的机构需要透明采购、耐用系统、清晰文件、本地服务安排，以及适合内部人员和活动的审批路径。',
          'Les organisations qui planifient administration, prestation de services, capacité temporaire ou installations éloignées ont besoin d’un approvisionnement transparent, de systèmes durables, de documents clairs, de service local et d’un parcours adapté aux usagers.'
        )
      }
    ]
  },
  projects: {
    eyebrow: t('Projects', '项目', 'Projets'),
    title: t(
      'Concepts, active opportunities and verified work—kept clearly separate.',
      '概念、推进中机会及经核验项目，清晰区分。',
      'Concepts, possibilités actives et réalisations vérifiées, clairement séparés.'
    ),
    intro: t(
      'The project gallery shows how NEXUS solution families may be applied. Each entry carries a visible status. A design concept illustrates direction; it does not claim a client, location, approval or completed delivery.',
      '项目展示说明 NEXUS 各方案类别可能如何应用。每个项目均有明确状态。设计概念用于表达方向，并不代表真实客户、地点、批准或已完成交付。',
      'La galerie montre comment les familles de solutions NEXUS peuvent être appliquées. Chaque entrée affiche son statut. Un concept illustre une direction; il ne prétend pas représenter un client, un lieu, une approbation ou une livraison achevée.'
    ),
    blocks: [
      {
        title: t('Design Concept', '设计概念', 'Concept de design'),
        body: t(
          'A visual or planning direction created to explore a possible application. It has no implied client, location, permit, contract or delivery unless those facts are separately confirmed.',
          '用于探索可能应用的视觉或规划方向。除非另有确认，否则不代表真实客户、地点、许可、合同或交付。',
          'Une direction visuelle ou de planification qui explore une application possible. Elle n’implique aucun client, lieu, permis, contrat ou livraison sauf confirmation distincte.'
        )
      },
      {
        title: t('Opportunity Under Review', '评估中的机会', 'Possibilité à l’étude'),
        body: t(
          'A potential project with a real inquiry or partner discussion, but without enough confirmed information to present it as active development. The next step is usually a clearer brief, site information and responsibility map.',
          '存在真实询价或伙伴讨论的潜在项目，但尚无足够确认信息可称为开发中项目。下一步通常是完善简报、场地资料及责任图。',
          'Un projet potentiel faisant l’objet d’une demande ou discussion réelle, mais sans assez d’information confirmée pour être présenté comme en développement. La prochaine étape est souvent un dossier, des renseignements de site et une carte des responsabilités.'
        )
      },
      {
        title: t('Project in Development', '开发中项目', 'Projet en développement'),
        body: t(
          'An identified client or sponsor, defined business need and active workstream with agreed next actions. Public disclosure still depends on permission and the evidence available.',
          '已明确客户或发起方、业务需求及正在推进的工作，并有约定下一步。公开披露仍取决于许可及可用证据。',
          'Un client ou promoteur identifié, un besoin défini et un travail actif avec prochaines étapes convenues. La divulgation publique dépend toujours des autorisations et preuves disponibles.'
        )
      },
      {
        title: t('Verified Project', '已核验项目', 'Projet vérifié'),
        body: t(
          'A status supported by evidence appropriate to the claim, such as client-approved information, location, scope, dated photographs, approvals, handover records and measurable outcomes.',
          '该状态由与声明相匹配的证据支持，例如客户批准信息、地点、范围、带日期照片、批准文件、移交记录及可衡量结果。',
          'Un statut soutenu par des preuves adaptées à l’affirmation : information approuvée par le client, lieu, portée, photos datées, approbations, remise et résultats mesurables.'
        )
      },
      {
        title: t('Confidential Work', '保密项目', 'Travail confidentiel'),
        body: t(
          'Some real projects may be described anonymously or not published at all. Confidentiality does not reduce the internal evidence standard; it only limits what can be shown publicly.',
          '部分真实项目可能匿名说明或完全不公开。保密不会降低内部证据标准，只会限制公开展示内容。',
          'Certains projets réels peuvent être décrits anonymement ou ne pas être publiés. La confidentialité ne réduit pas la norme de preuve interne; elle limite seulement ce qui peut être rendu public.'
        )
      }
    ]
  },
  suppliers: {
    eyebrow: t('Suppliers', '供应商', 'Fournisseurs'),
    title: t(
      'A serious route into Canadian projects for manufacturers who can document what they make.',
      '为能够证明自身制造能力的供应商提供进入加拿大项目的严肃路径。',
      'Une voie sérieuse vers les projets canadiens pour les fabricants capables de documenter leurs produits.'
    ),
    intro: t(
      'NEXUS is interested in capable manufacturers and technology partners, but listing a product is not the same as qualifying it for a project. Suppliers should be prepared to share accurate company, factory, product, quality, testing, export and service information.',
      'NEXUS 欢迎有能力的制造商和技术伙伴，但展示产品并不等于产品已适合具体项目。供应商应准备提供准确的企业、工厂、产品、质量、测试、出口及服务信息。',
      'NEXUS recherche des fabricants et partenaires technologiques compétents, mais présenter un produit ne signifie pas qu’il est qualifié pour un projet. Les fournisseurs doivent fournir des renseignements exacts sur l’entreprise, l’usine, le produit, la qualité, les essais, l’exportation et le service.'
    ),
    blocks: [
      {
        title: t('Company and ownership verification', '企业与所有权核验', 'Vérification de l’entreprise et de la propriété'),
        body: t(
          'Provide legal registration, ownership, factory addresses, key contacts, export entities, banking identity and any relationships between the manufacturer, trading company and brand owner. The contracting party must be clear.',
          '请提供合法注册、所有权、工厂地址、关键联系人、出口主体、银行身份，以及制造商、贸易公司和品牌所有者之间的关系。合同责任方必须清晰。',
          'Fournissez l’enregistrement légal, la propriété, les adresses d’usine, contacts, entités exportatrices, identité bancaire et liens entre fabricant, société commerciale et propriétaire de marque. La partie contractante doit être claire.'
        )
      },
      {
        title: t('Factory capability and capacity', '工厂能力与产能', 'Capacité et moyens de l’usine'),
        body: t(
          'Describe production lines, core processes, subcontracted work, monthly capacity, quality staff, engineering resources, lead times, material controls and the way changes are approved and recorded.',
          '请说明生产线、核心工艺、外包工作、月产能、质量人员、工程资源、交期、材料控制及变更批准和记录方式。',
          'Décrivez les lignes de production, procédés principaux, sous-traitance, capacité mensuelle, personnel qualité, ressources d’ingénierie, délais, contrôle des matériaux et gestion des changements.'
        )
      },
      {
        title: t('Complete product file', '完整产品档案', 'Dossier produit complet'),
        body: t(
          'A useful submission includes current drawings, specifications, bill of materials, options, dimensions, weights, packing method, installation instructions, operating limits, maintenance needs and clear identification of what is standard or optional.',
          '有效提交应包括最新图纸、规格、物料清单、选项、尺寸、重量、包装方式、安装说明、运行限制、维护需求，并明确哪些属于标准配置或选配。',
          'Une soumission utile comprend plans à jour, spécifications, nomenclature, options, dimensions, poids, emballage, instructions d’installation, limites d’utilisation, entretien et distinction entre standard et option.'
        )
      },
      {
        title: t('Testing, certification and traceability', '测试、认证与追溯', 'Essais, certification et traçabilité'),
        body: t(
          'Certificates alone are not enough. Suppliers should provide the underlying test reports, scope, model references, issuing organization, expiry or surveillance information and evidence that production units match the tested configuration.',
          '仅有证书并不够。供应商应提供基础测试报告、适用范围、型号引用、签发机构、有效期或监督信息，以及量产产品与测试配置一致的证据。',
          'Un certificat ne suffit pas. Le fournisseur doit fournir rapports d’essai, portée, modèles visés, organisme émetteur, validité ou surveillance, et preuve que la production correspond à la configuration testée.'
        )
      },
      {
        title: t('Quality control and inspection access', '质量控制与检验权限', 'Contrôle qualité et accès aux inspections'),
        body: t(
          'Explain incoming inspection, in-process checks, final testing, non-conformance handling, corrective action, photo records and serial or batch traceability. Project orders may require agreed hold points and third-party inspection access.',
          '请说明来料检验、过程检查、最终测试、不合格处理、纠正措施、照片记录及序列号或批次追溯。项目订单可能要求约定停检点及第三方检验权限。',
          'Expliquez inspection à l’entrée, contrôles en cours, essais finaux, non-conformités, actions correctives, photos et traçabilité par série ou lot. Les commandes peuvent exiger des points d’arrêt et un accès à l’inspection tierce.'
        )
      },
      {
        title: t('Commercial and export readiness', '商业与出口准备度', 'Préparation commerciale et export'),
        body: t(
          'Quotes should identify currency, validity, Incoterms, packaging, freight assumptions, payment milestones, lead time, exclusions, spare parts and warranty responsibility. Export packaging and shipping documents must match the actual route and product.',
          '报价应明确币种、有效期、贸易术语、包装、运费假设、付款节点、交期、排除项、备件及质保责任。出口包装和运输文件必须与实际路线及产品一致。',
          'Les devis doivent préciser devise, validité, Incoterms, emballage, hypothèses de fret, paiements, délai, exclusions, pièces et garantie. L’emballage et les documents d’expédition doivent correspondre au produit et au trajet.'
        )
      },
      {
        title: t('After-sales responsibility', '售后责任', 'Responsabilité après-vente'),
        body: t(
          'Canadian buyers need a workable process for technical questions, missing parts, damage, warranty claims, replacement components, manuals and software updates. Response time and escalation contacts should be agreed before the order.',
          '加拿大买家需要可执行的技术问题、缺件、损坏、质保索赔、替换部件、手册及软件更新流程。响应时间和升级联系人应在下单前约定。',
          'Les acheteurs canadiens ont besoin d’un processus pour questions techniques, pièces manquantes, dommages, garanties, remplacements, manuels et mises à jour. Les délais de réponse et contacts d’escalade doivent être convenus avant la commande.'
        )
      }
    ]
  },
  news: {
    eyebrow: t('News & Insights', '新闻与洞察', 'Actualités et analyses'),
    title: t(
      'Useful guidance for people planning modular projects.',
      '为模块化项目规划者提供真正有用的指导。',
      'Des conseils utiles pour ceux qui planifient des projets modulaires.'
    ),
    intro: t(
      'This section is intended to answer practical questions about project planning, Canadian delivery, global sourcing, product evaluation and sector applications. Articles should be dated, sourced and clear about the difference between fact, guidance and opinion.',
      '本栏目旨在回答项目规划、加拿大交付、全球采购、产品评估及行业应用中的实际问题。文章应注明日期和来源，并清楚区分事实、指导与观点。',
      'Cette section répondra à des questions pratiques sur la planification, la livraison au Canada, l’approvisionnement mondial, l’évaluation des produits et les applications sectorielles. Les articles devront être datés, sourcés et distinguer clairement faits, conseils et opinions.'
    ),
    blocks: [
      {
        title: t('Planning before product selection', '选产品前的项目规划', 'Planifier avant de choisir un produit'),
        body: t(
          'Guides on writing a project brief, defining occupancy and capacity, checking site constraints, setting a realistic budget range and identifying the decisions that must be made before requesting supplier quotes.',
          '介绍如何编写项目简报、明确占用与容量、检查场地限制、设定现实预算范围，以及在向供应商询价前必须完成的决策。',
          'Guides pour rédiger un dossier de projet, définir occupation et capacité, vérifier les contraintes du site, établir un budget réaliste et identifier les décisions à prendre avant de demander des devis.'
        )
      },
      {
        title: t('Canadian compliance and delivery', '加拿大合规与交付', 'Conformité et livraison au Canada'),
        body: t(
          'Plain-language explanations of jurisdiction, professional review, product evidence, permits, inspections, site work and why the approval pathway must be confirmed for each location and use.',
          '以通俗语言解释司法辖区、专业审查、产品证据、许可、检查、现场工作，以及为何每个地点和用途都必须单独确认审批路径。',
          'Explications simples sur juridiction, examen professionnel, preuves produit, permis, inspections, travaux de site et nécessité de confirmer le parcours pour chaque lieu et usage.'
        )
      },
      {
        title: t('Supplier and product evaluation', '供应商与产品评估', 'Évaluation des fournisseurs et produits'),
        body: t(
          'Practical checklists for comparing specifications, drawings, materials, factory capability, testing, quality records, commercial terms, packaging, logistics, warranty and after-sales support.',
          '用于比较规格、图纸、材料、工厂能力、测试、质量记录、商业条款、包装、物流、质保及售后的实用清单。',
          'Listes pratiques pour comparer spécifications, plans, matériaux, capacité d’usine, essais, qualité, conditions commerciales, emballage, logistique, garantie et service.'
        )
      },
      {
        title: t('Industry applications', '行业应用', 'Applications sectorielles'),
        body: t(
          'Detailed looks at remote workforce camps, tourism accommodation, commercial kiosks, education spaces and other situations where modular delivery may solve a real operating problem—or may not be the right answer.',
          '深入分析偏远工人营地、旅游住宿、商业售卖亭、教育空间及其他模块化可能解决真实运营问题的场景，同时也说明何时模块化并非合适答案。',
          'Analyses des camps éloignés, hébergements touristiques, kiosques, espaces éducatifs et autres situations où le modulaire peut résoudre un problème réel — ou ne pas être la bonne réponse.'
        )
      },
      {
        title: t('Lessons from delivery', '交付经验', 'Leçons de livraison'),
        body: t(
          'As verified projects become available, this section will document what changed between concept and delivery, which assumptions proved wrong, how issues were resolved and what future clients can learn from the record.',
          '随着经核验项目形成，本栏目将记录概念到交付之间发生的变化、哪些假设被证明错误、问题如何解决，以及未来客户可从记录中学到什么。',
          'À mesure que des projets vérifiés seront disponibles, cette section documentera les écarts entre concept et livraison, les hypothèses erronées, les solutions apportées et les leçons utiles aux futurs clients.'
        )
      }
    ]
  },
  contact: {
    eyebrow: t('Contact', '联系我们', 'Contact'),
    title: t(
      'Tell us what the site needs to accomplish.',
      '告诉我们这个场地需要实现什么。',
      'Dites-nous ce que le site doit permettre de réaliser.'
    ),
    intro: t(
      'A useful first message does not need to be perfect. Share the location, intended use, approximate capacity, budget range, target date and any drawings or site information already available. We will use that to identify the right conversation and the missing decisions.',
      '第一次沟通不必完美。请提供地点、用途、大致容量、预算范围、目标日期，以及已有图纸或场地资料。我们将据此判断适合的沟通方向及尚待明确的决策。',
      'Un premier message n’a pas besoin d’être parfait. Indiquez le lieu, l’usage, la capacité approximative, le budget, la date cible et les plans ou renseignements déjà disponibles. Nous identifierons ensuite la bonne discussion et les décisions manquantes.'
    ),
    blocks: [
      {
        title: t('Project and development inquiries', '项目与开发询价', 'Demandes de projet et développement'),
        body: t(
          'For accommodation, tourism, commercial, industrial or community projects, describe the problem you are trying to solve and the site where the solution must operate. Product selection comes after that.',
          '对于住宿、旅游、商业、工业或社区项目，请先说明要解决的问题及方案实际运行的场地，产品选择应在此之后进行。',
          'Pour un projet d’hébergement, tourisme, commerce, industrie ou communauté, décrivez d’abord le problème et le site où la solution doit fonctionner. Le choix du produit vient ensuite.'
        )
      },
      {
        title: t('Product questions', '产品问题', 'Questions sur les produits'),
        body: t(
          'Include the product or category, intended use, destination, required quantity and the information you need—such as dimensions, drawings, materials, utilities, documentation status, price assumptions or delivery scope.',
          '请提供产品或类别、用途、目的地、数量及所需信息，例如尺寸、图纸、材料、公用设施、文件状态、价格假设或交付范围。',
          'Indiquez le produit ou la catégorie, l’usage, la destination, la quantité et les renseignements recherchés : dimensions, plans, matériaux, services, état des documents, hypothèses de prix ou portée de livraison.'
        )
      },
      {
        title: t('Supplier applications', '供应商申请', 'Candidatures de fournisseurs'),
        body: t(
          'Manufacturers should introduce the legal company, factory, main product lines, export markets, engineering capability, quality system, available test records and Canadian support plan. A catalogue alone is not enough for qualification.',
          '制造商应介绍合法主体、工厂、主要产品线、出口市场、工程能力、质量体系、可提供的测试记录及加拿大支持计划。仅提供目录不足以完成资格评估。',
          'Les fabricants doivent présenter l’entreprise légale, l’usine, les gammes, marchés export, capacité d’ingénierie, système qualité, essais disponibles et plan de soutien au Canada. Un catalogue seul ne suffit pas.'
        )
      },
      {
        title: t('Local professional and delivery partners', '本地专业与交付伙伴', 'Partenaires professionnels et de livraison locaux'),
        body: t(
          'NEXUS is interested in qualified Canadian architects, engineers, permit specialists, contractors, installers, logistics providers, service companies and other partners with relevant regional experience.',
          'NEXUS 欢迎具备相关地区经验的加拿大合格建筑师、工程师、许可顾问、承包商、安装商、物流服务商、售后公司及其他伙伴。',
          'NEXUS souhaite connaître des architectes, ingénieurs, spécialistes des permis, entrepreneurs, installateurs, logisticiens, sociétés de service et autres partenaires canadiens qualifiés ayant une expérience régionale pertinente.'
        )
      },
      {
        title: t('What happens after submission', '提交后会发生什么', 'Ce qui se passe après l’envoi'),
        body: t(
          'The inquiry is routed to the appropriate project or supplier workflow. Key gaps and follow-up questions are identified first. A quotation only follows when the opportunity is defined well enough to support a reliable scope, price and responsibility map.',
          '询价将进入相应项目或供应商流程。首先识别关键缺口及后续问题。只有当机会定义足以支持可靠范围、价格及责任图时，才会进入报价。',
          'La demande est dirigée vers le bon parcours projet ou fournisseur. Les lacunes et questions sont d’abord identifiées. Un devis ne suit que lorsque l’occasion est assez définie pour établir une portée, un prix et une carte des responsabilités fiables.'
        )
      }
    ]
  },

  'buyer-resources': {
    eyebrow: t('Buyer Resources', '买家资源', 'Ressources pour acheteurs'),
    title: t(
      'Practical guides for the decisions that come before an order.',
      '帮助您在下单前做好关键决策的实用指南。',
      'Des guides pratiques pour les décisions qui précèdent une commande.'
    ),
    intro: t(
      'A product image and factory price rarely tell the whole story. These guides help buyers prepare a clearer brief, compare proposals, understand cost and timing, and see whether the supporting documents are strong enough for the next step.',
      '产品图片和工厂价格通常无法说明全部情况。这些指南帮助买家准备更清晰的简报、比较方案、理解成本与时间，并判断支持文件是否足以推进下一步。',
      'Une image et un prix usine racontent rarement toute l’histoire. Ces guides aident à préparer un dossier plus clair, comparer les propositions, comprendre le coût et le calendrier, et juger si les documents permettent d’avancer.'
    ),
    blocks: [
      {
        title: t('Begin with the project brief', '从项目简报开始', 'Commencer par le dossier de projet'),
        body: t(
          'A useful brief describes the business need, site, users, capacity, utilities, budget, target date and known constraints. It gives suppliers and local professionals the same starting point.',
          '有用的简报应说明业务需求、场地、使用者、容量、公用设施、预算、目标日期及已知限制，让供应商和本地专业人士从同一起点开始。',
          'Un bon dossier décrit le besoin, le site, les usagers, la capacité, les services, le budget, la date cible et les contraintes connues.'
        )
      },
      {
        title: t('Compare the full delivered scope', '比较完整交付范围', 'Comparer la portée complète'),
        body: t(
          'Separate the product, documents, packaging, freight, customs, receiving, assembly, site work, installation, inspections and service. A low factory price can become expensive when important responsibilities are missing.',
          '应分别查看产品、文件、包装、运输、海关、收货、组装、现场工作、安装、检查及服务。低工厂价格在缺少重要责任范围时可能最终更昂贵。',
          'Distinguez produit, documents, emballage, fret, douane, réception, assemblage, travaux de site, installation, inspections et service.'
        )
      },
      {
        title: t('Treat time as a chain of dependencies', '把时间看作一系列依赖关系', 'Voir le temps comme une chaîne de dépendances'),
        body: t(
          'Design, document review, approvals, production, shipping and site preparation may overlap, but only when decisions are made on time. One unresolved issue can hold up several later stages.',
          '设计、文件审查、审批、生产、运输及现场准备可以并行，但前提是关键决策按时完成。一个未解决问题可能拖延多个后续阶段。',
          'Conception, examen des documents, approbations, production, transport et préparation du site peuvent se chevaucher, mais seulement si les décisions sont prises à temps.'
        )
      },
      {
        title: t('Keep document status visible', '让文件状态清晰可见', 'Rendre visible l’état des documents'),
        body: t(
          'A document register should show what was requested, received, reviewed and still remains open. A certificate title alone is not a complete evidence file.',
          '文件登记表应显示请求了什么、收到了什么、审查了什么及仍有哪些未决事项。仅有证书名称并不构成完整证据档案。',
          'Un registre doit montrer ce qui a été demandé, reçu, examiné et ce qui reste ouvert. Le titre d’un certificat ne constitue pas un dossier complet.'
        )
      }
    ]
  },
  'project-brief-guide': {
    eyebrow: t('Buyer Resource · Project Brief', '买家资源 · 项目简报', 'Ressource acheteur · Dossier de projet'),
    title: t(
      'Give every supplier and project partner the same starting point.',
      '让每个供应商和项目伙伴从同一起点开始。',
      'Donner le même point de départ à chaque fournisseur et partenaire.'
    ),
    intro: t(
      'A project brief does not need to answer every technical question. It should explain the problem clearly enough for the right people to identify gaps and avoid quoting different assumptions as if they were comparable.',
      '项目简报不需要回答所有技术问题，但应清楚说明问题，让合适的人能够识别缺口，并避免各方基于不同假设报价却被误认为可直接比较。',
      'Un dossier n’a pas besoin de répondre à toutes les questions techniques. Il doit expliquer le problème assez clairement pour repérer les lacunes et éviter de comparer des devis fondés sur des hypothèses différentes.'
    ),
    blocks: [
      {
        title: t('State the business need', '说明业务需求', 'Expliquer le besoin d’affaires'),
        body: t(
          'Describe what is not working today, what opportunity you want to capture and what outcome the new space must support. Explain the users, season, service level and operating model—not only the number of units.',
          '说明当前什么没有解决、希望抓住什么机会，以及新空间必须支持什么结果。应说明使用者、季节、服务水平及运营模式，而不只是单元数量。',
          'Décrivez ce qui ne fonctionne pas, l’occasion visée et le résultat attendu. Expliquez les usagers, la saison, le service et le modèle d’exploitation, pas seulement le nombre d’unités.'
        )
      },
      {
        title: t('Describe the site', '说明场地', 'Décrire le site'),
        body: t(
          'Include the location, ownership or control status, known zoning, access, slope, soil information, climate exposure, existing buildings, utilities and seasonal restrictions.',
          '包括地点、所有权或控制状态、已知分区、通行、坡度、土壤资料、气候暴露、现有建筑、公用设施及季节性限制。',
          'Indiquez le lieu, le statut de contrôle, le zonage connu, l’accès, la pente, le sol, l’exposition climatique, les bâtiments, les services et les restrictions saisonnières.'
        )
      },
      {
        title: t('Define users and capacity', '明确使用者与容量', 'Définir les usagers et la capacité'),
        body: t(
          'State who uses the space, how many people are present, length of stay, shifts or peak periods, privacy needs, accessibility and the staff required to operate it.',
          '说明谁会使用空间、人数、停留时间、班次或高峰时段、隐私需求、无障碍及运营所需人员。',
          'Précisez qui utilise l’espace, combien de personnes sont présentes, la durée, les quarts ou pointes, l’intimité, l’accessibilité et le personnel nécessaire.'
        )
      },
      {
        title: t('Separate requirements from preferences', '区分必需项与偏好项', 'Séparer les exigences des préférences'),
        body: t(
          'List the non-negotiable functions, performance expectations and deadline first. Keep styles, finishes and optional features separate so the project can make sensible trade-offs.',
          '先列出不可妥协的功能、性能预期及截止时间。把风格、饰面及可选功能单独列出，便于项目进行合理取舍。',
          'Indiquez d’abord les fonctions, performances et échéances non négociables. Gardez styles, finitions et options séparés pour permettre des compromis raisonnables.'
        )
      },
      {
        title: t('Give a budget range and target date', '提供预算范围与目标日期', 'Donner un budget et une date cible'),
        body: t(
          'Explain whether the budget covers the product only or the full project. State why the date matters, such as a seasonal opening, workforce mobilization, financing or lease expiry.',
          '说明预算仅覆盖产品还是完整项目，并说明日期为何重要，例如季节开业、人员进场、融资或租约到期。',
          'Précisez si le budget couvre seulement le produit ou le projet complet, et pourquoi la date compte : ouverture saisonnière, mobilisation, financement ou fin de bail.'
        )
      }
    ]
  },
  'landed-cost-guide': {
    eyebrow: t('Buyer Resource · Landed Cost', '买家资源 · 落地成本', 'Ressource acheteur · Coût rendu'),
    title: t(
      'The factory price is only one line in the project budget.',
      '工厂价格只是项目预算中的一项。',
      'Le prix usine n’est qu’une ligne du budget du projet.'
    ),
    intro: t(
      'A useful landed-cost view follows the product from specification through export, transport, Canadian receiving and the work required before the asset can operate. It should show assumptions and responsibility, not hide everything inside one number.',
      '有用的落地成本应从产品规格开始，覆盖出口、运输、加拿大收货，以及资产投入运行前所需工作。它应显示假设与责任，而不是把所有内容隐藏在一个数字里。',
      'Une vue utile du coût rendu suit le produit depuis la spécification jusqu’à l’exportation, au transport, à la réception et aux travaux nécessaires avant l’exploitation.'
    ),
    blocks: [
      {
        title: t('Product and configuration', '产品与配置', 'Produit et configuration'),
        body: t(
          'Start with the exact model, quantity, options, materials, equipment, furniture, spare parts and documents included. A base-model price cannot be compared with a fully equipped configuration.',
          '从具体型号、数量、选项、材料、设备、家具、备件及包含文件开始。基础型号价格不能与全配置方案直接比较。',
          'Commencez par le modèle, la quantité, les options, matériaux, équipements, mobilier, pièces et documents inclus. Un prix de base ne se compare pas à une configuration complète.'
        )
      },
      {
        title: t('Engineering and document work', '工程与文件工作', 'Ingénierie et documents'),
        body: t(
          'Allow for drawing revisions, calculations, tests, third-party review, samples, inspections and translations. Some of this may sit outside the factory quote.',
          '应考虑图纸修改、计算、测试、第三方审查、样品、检验及翻译。其中部分可能不在工厂报价内。',
          'Prévoyez révisions de plans, calculs, essais, examen tiers, échantillons, inspections et traductions. Une partie peut se trouver hors du devis usine.'
        )
      },
      {
        title: t('Export, freight and border costs', '出口、运输与边境成本', 'Exportation, fret et coûts frontaliers'),
        body: t(
          'Include packaging, inland transport, terminal handling, freight, insurance, brokerage, duties, taxes and inspections. Rates and classifications must be confirmed for the actual product and shipment.',
          '包括包装、内陆运输、码头操作、运费、保险、报关、关税、税费及检查。费率和归类必须针对实际产品和货物确认。',
          'Incluez emballage, transport intérieur, manutention, fret, assurance, courtage, droits, taxes et inspections. Les taux et classements doivent être confirmés pour le produit réel.'
        )
      },
      {
        title: t('Canadian receiving and site delivery', '加拿大收货与现场交付', 'Réception au Canada et livraison sur site'),
        body: t(
          'Budget for receiving checks, storage, repairs, assembly, local components, transport permits, escorts, crane, unloading and movement to the project site.',
          '预算应包括收货检查、储存、维修、组装、本地部件、运输许可、护送、吊车、卸货及运往项目现场。',
          'Prévoyez contrôles à la réception, stockage, réparations, assemblage, composants locaux, permis de transport, escortes, grue, déchargement et déplacement vers le site.'
        )
      },
      {
        title: t('Site work and operating readiness', '现场工作与运营准备', 'Travaux de site et mise en service'),
        body: t(
          'Foundations, civil work, utilities, trades, permits, inspections, commissioning, training and deficiencies may sit outside the product price. Record exchange rates, contingency and exclusions as well.',
          '基础、土建、公用设施、专业工种、许可、检查、调试、培训及缺陷处理可能不在产品价格内。同时应记录汇率、预备金及排除项。',
          'Fondations, travaux civils, services, métiers, permis, inspections, mise en service, formation et déficiences peuvent se trouver hors du prix produit. Notez aussi le change, la contingence et les exclusions.'
        )
      }
    ]
  },
  'delivery-timeline-guide': {
    eyebrow: t('Buyer Resource · Timeline', '买家资源 · 时间表', 'Ressource acheteur · Échéancier'),
    title: t(
      'A realistic schedule shows dependencies, not only dates.',
      '现实的时间表应显示依赖关系，而不只是日期。',
      'Un échéancier réaliste montre les dépendances, pas seulement les dates.'
    ),
    intro: t(
      'Modular projects can save time when off-site production and site work move together. They can also stall when design decisions, documents, approvals, factory slots or site readiness arrive late.',
      '当场外生产与现场工作同步推进时，模块化项目可以节省时间；但设计决策、文件、审批、工厂排产或现场准备延迟时，也可能停滞。',
      'Le modulaire peut gagner du temps lorsque la production hors site et le chantier avancent ensemble. Il peut aussi bloquer si décisions, documents, approbations, créneaux d’usine ou préparation du site arrivent tard.'
    ),
    blocks: [
      {
        title: t('Discovery and feasibility', '需求确认与可行性', 'Découverte et faisabilité'),
        body: t(
          'Confirm the need, site, capacity, budget, decision makers and major risks. The result should be a brief and responsibility map, not an immediate promise of delivery.',
          '确认需求、场地、容量、预算、决策方及主要风险。成果应是简报与责任图，而不是立即承诺交付。',
          'Confirmez le besoin, le site, la capacité, le budget, les décideurs et les risques. Le résultat doit être un dossier et une carte des responsabilités.'
        )
      },
      {
        title: t('Product definition and design', '产品定义与设计', 'Définition du produit et conception'),
        body: t(
          'Select the system, settle the configuration and coordinate factory information with site, foundation, utility and professional requirements. Late changes move every later date.',
          '选择系统、确定配置，并协调工厂信息与场地、基础、公用设施及专业要求。后期变更会影响所有后续日期。',
          'Choisissez le système, fixez la configuration et coordonnez les données d’usine avec le site, les fondations, les services et les exigences professionnelles.'
        )
      },
      {
        title: t('Documents and approvals', '文件与审批', 'Documents et approbations'),
        body: t(
          'Collect drawings, calculations, evidence and applications. Allow time for reviewer questions, supplier responses, revisions and resubmissions. The first submission is not always the final one.',
          '收集图纸、计算、证据及申请材料。应预留审查问题、供应商回复、修改及重新提交时间。首次提交并不总是最终版本。',
          'Rassemblez plans, calculs, preuves et demandes. Prévoyez questions, réponses, révisions et nouvelles soumissions.'
        )
      },
      {
        title: t('Production, shipping and receiving', '生产、运输与收货', 'Production, expédition et réception'),
        body: t(
          'Confirm the production slot, approved information, materials, inspections, packaging, route, permits, insurance, receiving point, unloading equipment and storage.',
          '确认生产排期、批准信息、材料、检验、包装、路线、许可、保险、收货点、卸货设备及储存。',
          'Confirmez le créneau de production, les informations approuvées, matériaux, inspections, emballage, trajet, permis, assurance, réception, déchargement et stockage.'
        )
      },
      {
        title: t('Site preparation, installation and handover', '现场准备、安装与移交', 'Préparation du site, installation et remise'),
        body: t(
          'Complete access, foundations, drainage, utilities and safety planning before delivery. Then coordinate crane, trades, inspections, commissioning, training, manuals, warranties and deficiency closeout.',
          '交付前完成通行、基础、排水、公用设施及安全规划。随后协调吊车、专业工种、检查、调试、培训、手册、质保及缺陷关闭。',
          'Terminez accès, fondations, drainage, services et sécurité avant la livraison. Coordonnez ensuite grue, métiers, inspections, mise en service, formation, manuels, garanties et correction des déficiences.'
        )
      }
    ]
  },
  'document-checklist': {
    eyebrow: t('Buyer Resource · Documents', '买家资源 · 文件', 'Ressource acheteur · Documents'),
    title: t(
      'Know what evidence exists before relying on a product claim.',
      '在依赖产品声明前，先了解有哪些证据。',
      'Savoir quelles preuves existent avant de se fier à une affirmation.'
    ),
    intro: t(
      'The right document package depends on the product and project. This checklist is not an approval standard. It is a practical way to organize requests, see what has been received and keep missing information visible.',
      '正确的文件包取决于产品和项目。本清单不是审批标准，而是一种实用方式，用于组织请求、查看已收到内容并让缺失信息保持可见。',
      'Le bon dossier dépend du produit et du projet. Cette liste n’est pas une norme d’approbation. Elle sert à organiser les demandes, voir ce qui a été reçu et garder visibles les éléments manquants.'
    ),
    blocks: [
      {
        title: t('Company and factory records', '企业与工厂记录', 'Dossiers de l’entreprise et de l’usine'),
        body: t(
          'Legal registration, ownership, factory address, contracting entity, export entity, contacts, production capability, quality organization and relevant references.',
          '合法注册、所有权、工厂地址、合同主体、出口主体、联系人、生产能力、质量组织及相关案例。',
          'Enregistrement légal, propriété, adresse d’usine, entité contractante, entité exportatrice, contacts, capacité de production, organisation qualité et références.'
        )
      },
      {
        title: t('Product definition and materials', '产品定义与材料', 'Définition du produit et matériaux'),
        body: t(
          'Current model, drawings, dimensions, weights, specifications, bill of materials, options, operating limits, installation instructions, material grades, component models and approved substitutions.',
          '最新型号、图纸、尺寸、重量、规格、物料清单、选项、运行限制、安装说明、材料等级、部件型号及批准替代项。',
          'Modèle actuel, plans, dimensions, poids, spécifications, nomenclature, options, limites, instructions, nuances de matériaux, modèles de composants et substitutions approuvées.'
        )
      },
      {
        title: t('Testing and certification records', '测试与认证记录', 'Dossiers d’essais et de certification'),
        body: t(
          'Underlying reports, scope, tested model, issuing body, dates, surveillance or expiry information, limitations and evidence that the supplied configuration matches what was tested.',
          '基础报告、范围、测试型号、签发机构、日期、监督或有效期信息、限制条件，以及供应配置与测试配置一致的证据。',
          'Rapports, portée, modèle testé, organisme, dates, surveillance ou expiration, limites et preuve que la configuration fournie correspond à celle testée.'
        )
      },
      {
        title: t('Quality and traceability', '质量与追溯', 'Qualité et traçabilité'),
        body: t(
          'Incoming inspection, in-process checks, final tests, non-conformance handling, corrective actions, photographs, serial or batch records and agreed inspection points.',
          '来料检验、过程检查、最终测试、不合格处理、纠正措施、照片、序列号或批次记录及约定检验点。',
          'Inspection à l’entrée, contrôles en cours, essais finaux, non-conformités, actions correctives, photos, dossiers de série ou lot et points d’inspection convenus.'
        )
      },
      {
        title: t('Logistics, installation and service', '物流、安装与服务', 'Logistique, installation et service'),
        body: t(
          'Packing method, lifting points, transport limits, receiving instructions, installation sequence, required tools and trades, commissioning, warranty, spare parts, manuals and service contacts.',
          '包装方式、吊点、运输限制、收货说明、安装顺序、所需工具与工种、调试、质保、备件、手册及服务联系人。',
          'Méthode d’emballage, points de levage, limites de transport, réception, séquence d’installation, outils et métiers, mise en service, garantie, pièces, manuels et contacts.'
        )
      },
      {
        title: t('Use a simple status system', '使用简单状态体系', 'Utiliser un système de statut simple'),
        body: t(
          'Mark each item as requested, received, under review, accepted for the current purpose, revision required, expired or not applicable. Received is not the same as reviewed and suitable.',
          '把每项标记为已请求、已收到、审查中、当前用途已接受、需修改、已过期或不适用。已收到并不等同于已审查且适用。',
          'Marquez chaque élément comme demandé, reçu, en examen, accepté pour l’usage actuel, à réviser, expiré ou non applicable. Reçu ne signifie pas examiné et approprié.'
        )
      }
    ]
  },

  privacy: {
    eyebrow: privacyNotice.eyebrow,
    title: privacyNotice.title,
    intro: privacyNotice.intro,
    blocks: privacyNotice.blocks
  }
} as const

export type SectionSlug = keyof typeof sectionPages
export const sectionSlugs = Object.keys(sectionPages) as SectionSlug[]

export function localized(value: LocalizedText, locale: Locale) {
  return value[locale]
}
