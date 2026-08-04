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
  utility: t('Assembled in Canada. Engineered for North America.', '加拿大组装，为北美市场而设计。', 'Assemblé au Canada. Conçu pour l’Amérique du Nord.'),
  heroEyebrow: t('Canada + Global Modular Infrastructure', '加拿大 + 全球模块化基础设施', 'Infrastructures modulaires — Canada + Monde'),
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
    t('Four-Season Ready', '四季适用', 'Adapté aux quatre saisons'),
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
  footprintEyebrow: t('Our Global Ecosystem', '我们的全球生态系统', 'Notre écosystème mondial'),
  footprintTitle: t('Global capability. Canadian execution.', '全球能力，加拿大落地。', 'Capacité mondiale. Exécution canadienne.'),
  footprintBody: t(
    'NEXUS is positioned as an integrated solution group—not simply a modular home seller. The platform connects manufacturers, project partners, local specialists and customers.',
    'NEXUS 的定位不是普通模块化房屋销售商，而是连接制造商、项目伙伴、本地专业团队与客户的综合解决方案集团。',
    'NEXUS se positionne comme un groupe de solutions intégré, reliant fabricants, partenaires de projet, spécialistes locaux et clients.'
  ),
  projectsEyebrow: t('Featured Concepts', '精选概念项目', 'Concepts en vedette'),
  projectsTitle: t('Built for Canada. Designed for the world.', '立足加拿大，面向全球。', 'Conçu pour le Canada. Pensé pour le monde.'),
  projectsNote: t('Design concepts are identified by status and are not presented as completed work.', '设计概念均按状态标注，不作为已完工项目呈现。', 'Les concepts sont identifiés par leur statut et ne sont pas présentés comme des projets livrés.'),
  supplierEyebrow: t('Supplier Network', '供应商网络', 'Réseau de fournisseurs'),
  supplierTitle: t('Build the next generation of modular spaces with us.', '与我们共同打造新一代模块化空间。', 'Construisons ensemble la prochaine génération d’espaces modulaires.'),
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
  { image: '/images/project-lake-hd-v1.jpg', title: t('Lakefront Modular Retreat', '湖畔模块化度假区', 'Retraite modulaire au bord du lac'), meta: t('Tourism & Hospitality · Concept', '旅游与酒店 · 概念项目', 'Tourisme et hôtellerie · Concept') },
  { image: '/images/project-workforce.jpg', title: t('Northern Workforce Campus', '北方工人营地', 'Campus nordique pour travailleurs'), meta: t('Industrial · Concept', '工业 · 概念项目', 'Industriel · Concept') },
  { image: '/images/project-cabin.jpg', title: t('Four-Season Cabin Collection', '四季小屋系列', 'Collection de chalets quatre saisons'), meta: t('Modular Living · Concept', '模块化生活 · 概念项目', 'Habitat modulaire · Concept') },
  { image: '/images/project-kiosk.jpg', title: t('Urban Coffee Pavilion', '城市咖啡亭', 'Pavillon café urbain'), meta: t('Commercial · Concept', '商业 · 概念项目', 'Commercial · Concept') },
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
