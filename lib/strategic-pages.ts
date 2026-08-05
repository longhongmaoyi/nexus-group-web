import type { Locale } from '@/lib/i18n'

export type Localized<T> = Record<Locale, T>
export type StrategicSection = {
  title: Localized<string>
  body: Localized<string>
  points: Localized<string>[]
}
export type StrategicPage = {
  slug: string
  eyebrow: Localized<string>
  title: Localized<string>
  intro: Localized<string>
  audienceTitle: Localized<string>
  audience: Localized<string>[]
  sections: StrategicSection[]
  note?: Localized<string>
  primaryLabel: Localized<string>
  primaryHref: string
  secondaryLabel: Localized<string>
  secondaryHref: string
}

const t = (en: string, zh: string, fr: string): Localized<string> => ({ en, zh, fr })

export const strategicPages: Record<string, StrategicPage> = {
  'technology-services': {
    slug: 'technology-services',
    eyebrow: t(
      `Satya Sharma · Technology Services`,
      `Satya Sharma · 技术服务`,
      `Satya Sharma · Services technologiques`,
    ),
    title: t(
      `Websites, apps and digital systems built around the way your business actually works.`,
      `围绕真实业务流程打造网站、应用及数字系统。`,
      `Des sites, applications et systèmes numériques conçus autour du fonctionnement réel de votre entreprise.`,
    ),
    intro: t(
      `I'm Satya Sharma. I plan and build business websites, web and mobile app projects, digital marketing systems, and the workflows that connect them. I keep the scope clear, explain technical decisions in plain English, and make sure the client knows what happens next.`,
      `我是 Satya Sharma。我负责规划和建设企业网站、网页及移动应用项目、数字营销体系，以及连接这些工具的工作流程。我会明确范围，用容易理解的方式说明技术决策，并让客户清楚知道下一步是什么。`,
      `Je suis Satya Sharma. Je planifie et réalise des sites d'entreprise, des projets d'applications web et mobiles, des systèmes de marketing numérique et les processus qui les relient. Je garde la portée claire et j'explique simplement la prochaine étape.`,
    ),
    audienceTitle: t(`Good fit for`, `适合以下需求`, `Pour quels besoins`),
    audience: [
      t(`A company website that explains the offer clearly and brings in serious enquiries`, `需要清楚说明业务并获得有效询盘的企业网站`, `Un site d'entreprise qui explique clairement l'offre et attire des demandes sérieuses`),
      t(`A client portal, dashboard, CRM workflow or internal business tool`, `客户门户、数据看板、CRM 流程或内部业务工具`, `Un portail client, un tableau de bord, un flux CRM ou un outil interne`),
      t(`A web or mobile app project that needs a clear scope before development starts`, `在开发前需要明确范围的网页或移动应用项目`, `Un projet d'application web ou mobile qui exige une portée claire avant le développement`),
      t(`A practical digital marketing system with content, SEO, analytics and lead tracking`, `包含内容、SEO、数据分析及线索跟踪的实用数字营销体系`, `Un système de marketing numérique concret avec contenu, SEO, mesure et suivi des prospects`),
    ],
    sections: [
      {
        title: t(`Website development`, `网站开发`, `Développement de sites web`),
        body: t(
          `I build company websites, multilingual sites, product catalogues, landing pages and enquiry systems. The work starts with the buyer's questions, not a decorative template.`,
          `我建设企业网站、多语言网站、产品目录、落地页及询盘系统。工作从买家的真实问题开始，而不是从装饰性模板开始。`,
          `Je réalise des sites d'entreprise, des sites multilingues, des catalogues, des pages de campagne et des systèmes de demande. Le travail commence par les questions du client, pas par un modèle décoratif.`,
        ),
        points: [
          t(`Clear information structure and mobile layout`, `清晰的信息结构及移动端布局`, `Structure claire et mise en page mobile`),
          t(`Forms, product pages, admin tools and integrations`, `表单、产品页面、后台工具及系统连接`, `Formulaires, pages produits, outils d'administration et intégrations`),
          t(`Performance, accessibility and search foundations`, `性能、无障碍及搜索基础`, `Performance, accessibilité et bases de recherche`),
        ],
      },
      {
        title: t(`Web and mobile app projects`, `网页及移动应用项目`, `Projets d'applications web et mobiles`),
        body: t(
          `I turn a business process into screens, roles, workflows and testable requirements. That can include portals, dashboards, booking tools, field workflows, internal systems or customer-facing apps.`,
          `我把业务流程整理成页面、角色、工作流及可测试需求，包括门户、数据看板、预约工具、现场流程、内部系统或面向客户的应用。`,
          `Je transforme un processus métier en écrans, rôles, parcours et exigences vérifiables. Cela peut couvrir des portails, tableaux de bord, outils de réservation, flux terrain, systèmes internes ou applications clients.`,
        ),
        points: [
          t(`Requirements and user-flow planning`, `需求及用户流程规划`, `Planification des exigences et parcours`),
          t(`Prototype, development, testing and handover`, `原型、开发、测试及移交`, `Prototype, développement, essais et remise`),
          t(`API, database and third-party service coordination`, `API、数据库及第三方服务协调`, `Coordination des API, bases de données et services tiers`),
        ],
      },
      {
        title: t(`Digital marketing`, `数字营销`, `Marketing numérique`),
        body: t(
          `I help businesses turn their website and content into a working lead system. That means clear positioning, useful pages, search basics, campaign tracking and follow-up—not empty posting for the sake of activity.`,
          `我帮助企业把网站和内容变成真正运作的获客体系，包括清晰定位、实用页面、搜索基础、活动跟踪及后续跟进，而不是为了活跃而发布空洞内容。`,
          `J'aide les entreprises à transformer leur site et leur contenu en système de demandes. Cela passe par un positionnement clair, des pages utiles, les bases du référencement, le suivi des campagnes et les relances.`,
        ),
        points: [
          t(`SEO structure and useful content planning`, `SEO 结构及实用内容规划`, `Structure SEO et planification de contenu utile`),
          t(`Lead capture, analytics and conversion tracking`, `线索收集、数据分析及转化跟踪`, `Collecte des prospects, mesure et suivi des conversions`),
          t(`LinkedIn, social and campaign support where it serves the business`, `在对业务有实际帮助时提供 LinkedIn、社交媒体及活动支持`, `Soutien LinkedIn, social et campagnes lorsque cela sert réellement l'entreprise`),
        ],
      },
      {
        title: t(`E-commerce, CRM and automation`, `电商、CRM 及自动化`, `Commerce électronique, CRM et automatisation`),
        body: t(
          `I can connect product information, enquiries, customer records and routine follow-up so the team spends less time copying the same data between tools.`,
          `我可以连接产品信息、询盘、客户记录及日常跟进，减少团队在不同工具之间重复复制数据的时间。`,
          `Je peux relier les produits, demandes, dossiers clients et suivis courants afin de réduire la saisie répétée entre les outils.`,
        ),
        points: [
          t(`Product catalogues, RFQ and e-commerce workflows`, `产品目录、询价及电商流程`, `Catalogues, demandes de prix et flux de commerce électronique`),
          t(`CRM setup and lead-routing rules`, `CRM 设置及线索分配规则`, `Mise en place CRM et règles d'affectation`),
          t(`Notifications, document flows and routine automation`, `通知、文件流程及日常自动化`, `Notifications, flux documentaires et automatisations courantes`),
        ],
      },
      {
        title: t(`How I run the work`, `我的工作方式`, `Ma façon de travailler`),
        body: t(
          `You get a written scope, visible milestones and direct updates. When a request changes the budget or timeline, I explain it before the work moves ahead.`,
          `您会获得书面范围、清晰节点及直接更新。当需求会改变预算或时间时，我会在继续推进前说明。`,
          `Vous recevez une portée écrite, des étapes visibles et des nouvelles directes. Lorsqu'une demande change le budget ou le calendrier, je l'explique avant de poursuivre.`,
        ),
        points: [
          t(`One clear list of decisions and open questions`, `一份清晰的决策及待解决问题清单`, `Une liste claire des décisions et questions ouvertes`),
          t(`Testing against the agreed requirements`, `按照约定需求进行测试`, `Des essais selon les exigences convenues`),
          t(`Handover notes, access details and support scope`, `移交说明、访问资料及支持范围`, `Notes de remise, accès et portée du soutien`),
        ],
      },
    ],
    note: t(
      `Technology services are scoped separately from regulated construction, engineering, legal and approval work.`,
      `技术服务与受监管的建筑、工程、法律及审批工作分别确定范围。`,
      `Les services technologiques sont définis séparément des travaux réglementés de construction, d'ingénierie, de droit et d'approbation.`,
    ),
    primaryLabel: t(`Discuss a Technology Project`, `讨论技术项目`, `Discuter d'un projet technologique`),
    primaryHref: `/contact#project-inquiry`,
    secondaryLabel: t(`Book a 15-min Call`, `预约 15 分钟通话`, `Réserver un appel de 15 min`),
    secondaryHref: `/book-a-call`,
  },

  'workforce-camps': {
    slug: 'workforce-camps',
    eyebrow: t(`Workforce Camps`, `工人营地`, `Camps de travailleurs`),
    title: t(
      `Plan the camp as an operating system—not a row of sleeping units.`,
      `把营地当作运营系统规划，而不只是一排住宿单元。`,
      `Planifier le camp comme un système d'exploitation, pas comme une rangée de chambres.`,
    ),
    intro: t(
      `A remote camp has to house people, feed them, support shifts, handle weather, manage utilities and stay maintainable after the installation team leaves. We help turn those operating needs into a clearer scope for sourcing, shipping, site work and assembly.`,
      `偏远营地需要解决住宿、餐饮、轮班、天气、公用设施及长期维护。我们帮助把这些运营需求整理成更清晰的采购、运输、现场工作及组装范围。`,
      `Un camp éloigné doit loger, nourrir et soutenir les équipes, résister au climat, gérer les services et rester maintenable après le départ de l'équipe d'installation. Nous transformons ces besoins en portée plus claire pour l'approvisionnement, le transport, le chantier et l'assemblage.`,
    ),
    audienceTitle: t(`Start with these facts`, `先明确这些信息`, `Commencer par ces faits`),
    audience: [
      t(`Headcount by shift and rotation`, `各班次人数及轮班方式`, `Effectifs par quart et rotation`),
      t(`Project location, road access and climate`, `项目地点、道路通行及气候`, `Lieu, accès routier et climat`),
      t(`Room standard, shared facilities and camp rules`, `房间标准、共享设施及营地规则`, `Norme des chambres, installations communes et règles du camp`),
      t(`Water, wastewater, power and communications plan`, `供水、污水、电力及通信方案`, `Plan d'eau, d'eaux usées, d'énergie et de communications`),
    ],
    sections: [
      {
        title: t(`People and room mix`, `人员及房型组合`, `Personnel et combinaison de chambres`),
        body: t(`Define day and night shifts, rotation, privacy, accessibility, supervision and expected length of stay before choosing a floor plan.`, `在选择户型前，先明确白班及夜班、轮班、隐私、无障碍、监督及预计住宿时间。`, `Définissez les quarts, rotations, besoins d'intimité, accessibilité, supervision et durée de séjour avant de choisir un plan.`),
        points: [
          t(`Private or shared rooms`, `单人房或共享房`, `Chambres privées ou partagées`),
          t(`Washroom ratio and change facilities`, `卫生间比例及更衣设施`, `Ratio de sanitaires et vestiaires`),
          t(`Quiet zones for different shifts`, `不同班次的安静区域`, `Zones calmes pour les différents quarts`),
        ],
      },
      {
        title: t(`Food, laundry and daily support`, `餐饮、洗衣及日常配套`, `Restauration, buanderie et soutien quotidien`),
        body: t(`Dining, kitchen, laundry, recreation, medical, security and administration spaces must match the camp population and service model.`, `餐厅、厨房、洗衣、娱乐、医疗、安保及行政空间必须与营地人数及服务模式匹配。`, `Restauration, cuisine, buanderie, loisirs, médical, sécurité et administration doivent correspondre à la population et au modèle de service.`),
        points: [
          t(`Meal volume and delivery schedule`, `用餐量及补给计划`, `Volume des repas et calendrier d'approvisionnement`),
          t(`Laundry cycles and storage`, `洗衣周期及储物`, `Cycles de buanderie et rangement`),
          t(`Medical, recreation and staff areas`, `医疗、娱乐及员工区域`, `Espaces médicaux, de loisirs et du personnel`),
        ],
      },
      {
        title: t(`Utilities and cold-weather operation`, `公用设施及寒冷天气运行`, `Services et fonctionnement par temps froid`),
        body: t(`The building package has to connect to a real power, heating, ventilation, water, wastewater and communications plan.`, `建筑方案必须连接到真实可执行的电力、供暖、通风、供水、污水及通信计划。`, `Le bâtiment doit se raccorder à un plan réel d'énergie, chauffage, ventilation, eau, eaux usées et communications.`),
        points: [
          t(`Peak electrical and heating loads`, `峰值电力及供暖负荷`, `Pointes électriques et de chauffage`),
          t(`Freeze protection and moisture control`, `防冻及防潮`, `Protection contre le gel et gestion de l'humidité`),
          t(`Backup systems and fuel access`, `备用系统及燃料供应`, `Systèmes de secours et accès au carburant`),
        ],
      },
      {
        title: t(`Transport, installation and maintenance`, `运输、安装及维护`, `Transport, installation et entretien`),
        body: t(`Module dimensions, weights, route permits, staging, crane access, spare parts and the order of installation affect both cost and schedule.`, `模块尺寸、重量、路线许可、临时堆放、吊车通行、备件及安装顺序都会影响成本和时间。`, `Dimensions, poids, permis de route, mise en attente, accès des grues, pièces et ordre d'installation influencent le coût et le calendrier.`),
        points: [
          t(`Route, bridge and clearance checks`, `路线、桥梁及净空检查`, `Vérification de l'itinéraire, des ponts et dégagements`),
          t(`Staging, lifting and phased opening`, `临时堆放、吊装及分阶段启用`, `Mise en attente, levage et ouverture par phases`),
          t(`Manuals, warranties and critical spare parts`, `手册、质保及关键备件`, `Manuels, garanties et pièces critiques`),
        ],
      },
    ],
    note: t(`Permits, professional design and approvals remain project- and jurisdiction-specific.`, `许可、专业设计及批准取决于具体项目及司法辖区。`, `Les permis, la conception professionnelle et les approbations dépendent du projet et de l'autorité compétente.`),
    primaryLabel: t(`Send Your Camp Requirements`, `发送营地需求`, `Envoyer les besoins du camp`),
    primaryHref: `/contact#project-inquiry`,
    secondaryLabel: t(`Book a 15-min Call`, `预约 15 分钟通话`, `Réserver un appel de 15 min`),
    secondaryHref: `/book-a-call`,
  },

  'commercial-kiosks': {
    slug: 'commercial-kiosks',
    eyebrow: t(`Commercial Kiosks`, `商业售卖亭`, `Kiosques commerciaux`),
    title: t(
      `A small footprint leaves no room for a bad operating plan.`,
      `面积越小，越不能容忍糟糕的运营规划。`,
      `Une petite surface ne laisse aucune place à un mauvais plan d'exploitation.`,
    ),
    intro: t(
      `Coffee, food, retail and service kiosks have to fit equipment, staff, customers, storage, cleaning, utilities and approvals into a tight space. We start with the business operation before the shell is ordered.`,
      `咖啡、餐饮、零售及服务售卖亭需要在有限空间内安排设备、员工、顾客、仓储、清洁、公用设施及审批。我们在订购外壳前先从业务运营开始。`,
      `Les kiosques de café, restauration, commerce et service doivent intégrer équipements, personnel, clients, stockage, nettoyage, services et approbations dans peu d'espace. Nous commençons par l'exploitation avant de commander l'enveloppe.`,
    ),
    audienceTitle: t(`Information needed first`, `首先需要的信息`, `Information nécessaire au départ`),
    audience: [
      t(`What is sold or delivered`, `销售或提供什么`, `Ce qui est vendu ou fourni`),
      t(`Expected customer volume and peak periods`, `预计客流及高峰时段`, `Volume de clients et périodes de pointe`),
      t(`Major equipment and utility loads`, `主要设备及公用设施负荷`, `Équipements principaux et charges de services`),
      t(`Site, access, approvals and target opening date`, `场地、通行、审批及目标开业日期`, `Site, accès, approbations et date d'ouverture`),
    ],
    sections: [
      {
        title: t(`Customer and staff flow`, `顾客及员工动线`, `Flux des clients et du personnel`),
        body: t(`Map ordering, payment, preparation, pickup, seating, deliveries, waste and emergency exits before counters and walls are fixed.`, `在柜台和墙体定稿前，规划点单、付款、制作、取货、座位、补货、垃圾及紧急出口。`, `Cartographiez commande, paiement, préparation, retrait, places, livraisons, déchets et sorties avant de fixer comptoirs et murs.`),
        points: [
          t(`Queue and pickup points`, `排队及取货点`, `Files et points de retrait`),
          t(`Staff movement and safe clearances`, `员工动线及安全净空`, `Déplacements du personnel et dégagements`),
          t(`Delivery and waste routes`, `补货及垃圾路线`, `Parcours des livraisons et déchets`),
        ],
      },
      {
        title: t(`Equipment before layout`, `先确认设备，再定布局`, `Équipements avant le plan`),
        body: t(`A late equipment change can alter power, plumbing, ventilation, counters, approvals, cost and delivery time.`, `后期更换设备可能改变电力、给排水、通风、柜台、审批、成本及交期。`, `Un changement tardif d'équipement peut modifier électricité, plomberie, ventilation, comptoirs, approbations, coût et délai.`),
        points: [
          t(`Electrical and heat-producing equipment`, `电气及发热设备`, `Équipements électriques et producteurs de chaleur`),
          t(`Water, drainage and grease requirements`, `供水、排水及油脂处理要求`, `Eau, drainage et gestion des graisses`),
          t(`Ventilation, exhaust and service clearances`, `通风、排风及维修净空`, `Ventilation, extraction et dégagements d'entretien`),
        ],
      },
      {
        title: t(`Site and approvals`, `场地及审批`, `Site et approbations`),
        body: t(`Parking, accessibility, weather protection, signage, foundations, utility points and health or fire approvals all affect how the kiosk operates.`, `停车、无障碍、防风雨、标识、基础、公用设施连接点以及卫生或消防审批都会影响售卖亭运营。`, `Stationnement, accessibilité, protection, signalisation, fondations, raccordements et approbations sanitaires ou incendie influencent l'exploitation.`),
        points: [
          t(`Accessible route and service counter`, `无障碍通道及服务柜台`, `Parcours accessible et comptoir de service`),
          t(`Foundation and utility connection points`, `基础及公用设施连接点`, `Fondation et points de raccordement`),
          t(`Authority review before final design`, `最终设计前的主管部门审查`, `Examen de l'autorité avant le plan final`),
        ],
      },
      {
        title: t(`Separate the real project cost`, `拆分真实项目成本`, `Distinguer le coût réel du projet`),
        body: t(`The proposal should separate the shell, equipment, branding, freight, customs, foundation, services, crane, installation, inspections and licences.`, `方案应分别列明外壳、设备、品牌、运输、海关、基础、公用设施、吊车、安装、检查及许可。`, `La proposition doit distinguer enveloppe, équipements, marque, fret, douane, fondation, services, grue, installation, inspections et licences.`),
        points: [
          t(`Included and excluded equipment`, `包含及不包含的设备`, `Équipements inclus et exclus`),
          t(`Factory work and Canadian site work`, `工厂工作及加拿大现场工作`, `Travaux d'usine et travaux au Canada`),
          t(`Assumptions that can change price or schedule`, `可能改变价格或时间的假设`, `Hypothèses pouvant modifier le prix ou le calendrier`),
        ],
      },
    ],
    note: t(`Operating licences and permit requirements must be confirmed for the exact location and use.`, `运营许可及审批要求必须根据具体地点及用途确认。`, `Les licences et permis doivent être confirmés pour le lieu et l'usage exacts.`),
    primaryLabel: t(`Send Your Equipment List`, `发送设备清单`, `Envoyer la liste d'équipements`),
    primaryHref: `/contact#project-inquiry`,
    secondaryLabel: t(`Book a 15-min Call`, `预约 15 分钟通话`, `Réserver un appel de 15 min`),
    secondaryHref: `/book-a-call`,
  },

  'multi-unit-builds': {
    slug: 'multi-unit-builds',
    eyebrow: t(`Multi-Unit Modular Builds`, `多单元模块化建筑`, `Bâtiments modulaires multiunités`),
    title: t(
      `Repeatable units only work when the connections, services and site sequence are planned together.`,
      `只有把连接、公用设施及现场顺序一起规划，可重复单元才能真正发挥作用。`,
      `Les unités répétitives ne fonctionnent que si les raccordements, services et séquences de chantier sont planifiés ensemble.`,
    ),
    intro: t(
      `Multi-unit housing, accommodation and mixed-use buildings need more than a repeatable room. Structure, fire separation, acoustics, corridors, services, foundations, delivery and inspections have to work as one project.`,
      `多单元住房、住宿及混合用途建筑不只需要可重复房间。结构、防火分隔、声学、走廊、公用设施、基础、交付及检查必须作为一个项目协同工作。`,
      `Les logements, hébergements et bâtiments mixtes multiunités exigent plus qu'une chambre répétable. Structure, séparation incendie, acoustique, corridors, services, fondations, livraison et inspections doivent fonctionner ensemble.`,
    ),
    audienceTitle: t(`Decisions that shape the project`, `决定项目的关键事项`, `Décisions qui façonnent le projet`),
    audience: [
      t(`Unit mix, occupancy and accessibility`, `单元组合、使用人数及无障碍`, `Combinaison d'unités, occupation et accessibilité`),
      t(`Number of storeys and structural system`, `层数及结构体系`, `Nombre d'étages et système structural`),
      t(`Site, foundation and utility capacity`, `场地、基础及公用设施容量`, `Site, fondations et capacité des services`),
      t(`Delivery sequence, crane plan and target occupancy`, `交付顺序、吊车计划及目标入住日期`, `Séquence de livraison, plan de grue et occupation cible`),
    ],
    sections: [
      {
        title: t(`Unit mix and circulation`, `单元组合及交通流线`, `Combinaison d'unités et circulation`),
        body: t(`Bedrooms, accessible units, shared spaces, corridors, stairs, elevators, exits and service rooms have to be defined as one operating plan.`, `卧室、无障碍单元、共享空间、走廊、楼梯、电梯、出口及设备房必须作为一个运营计划来定义。`, `Chambres, unités accessibles, espaces communs, corridors, escaliers, ascenseurs, sorties et locaux techniques doivent être définis comme un seul plan.`),
        points: [
          t(`Unit types and occupancy`, `单元类型及使用人数`, `Types d'unités et occupation`),
          t(`Accessible routes and common areas`, `无障碍路径及公共区域`, `Parcours accessibles et espaces communs`),
          t(`Emergency exits and firefighter access`, `紧急出口及消防通道`, `Sorties d'urgence et accès des pompiers`),
        ],
      },
      {
        title: t(`Structure, fire and acoustics`, `结构、消防及声学`, `Structure, incendie et acoustique`),
        body: t(`Stacking, module connections, fire separations, penetrations and sound control need project-specific design and inspection.`, `叠放、模块连接、防火分隔、穿透部位及隔音需要项目专项设计及检查。`, `Superposition, connexions, séparations incendie, traversées et contrôle acoustique exigent une conception et des inspections propres au projet.`),
        points: [
          t(`Structural loads and connection details`, `结构荷载及连接细节`, `Charges structurales et détails de connexion`),
          t(`Fire-resistance and service penetrations`, `耐火及设备穿透`, `Résistance au feu et traversées de services`),
          t(`Wall, floor and mechanical noise control`, `墙体、楼板及机械噪声控制`, `Contrôle du bruit des murs, planchers et systèmes`),
        ],
      },
      {
        title: t(`Services across many units`, `多单元公用设施`, `Services pour plusieurs unités`),
        body: t(`Electrical, plumbing, ventilation, heating, fire protection and data systems must line up between modules and the site infrastructure.`, `电气、给排水、通风、供暖、消防及数据系统必须在模块之间并与场地基础设施准确衔接。`, `Électricité, plomberie, ventilation, chauffage, protection incendie et données doivent s'aligner entre les modules et l'infrastructure du site.`),
        points: [
          t(`Vertical and horizontal service routes`, `垂直及水平设备路线`, `Parcours verticaux et horizontaux`),
          t(`Metering, controls and maintenance access`, `计量、控制及维护通道`, `Comptage, commandes et accès d'entretien`),
          t(`Testing before walls and shafts are closed`, `墙体及竖井封闭前测试`, `Essais avant fermeture des murs et gaines`),
        ],
      },
      {
        title: t(`Delivery, inspection and handover`, `交付、检查及移交`, `Livraison, inspection et remise`),
        body: t(`The delivery order must match crane picks, temporary bracing, weather protection, connections and inspection hold points. The final package needs approved changes, inspection records, manuals and warranties.`, `交付顺序必须与吊装、临时支撑、防风雨、连接及检查停检点匹配。最终资料需要包含获批变更、检查记录、手册及质保。`, `L'ordre de livraison doit suivre les levages, contreventements temporaires, protections, connexions et points d'inspection. Le dossier final doit inclure changements approuvés, inspections, manuels et garanties.`),
        points: [
          t(`Module numbering and crane sequence`, `模块编号及吊装顺序`, `Numérotation et séquence de grue`),
          t(`Weather closure and inspection stages`, `防风雨封闭及检查阶段`, `Mise hors intempéries et étapes d'inspection`),
          t(`As-built records and deficiency close-out`, `竣工记录及缺陷关闭`, `Dossiers tel que construit et fermeture des déficiences`),
        ],
      },
    ],
    note: t(`Architectural, engineering, permit and inspection requirements remain the responsibility of the appointed professionals and authorities.`, `建筑、工程、许可及检查要求仍由受委任专业人士及主管部门负责。`, `Les exigences d'architecture, d'ingénierie, de permis et d'inspection restent sous la responsabilité des professionnels et autorités désignés.`),
    primaryLabel: t(`Request a Feasibility Review`, `申请可行性评估`, `Demander un examen de faisabilité`),
    primaryHref: `/contact#project-inquiry`,
    secondaryLabel: t(`Book a 15-min Call`, `预约 15 分钟通话`, `Réserver un appel de 15 min`),
    secondaryHref: `/book-a-call`,
  },

  'oil-gas-energy': {
    slug: 'oil-gas-energy',
    eyebrow: t(`Oil, Gas & Energy Operations`, `油气及能源运营`, `Opérations pétrolières, gazières et énergétiques`),
    title: t(
      `Remote facilities have to fit the operation, the hazards and the deployment plan.`,
      `偏远设施必须适合运营、风险及部署计划。`,
      `Les installations éloignées doivent correspondre à l'exploitation, aux risques et au plan de déploiement.`,
    ),
    intro: t(
      `Energy projects may need accommodation, offices, control rooms, change facilities, storage and service buildings before permanent infrastructure is ready. The brief must connect people, site hazards, utilities, transport and maintenance.`,
      `能源项目可能在永久基础设施建成前就需要住宿、办公室、控制室、更衣设施、仓储及服务建筑。项目简报必须连接人员、现场风险、公用设施、运输及维护。`,
      `Les projets énergétiques peuvent nécessiter hébergement, bureaux, salles de contrôle, vestiaires, stockage et bâtiments de service avant l'infrastructure permanente. Le dossier doit relier personnes, risques, services, transport et entretien.`,
    ),
    audienceTitle: t(`Questions to answer early`, `需要尽早回答的问题`, `Questions à régler tôt`),
    audience: [
      t(`Facility use, occupancy and operating hours`, `设施用途、使用人数及运营时间`, `Usage, occupation et heures d'exploitation`),
      t(`Hazardous areas and client safety standards`, `危险区域及客户安全标准`, `Zones dangereuses et normes de sécurité du client`),
      t(`Power, heating, ventilation and backup systems`, `电力、供暖、通风及备用系统`, `Énergie, chauffage, ventilation et secours`),
      t(`Road, seasonal access and maintenance plan`, `道路、季节性通行及维护计划`, `Route, accès saisonnier et plan d'entretien`),
    ],
    sections: [
      {
        title: t(`Operating use comes first`, `运营用途优先`, `L'usage opérationnel d'abord`),
        body: t(`A site office, sleeping unit, change room and control space have different occupancy, ventilation, security and service needs.`, `现场办公室、住宿单元、更衣室及控制空间具有不同的使用人数、通风、安保及服务需求。`, `Un bureau, un logement, un vestiaire et une salle de contrôle ont des besoins différents d'occupation, ventilation, sécurité et services.`),
        points: [
          t(`Shift pattern and staffing`, `班次及人员配置`, `Quarts et effectifs`),
          t(`Controlled and public access`, `受控及公众通行`, `Accès contrôlé et public`),
          t(`Emergency and shutdown procedures`, `应急及停机程序`, `Procédures d'urgence et d'arrêt`),
        ],
      },
      {
        title: t(`Hazards and client standards`, `风险及客户标准`, `Risques et normes du client`),
        body: t(`The project team must identify hazardous locations, fire risks, environmental controls and owner standards before equipment and layouts are fixed.`, `项目团队必须在设备和布局定稿前确定危险区域、火灾风险、环境控制及业主标准。`, `L'équipe doit identifier zones dangereuses, risques d'incendie, contrôles environnementaux et normes du propriétaire avant de figer équipements et plans.`),
        points: [
          t(`Hazardous-location classification where applicable`, `适用时的危险区域分类`, `Classification des zones dangereuses, s'il y a lieu`),
          t(`Fire, gas detection and emergency systems`, `消防、气体探测及应急系统`, `Systèmes incendie, détection de gaz et urgence`),
          t(`Client specifications and inspection points`, `客户规格及检查点`, `Spécifications du client et points d'inspection`),
        ],
      },
      {
        title: t(`Transport to the operating site`, `运输到运营现场`, `Transport vers le site`),
        body: t(`Remote routes, seasonal restrictions, escorts, staging and lifting can control the module size and installation sequence.`, `偏远路线、季节性限制、护送、临时堆放及吊装可能决定模块尺寸及安装顺序。`, `Routes éloignées, restrictions saisonnières, escortes, mise en attente et levage peuvent déterminer la taille et la séquence.`),
        points: [
          t(`Final dimensions and weights`, `最终尺寸及重量`, `Dimensions et poids finaux`),
          t(`Route, bridge and clearance checks`, `路线、桥梁及净空检查`, `Vérification de route, ponts et dégagements`),
          t(`Site receiving and lifting plan`, `现场收货及吊装计划`, `Plan de réception et de levage`),
        ],
      },
      {
        title: t(`Serviceability and spare parts`, `可维护性及备件`, `Maintenabilité et pièces`),
        body: t(`A remote building must be maintainable by the people and parts that can realistically reach the site.`, `偏远建筑必须能够由实际可以到达现场的人员及备件进行维护。`, `Un bâtiment éloigné doit pouvoir être entretenu par les personnes et les pièces qui peuvent réellement atteindre le site.`),
        points: [
          t(`Standardized replaceable components`, `标准化可更换部件`, `Composants remplaçables standardisés`),
          t(`Remote diagnostics and service contacts`, `远程诊断及服务联系人`, `Diagnostic à distance et contacts de service`),
          t(`Critical spare-parts list`, `关键备件清单`, `Liste des pièces critiques`),
        ],
      },
    ],
    note: t(`Site-specific safety, engineering and regulatory decisions remain with the owner, appointed professionals and authorities.`, `现场专项安全、工程及监管决定仍由业主、受委任专业人士及主管部门负责。`, `Les décisions de sécurité, d'ingénierie et de réglementation propres au site restent à la charge du propriétaire, des professionnels et des autorités.`),
    primaryLabel: t(`Discuss the Site Requirements`, `讨论现场需求`, `Discuter des besoins du site`),
    primaryHref: `/contact#project-inquiry`,
    secondaryLabel: t(`Book a 15-min Call`, `预约 15 分钟通话`, `Réserver un appel de 15 min`),
    secondaryHref: `/book-a-call`,
  },

  'indigenous-community-projects': {
    slug: 'indigenous-community-projects',
    eyebrow: t(`Indigenous Community Projects`, `原住民社区项目`, `Projets avec les communautés autochtones`),
    title: t(
      `The project should follow the community's priorities, decision process and long-term operating needs.`,
      `项目应遵循社区的优先事项、决策流程及长期运营需求。`,
      `Le projet doit suivre les priorités, le processus décisionnel et les besoins d'exploitation à long terme de la communauté.`,
    ),
    intro: t(
      `NEXUS does not arrive with a fixed catalogue and call it a community solution. We start by listening to the intended use, local decision process, site conditions, maintenance capacity, training goals and the people who will operate the building.`,
      `NEXUS 不会带着固定目录就把它称为社区方案。我们从倾听用途、本地决策流程、场地条件、维护能力、培训目标及未来运营人员开始。`,
      `NEXUS n'arrive pas avec un catalogue fixe présenté comme solution communautaire. Nous commençons par écouter l'usage prévu, le processus local, le site, la capacité d'entretien, les objectifs de formation et les personnes qui exploiteront le bâtiment.`,
    ),
    audienceTitle: t(`The first conversation should cover`, `第一次沟通应涵盖`, `La première discussion doit couvrir`),
    audience: [
      t(`Community purpose and who the building serves`, `社区目标及建筑服务对象`, `Objectif communautaire et personnes servies`),
      t(`Governance, approvals and procurement requirements`, `治理、审批及采购要求`, `Gouvernance, approbations et approvisionnement`),
      t(`Local employment, training and installation participation`, `本地就业、培训及安装参与`, `Emploi local, formation et participation à l'installation`),
      t(`Long-term maintenance, parts and service access`, `长期维护、备件及服务可达性`, `Entretien à long terme, pièces et accès au service`),
    ],
    sections: [
      {
        title: t(`Community-defined need`, `由社区定义需求`, `Besoin défini par la communauté`),
        body: t(`Housing, classrooms, offices, health support, gathering space and essential services each require a different brief.`, `住房、教室、办公室、健康支持、聚会空间及基本服务各自需要不同的项目简报。`, `Logement, classes, bureaux, soutien à la santé, espaces de rassemblement et services essentiels exigent chacun un dossier différent.`),
        points: [
          t(`Who uses the space and how`, `谁使用空间以及如何使用`, `Qui utilise l'espace et comment`),
          t(`Cultural, privacy and accessibility needs`, `文化、隐私及无障碍需求`, `Besoins culturels, d'intimité et d'accessibilité`),
          t(`Future program and capacity changes`, `未来功能及容量变化`, `Évolution future du programme et de la capacité`),
        ],
      },
      {
        title: t(`Governance and approvals`, `治理及审批`, `Gouvernance et approbations`),
        body: t(`The responsible authority, land status, funding conditions, procurement rules and professional roles should be identified before a supplier proposal is treated as final.`, `在把供应商方案视为最终方案前，应明确主管部门、土地状态、资金条件、采购规则及专业角色。`, `L'autorité, le statut du terrain, les conditions de financement, les règles d'approvisionnement et les rôles professionnels doivent être identifiés avant de considérer une proposition comme finale.`),
        points: [
          t(`Community decision and approval path`, `社区决策及批准路径`, `Parcours de décision et d'approbation`),
          t(`Funding and reporting conditions`, `资金及报告条件`, `Conditions de financement et de rapport`),
          t(`Local, provincial, federal or other authority roles`, `本地、省级、联邦或其他主管角色`, `Rôles locaux, provinciaux, fédéraux ou autres`),
        ],
      },
      {
        title: t(`Local participation and training`, `本地参与及培训`, `Participation locale et formation`),
        body: t(`Installation, finishing, maintenance and operations should identify where local workers and businesses can participate meaningfully.`, `安装、收尾、维护及运营应明确本地人员和企业能够真正参与的环节。`, `Installation, finition, entretien et exploitation doivent préciser où les travailleurs et entreprises locales peuvent participer de façon réelle.`),
        points: [
          t(`Work packages suited to local capacity`, `适合本地能力的工作包`, `Lots adaptés à la capacité locale`),
          t(`Training, manuals and safe-work information`, `培训、手册及安全工作信息`, `Formation, manuels et information de travail sécuritaire`),
          t(`Clear responsibility after the outside team leaves`, `外部团队离开后的清晰责任`, `Responsabilités claires après le départ de l'équipe externe`),
        ],
      },
      {
        title: t(`Site access, services and respectful records`, `场地通行、公用设施及尊重社区的记录`, `Accès, services et dossiers respectueux`),
        body: t(`Remote access, seasonal roads, water, wastewater, power, communications, fire response and material storage can decide what is practical. Project information and photographs should only be published with clear permission.`, `偏远通行、季节性道路、供水、污水、电力、通信、消防响应及材料存储可能决定什么方案切实可行。项目信息及照片只有在获得明确许可后才应公开。`, `Accès éloigné, routes saisonnières, eau, eaux usées, énergie, communications, intervention incendie et stockage peuvent déterminer ce qui est réaliste. Les renseignements et photos ne doivent être publiés qu'avec une autorisation claire.`),
        points: [
          t(`Transport route and delivery season`, `运输路线及交付季节`, `Itinéraire et saison de livraison`),
          t(`Utility capacity and maintenance access`, `公用设施容量及维护通道`, `Capacité des services et accès d'entretien`),
          t(`No public claim without community approval`, `未经社区批准不作公开声明`, `Aucune affirmation publique sans approbation communautaire`),
        ],
      },
    ],
    note: t(
      `This page does not claim a partnership with any Indigenous community. Each engagement must be based on direct permission, local priorities and the applicable governance process.`,
      `本页面不代表 NEXUS 已与任何原住民社区建立合作。每项合作必须基于直接许可、本地优先事项及适用治理流程。`,
      `Cette page ne prétend à aucun partenariat avec une communauté autochtone. Chaque mandat doit reposer sur une autorisation directe, les priorités locales et le processus de gouvernance applicable.`,
    ),
    primaryLabel: t(`Start a Community Conversation`, `开始社区项目沟通`, `Commencer une discussion communautaire`),
    primaryHref: `/contact#project-inquiry`,
    secondaryLabel: t(`Book a 15-min Call`, `预约 15 分钟通话`, `Réserver un appel de 15 min`),
    secondaryHref: `/book-a-call`,
  },
}
