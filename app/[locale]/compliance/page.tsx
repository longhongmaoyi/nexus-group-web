import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  ChevronDown,
  Download,
  ExternalLink,
  FileCheck2,
  Info,
  Phone,
  Truck,
  type LucideIcon,
} from 'lucide-react'

import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getPrisma } from '@/lib/prisma'
import { isLocale, type Locale } from '@/lib/i18n'
import {
  PHASE5_ORGANIZATION_KEY,
  isPhase5PublicComplianceEnabled,
  validatePublicCompliance,
} from '@/lib/phase5-core.mjs'

export const dynamic = 'force-dynamic'

type Localized<T> = Record<Locale, T>

type ComplianceCard = {
  title: string
  body: string
  icon: LucideIcon
}

type Province = {
  name: string
  body: string
  href: string
  source: string
}

type ChecklistGroup = {
  title: string
  items: string[]
}

type ChecklistSection = {
  title: string
  groups: ChecklistGroup[]
}

const pageCopy: Localized<{
  title: string
  intro: string
  disclaimer: string
}> = {
  en: {
    title: 'Canada Compliance Centre',
    intro:
      'Practical planning information for modular developments in Canada. It is general guidance, not legal advice, engineering advice, or a promise that a project will be approved.',
    disclaimer:
      'Important: Building permits, certifications and regulatory approvals are project- and jurisdiction-specific. This information is general guidance only and does not guarantee approval, replace professional advice, or confirm compliance for any project. Always consult the applicable authority and qualified Canadian professionals.',
  },
  zh: {
    title: '加拿大合规中心',
    intro:
      '面向加拿大模块化建筑项目的实用规划信息。本页面仅提供一般参考，不是法律或工程意见，也不代表项目一定会获批。',
    disclaimer:
      '重要提示：建筑许可、认证及监管批准均取决于具体项目和司法管辖区。本页面仅提供一般参考，不保证项目获得批准，不能替代专业意见，也不代表任何项目已符合要求。请务必咨询相关主管部门及具备资质的加拿大专业人士。',
  },
  fr: {
    title: 'Centre canadien de conformité',
    intro:
      'Des renseignements pratiques pour planifier un projet modulaire au Canada. Il s’agit d’indications générales, et non d’un avis juridique ou technique ni d’une promesse d’approbation.',
    disclaimer:
      'Important : les permis, certifications et approbations réglementaires dépendent du projet et de l’autorité compétente. Cette information est générale; elle ne garantit aucune approbation, ne remplace pas un avis professionnel et ne confirme pas la conformité d’un projet. Consultez toujours l’autorité concernée et des professionnels canadiens qualifiés.',
  },
}

const ui: Localized<Record<string, string>> = {
  en: {
    pageGives: 'What this page gives you',
    roadmapTitle: 'A practical roadmap, not a public permit file.',
    roadmapP1:
      'We do not publish client permits, engineering reports, inspection records, or other project-specific documents here.',
    roadmapP2:
      'What we do provide is a clear starting point. It covers the main questions that should be answered before a modular building is ordered, shipped, or placed on a Canadian site.',
    roadmapP3:
      'The final decision always belongs to the applicable authority and the qualified professionals working on your project.',
    bigThree: 'The big three',
    bigThreeTitle:
      'The first compliance questions usually fall into three areas.',
    provincial: 'Provincial variations',
    provincialTitle:
      'Canada does not apply one building code in exactly the same way everywhere.',
    provincialBody:
      'Each province has its own amendments, effective dates, and approval process. Municipalities and other authorities may also control zoning, permits, plan review, inspections, and occupancy. We do not guarantee provincial compliance. We help clients identify the right authority and the documents that authority is likely to request.',
    sourcePrefix: 'Official source',
    resource: 'Free planning resource',
    checklistTitle: 'Pre-Construction Compliance Checklist',
    checklistBody:
      'A factory price does not tell you whether a building can be permitted, transported, installed, or occupied at your site. Use this checklist to organize the questions before the order moves too far.',
    download: 'Download the Checklist',
    call: 'Book a 15-min Call',
    unsure: 'Not sure where to begin?',
    unsureTitle:
      'Send us the location, intended use, capacity, budget range, and target date.',
    unsureBody:
      'We will help you identify the first authority to contact, the documents to request from the factory, and the questions that need answers before the project moves forward.',
    start: 'Start a Project',
    reviewed: 'Reviewed public records',
    reviewedTitle: 'Project-specific records approved for public display',
    official: 'Official starting points',
    growingTitle: 'This resource library is growing.',
    growingBody:
      'We are adding more provincial summaries, document guides, transport-planning notes, and permit-preparation resources. Requirements change, so confirm the latest information with the applicable authority and qualified Canadian professionals before relying on any guide.',
  },
  zh: {
    pageGives: '本页面能为您提供什么',
    roadmapTitle: '这里提供实用路线图，而不是公开客户许可文件。',
    roadmapP1:
      '我们不会在这里公开客户的许可文件、工程报告、检查记录或其他项目专属资料。',
    roadmapP2:
      '我们提供的是清晰的起点，帮助您在订购、运输或将模块化建筑放置到加拿大现场之前，先确认需要回答的主要问题。',
    roadmapP3:
      '最终决定始终由相关主管部门及为项目服务的加拿大专业人士作出。',
    bigThree: '三大重点',
    bigThreeTitle: '合规工作的第一批问题通常集中在三个方面。',
    provincial: '各省要求差异',
    provincialTitle: '加拿大各地并不会完全相同地执行同一套建筑规范。',
    provincialBody:
      '每个省都有自己的修订内容、生效日期和审批流程。市政及其他主管机构还可能负责分区、许可、图纸审查、检查和使用批准。我们不保证项目符合某省要求，但会帮助客户确定正确的主管部门，以及该部门可能要求的文件。',
    sourcePrefix: '官方来源',
    resource: '免费规划资料',
    checklistTitle: '施工前合规清单',
    checklistBody:
      '工厂报价并不能说明建筑是否能在您的场地获得许可、完成运输、安装或投入使用。请在订单推进过远之前，用这份清单整理关键问题。',
    download: '下载清单',
    call: '预约 15 分钟通话',
    unsure: '不知道从哪里开始？',
    unsureTitle: '请告诉我们地点、用途、容量、预算范围和目标日期。',
    unsureBody:
      '我们会帮助您确定第一个需要联系的主管部门、应向工厂索取的文件，以及项目继续推进前必须回答的问题。',
    start: '启动项目',
    reviewed: '已审核公开记录',
    reviewedTitle: '已获批准公开展示的项目专属记录',
    official: '官方起点资料',
    growingTitle: '本资料库会持续更新。',
    growingBody:
      '我们正在增加更多省级摘要、文件指南、运输规划说明及许可准备资料。法规会变化，使用任何指南前请向相关主管部门及具备资质的加拿大专业人士确认最新要求。',
  },
  fr: {
    pageGives: 'Ce que vous trouverez ici',
    roadmapTitle: 'Un parcours pratique, pas un dossier de permis public.',
    roadmapP1:
      'Nous ne publions pas ici les permis, rapports d’ingénierie, dossiers d’inspection ou autres documents propres à un client.',
    roadmapP2:
      'Nous proposons plutôt un point de départ clair. Il couvre les principales questions à régler avant de commander, transporter ou installer un bâtiment modulaire sur un site canadien.',
    roadmapP3:
      'La décision finale revient toujours à l’autorité compétente et aux professionnels qualifiés qui travaillent sur votre projet.',
    bigThree: 'Les trois grands sujets',
    bigThreeTitle:
      'Les premières questions de conformité se regroupent généralement en trois catégories.',
    provincial: 'Différences provinciales',
    provincialTitle:
      'Le même code du bâtiment ne s’applique pas exactement de la même façon partout au Canada.',
    provincialBody:
      'Chaque province a ses propres modifications, dates d’entrée en vigueur et processus d’approbation. Les municipalités et d’autres autorités peuvent aussi gérer le zonage, les permis, l’examen des plans, les inspections et l’occupation. Nous ne garantissons pas la conformité provinciale. Nous aidons les clients à identifier la bonne autorité et les documents qu’elle demandera probablement.',
    sourcePrefix: 'Source officielle',
    resource: 'Ressource gratuite de planification',
    checklistTitle: 'Liste de conformité avant construction',
    checklistBody:
      'Un prix usine ne dit pas si le bâtiment pourra être autorisé, transporté, installé ou occupé sur votre site. Utilisez cette liste pour organiser les questions avant que la commande soit trop avancée.',
    download: 'Télécharger la liste',
    call: 'Réserver un appel de 15 min',
    unsure: 'Vous ne savez pas par où commencer?',
    unsureTitle:
      'Envoyez-nous le lieu, l’usage prévu, la capacité, le budget et la date cible.',
    unsureBody:
      'Nous vous aiderons à identifier la première autorité à contacter, les documents à demander à l’usine et les questions à régler avant de poursuivre.',
    start: 'Démarrer un projet',
    reviewed: 'Dossiers publics examinés',
    reviewedTitle:
      'Dossiers de projet autorisés pour publication',
    official: 'Sources officielles utiles',
    growingTitle: 'Cette bibliothèque de ressources continue de grandir.',
    growingBody:
      'Nous ajoutons des résumés provinciaux, des guides documentaires, des notes sur le transport et des ressources de préparation aux permis. Les exigences changent; confirmez toujours les renseignements à jour auprès de l’autorité compétente et de professionnels canadiens qualifiés.',
  },
}

const complianceCards: Localized<ComplianceCard[]> = {
  en: [
    {
      title: 'Building Codes & Zoning',
      icon: Building2,
      body:
        'The National Building Code of Canada 2020 is a model code. Provinces and territories adopt it, change it, and set their own effective dates. Local zoning bylaws can also control use, setbacks, height, parking, servicing, and fire access. The first question is which code edition and local rules apply at your project address.',
    },
    {
      title: 'CSA & Product Certifications',
      icon: BadgeCheck,
      body:
        'CSA A277 covers the certification procedure for prefabricated buildings, modules, and panels made in a factory. It does not automatically cover foundations, anchoring, site connections, installation, or work completed outside the certified factory program. Electrical work must also follow the applicable edition of CSA C22.1, Canadian Electrical Code, Part I. Ask for the factory certificate, certification body, standard edition, building type, and written scope.',
    },
    {
      title: 'Transport, Weights & Site Access',
      icon: Truck,
      body:
        'Large modules may need over-dimensional or overweight permits. The carrier may also need a checked route, bridge and overhead-clearance reviews, escort vehicles, or municipal road permissions. Seasonal road restrictions, turning space, crane access, and weak ground can change the delivery plan. Confirm these points before final dimensions are locked.',
    },
  ],
  zh: [
    {
      title: '建筑规范与分区',
      icon: Building2,
      body:
        '《加拿大国家建筑规范 2020》属于示范规范。各省和地区会自行采纳、修改并设定生效日期。地方分区法规还可能控制用途、退界、高度、停车、公用设施及消防通道。首先要确认的不是模块是否“符合 NBC 2020”，而是项目地址适用哪个版本及哪些地方规定。',
    },
    {
      title: 'CSA 与产品认证',
      icon: BadgeCheck,
      body:
        'CSA A277 规定了工厂预制建筑、模块及墙板的认证程序，但不会自动覆盖基础、锚固、现场连接、安装或认证工厂范围以外完成的工作。电气工作还必须符合项目所在省或地区采纳的 CSA C22.1《加拿大电气规范第一部分》。请索取工厂证书、认证机构、标准版本、建筑类型及书面认证范围。',
    },
    {
      title: '运输、重量与现场通行',
      icon: Truck,
      body:
        '大型模块可能需要超尺寸或超重运输许可。承运商还可能需要核定路线、桥梁及上方净空审查、护送车辆或市政道路许可。季节性道路限制、转弯空间、吊车通行及地面承载力都会影响交付计划。应在最终尺寸锁定前确认这些事项。',
    },
  ],
  fr: [
    {
      title: 'Codes du bâtiment et zonage',
      icon: Building2,
      body:
        'Le Code national du bâtiment du Canada 2020 est un code modèle. Les provinces et territoires l’adoptent, le modifient et fixent leurs propres dates d’entrée en vigueur. Les règlements locaux de zonage peuvent aussi contrôler l’usage, les marges, la hauteur, le stationnement, les services et l’accès incendie. La première question est donc de savoir quelle édition et quelles règles locales s’appliquent à l’adresse du projet.',
    },
    {
      title: 'CSA et certifications de produits',
      icon: BadgeCheck,
      body:
        'La norme CSA A277 encadre la certification des bâtiments, modules et panneaux préfabriqués en usine. Elle ne couvre pas automatiquement les fondations, l’ancrage, les raccordements, l’installation ou les travaux réalisés hors du programme certifié. Les travaux électriques doivent aussi respecter l’édition applicable de la norme CSA C22.1, Code canadien de l’électricité, Première partie. Demandez le certificat de l’usine, l’organisme, l’édition, le type de bâtiment et la portée écrite.',
    },
    {
      title: 'Transport, poids et accès au site',
      icon: Truck,
      body:
        'Les grands modules peuvent exiger des permis hors normes ou de surcharge. Le transporteur peut aussi devoir faire vérifier l’itinéraire, les ponts, les dégagements aériens, les escortes et les routes municipales. Les restrictions saisonnières, l’espace de manœuvre, l’accès des grues et la capacité du sol peuvent modifier le plan de livraison. Confirmez ces points avant de figer les dimensions.',
    },
  ],
}

const provinceLinks = {
  alberta: 'https://www.alberta.ca/building-codes-and-standards',
  bc:
    'https://www2.gov.bc.ca/gov/content/industry/construction-industry/building-codes-standards/bc-codes',
  ontario: 'https://www.ontario.ca/page/ontarios-building-code',
  quebec:
    'https://www.legisquebec.gouv.qc.ca/en/document/cr/b-1.1%2C%20r.%202?langCont=en',
}

const provinces: Localized<Province[]> = {
  en: [
    {
      name: 'Alberta',
      body:
        'Alberta uses the National Building Code - 2023 Alberta Edition, based on NBC 2020. It came into force on May 1, 2024. Energy Performance Tier 1 is the minimum level for the applicable housing and small-building provisions. Confirm the permit authority, current STANDATA, energy pathway, and local land-use requirements.',
      href: provinceLinks.alberta,
      source: 'Alberta building codes and standards',
    },
    {
      name: 'British Columbia',
      body:
        'The BC Building Code 2024 is based on NBC 2020. Most provisions came into effect on March 8, 2024, while some requirements had later transition dates. The City of Vancouver has its own building bylaw, and some other jurisdictions may follow different arrangements. Confirm the project location before choosing the code and approval path.',
      href: provinceLinks.bc,
      source: 'British Columbia codes',
    },
    {
      name: 'Ontario',
      body:
        'The 2024 Ontario Building Code adopts NBC 2020 with Ontario amendments. It came into effect on January 1, 2025, with transition provisions for certain work already underway. Factory certification can address work completed under a certified program, but foundations, services, anchoring, installation, and other site work still need project-specific review.',
      href: provinceLinks.ontario,
      source: 'Ontario Building Code',
    },
    {
      name: 'Quebec',
      body:
        'Chapter I, Building, of the Quebec Construction Code incorporates an amended version of NBC 2020. The updated chapter came into force on April 17, 2025. Quebec changes affect accessibility, structural design, fire protection, building-envelope requirements, and other technical areas.',
      href: provinceLinks.quebec,
      source: 'Quebec Construction Code',
    },
  ],
  zh: [
    {
      name: '阿尔伯塔省',
      body:
        '阿尔伯塔省使用以 NBC 2020 为基础的《国家建筑规范 - 2023 阿尔伯塔版》，并于 2024 年 5 月 1 日生效。适用的住宅及小型建筑条款最低采用能源性能第 1 级。请确认许可主管部门、最新 STANDATA、能源路径及地方土地使用要求。',
      href: provinceLinks.alberta,
      source: '阿尔伯塔省建筑规范与标准',
    },
    {
      name: '不列颠哥伦比亚省',
      body:
        '《BC 建筑规范 2024》以 NBC 2020 为基础。大部分条款于 2024 年 3 月 8 日生效，部分要求设有更晚的过渡日期。温哥华市有自己的建筑附例，其他部分地区也可能采用不同安排。选择规范和审批路径前必须先确认项目地点。',
      href: provinceLinks.bc,
      source: '不列颠哥伦比亚省建筑规范',
    },
    {
      name: '安大略省',
      body:
        '《安大略省建筑规范 2024》采纳 NBC 2020，并加入安大略省修订内容。该规范于 2025 年 1 月 1 日生效，部分已启动工作适用过渡条款。工厂认证可覆盖认证计划内完成的工作，但基础、公用设施、锚固、安装及其他现场工作仍需要项目专项审查。',
      href: provinceLinks.ontario,
      source: '安大略省建筑规范',
    },
    {
      name: '魁北克省',
      body:
        '魁北克《建筑规范》第一章纳入了经省级修订的 NBC 2020，并于 2025 年 4 月 17 日生效。魁北克的修订涉及无障碍、结构设计、消防保护、建筑围护结构及其他技术领域。',
      href: provinceLinks.quebec,
      source: '魁北克省建筑规范',
    },
  ],
  fr: [
    {
      name: 'Alberta',
      body:
        'L’Alberta utilise le National Building Code - 2023 Alberta Edition, fondé sur le CNB 2020. Il est entré en vigueur le 1er mai 2024. Le niveau de performance énergétique 1 est le minimum pour les dispositions applicables aux maisons et petits bâtiments. Confirmez l’autorité, les STANDATA à jour, le parcours énergétique et les règles locales.',
      href: provinceLinks.alberta,
      source: 'Codes et normes de l’Alberta',
    },
    {
      name: 'Colombie-Britannique',
      body:
        'Le BC Building Code 2024 est fondé sur le CNB 2020. La plupart des dispositions sont entrées en vigueur le 8 mars 2024, tandis que certaines avaient des dates transitoires plus tardives. La Ville de Vancouver possède son propre règlement, et d’autres territoires peuvent suivre des arrangements différents. Confirmez le lieu avant de choisir le code et le processus.',
      href: provinceLinks.bc,
      source: 'Codes de la Colombie-Britannique',
    },
    {
      name: 'Ontario',
      body:
        'Le Code du bâtiment de l’Ontario 2024 adopte le CNB 2020 avec des modifications provinciales. Il est entré en vigueur le 1er janvier 2025, avec des règles transitoires pour certains travaux déjà commencés. La certification en usine peut couvrir les travaux réalisés dans le programme certifié, mais les fondations, services, ancrages et travaux sur site doivent encore être examinés.',
      href: provinceLinks.ontario,
      source: 'Code du bâtiment de l’Ontario',
    },
    {
      name: 'Québec',
      body:
        'Le chapitre I, Bâtiment, du Code de construction du Québec intègre une version modifiée du CNB 2020. Il est entré en vigueur le 17 avril 2025. Les modifications québécoises touchent notamment l’accessibilité, la structure, la protection incendie et l’enveloppe du bâtiment.',
      href: provinceLinks.quebec,
      source: 'Code de construction du Québec',
    },
  ],
}

const checklistSections: Localized<ChecklistSection[]> = {
  en: [
    {
      title: '1. Project location and responsible authority',
      groups: [
        {
          title: 'Project details',
          items: [
            'Project name and full site address or legal land description',
            'Province, municipality, regional district, First Nation, or other governing authority',
            'Intended use, expected occupancy, and seasonal or year-round operation',
            'Target delivery and occupancy dates',
          ],
        },
        {
          title: 'Authority contacts',
          items: [
            'Building-permit and planning or zoning contacts',
            'Fire, electrical, plumbing, or gas authorities, where separate',
            'Provincial and municipal transportation authorities',
            'Qualified architect or engineer, where required',
          ],
        },
      ],
    },
    {
      title: '2. Zoning and building-code pathway',
      groups: [
        {
          title: 'Land-use review',
          items: [
            'Proposed use, development permit, setbacks, height, and lot coverage',
            'Parking, loading, fire access, accessibility, and temporary-building rules',
            'Indigenous, environmental, heritage, or other land restrictions',
          ],
        },
        {
          title: 'Code review',
          items: [
            'Applicable code, edition, transition rules, and local amendments',
            'Building classification, major occupancy, and Part 3 or Part 9 pathway',
            'Energy and fire-protection requirements',
          ],
        },
      ],
    },
    {
      title: '3. Factory and certification documents',
      groups: [
        {
          title: 'Factory information',
          items: [
            'Manufacturer name, factory address, experience, and similar work',
            'Quality-control, inspection, testing, warranty, and after-sales process',
          ],
        },
        {
          title: 'Certification information',
          items: [
            'Certification body and accreditation',
            'CSA A277 certificate, standard edition, factory location, and listed scope',
            'Module labels, serial numbers, certificate status, and inspection records',
            'Items excluded from factory certification listed in writing',
          ],
        },
      ],
    },
    {
      title: '4. Design, site, and services',
      groups: [
        {
          title: 'Design documents',
          items: [
            'Architectural, structural, mechanical, electrical, and plumbing drawings',
            'Structural calculations, fire-safety information, materials, and equipment schedules',
            'Canadian units and references to applicable Canadian requirements',
          ],
        },
        {
          title: 'Site work',
          items: [
            'Survey, geotechnical information, foundations, and anchoring',
            'Snow, wind, seismic, drainage, and grading requirements',
            'Water, wastewater, electrical, fuel, and communications services',
            'Site-preparation responsibilities',
          ],
        },
      ],
    },
    {
      title: '5. Shipping, delivery, and installation',
      groups: [
        {
          title: 'Transport planning',
          items: [
            'Final dimensions, weights, lifting points, packing, and loading method',
            'Carrier, permits, route, bridge, and overhead-clearance checks',
            'Municipal road permissions, seasonal restrictions, escorts, and traffic control',
          ],
        },
        {
          title: 'Site delivery',
          items: [
            'Entrance, turning radius, ground-bearing capacity, and staging area',
            'Crane or forklift plan, temporary storage, weather plan, and site safety',
            'Assembly sequence, tools, equipment, and labour',
          ],
        },
      ],
    },
    {
      title: '6. Permit file, inspections, and handover',
      groups: [
        {
          title: 'Before permit submission',
          items: [
            'Application forms, owner and contractor information',
            'Signed or sealed drawings, certificates, tests, calculations, and energy information',
            'Site plan, foundations, services, transport information, and an open-item register',
          ],
        },
        {
          title: 'During installation',
          items: [
            'Factory and receiving records, shipping damage, and approved site changes',
            'Foundation, electrical, plumbing, gas, structural, fire, and life-safety inspections',
            'Deficiency tracking and close-out',
          ],
        },
        {
          title: 'Before occupancy or use',
          items: [
            'Final inspection and occupancy approval, where required',
            'As-built drawings, manuals, warranties, spare parts, and maintenance schedule',
            'Emergency information, client training, and a final open-item list',
          ],
        },
      ],
    },
  ],
  zh: [
    {
      title: '1. 项目地点及主管部门',
      groups: [
        {
          title: '项目基本信息',
          items: [
            '项目名称及完整地址或法定土地描述',
            '省、市政、地区、原住民社区或其他主管机构',
            '预定用途、预计使用人数及季节性或全年运营',
            '目标交付及投入使用日期',
          ],
        },
        {
          title: '主管部门联系人',
          items: [
            '建筑许可及规划或分区联系人',
            '如单独管理，消防、电气、给排水或燃气主管部门',
            '省级及市政运输主管部门',
            '如需要，具备资质的建筑师或工程师',
          ],
        },
      ],
    },
    {
      title: '2. 分区与建筑规范路径',
      groups: [
        {
          title: '土地使用审查',
          items: [
            '拟议用途、开发许可、退界、高度及用地覆盖率',
            '停车、装卸、消防通道、无障碍及临时建筑规定',
            '原住民、环境、历史保护或其他土地限制',
          ],
        },
        {
          title: '规范审查',
          items: [
            '适用规范、版本、过渡规则及地方修订',
            '建筑分类、主要使用类别及 Part 3 或 Part 9 路径',
            '能源及消防要求',
          ],
        },
      ],
    },
    {
      title: '3. 工厂及认证文件',
      groups: [
        {
          title: '工厂信息',
          items: [
            '制造商名称、工厂地址、经验及类似项目',
            '质量控制、检查、测试、保修及售后流程',
          ],
        },
        {
          title: '认证信息',
          items: [
            '认证机构及其资质',
            'CSA A277 证书、标准版本、工厂地点及认证范围',
            '模块标签、序列号、证书状态及检查记录',
            '以书面方式列明不在工厂认证范围内的项目',
          ],
        },
      ],
    },
    {
      title: '4. 设计、场地及公用设施',
      groups: [
        {
          title: '设计文件',
          items: [
            '建筑、结构、机械、电气及给排水图纸',
            '结构计算书、消防资料、材料及设备表',
            '使用加拿大单位并引用适用的加拿大要求',
          ],
        },
        {
          title: '现场工作',
          items: [
            '测量、岩土资料、基础及锚固设计',
            '雪荷载、风荷载、地震、排水及场地标高要求',
            '供水、污水、电力、燃料及通信服务',
            '场地准备责任',
          ],
        },
      ],
    },
    {
      title: '5. 运输、交付及安装',
      groups: [
        {
          title: '运输规划',
          items: [
            '最终尺寸、重量、吊点、包装及装载方式',
            '承运商、许可、路线、桥梁及上方净空检查',
            '市政道路许可、季节性限制、护送车辆及交通管制',
          ],
        },
        {
          title: '现场交付',
          items: [
            '入口、转弯半径、地面承载力及临时堆放区',
            '起重机或叉车方案、临时存储、天气计划及现场安全',
            '组装顺序、工具、设备及人工',
          ],
        },
      ],
    },
    {
      title: '6. 许可文件、检查及移交',
      groups: [
        {
          title: '提交许可申请前',
          items: [
            '申请表、业主及承包商资料',
            '签字或盖章图纸、证书、测试、计算及能源资料',
            '场地平面图、基础、公用设施、运输资料及待办事项清单',
          ],
        },
        {
          title: '安装期间',
          items: [
            '工厂及收货记录、运输损坏及获批现场变更',
            '基础、电气、给排水、燃气、结构、消防及生命安全检查',
            '缺陷跟踪及关闭',
          ],
        },
        {
          title: '投入使用前',
          items: [
            '最终检查及使用批准（如要求）',
            '竣工图、手册、保修、备件及维护计划',
            '紧急信息、客户培训及最终未结事项清单',
          ],
        },
      ],
    },
  ],
  fr: [
    {
      title: '1. Lieu du projet et autorité responsable',
      groups: [
        {
          title: 'Renseignements sur le projet',
          items: [
            'Nom du projet et adresse complète ou description légale du terrain',
            'Province, municipalité, district régional, Première Nation ou autre autorité',
            'Usage prévu, occupation attendue et exploitation saisonnière ou annuelle',
            'Dates cibles de livraison et d’occupation',
          ],
        },
        {
          title: 'Contacts officiels',
          items: [
            'Contacts pour le permis et la planification ou le zonage',
            'Autorités incendie, électricité, plomberie ou gaz, si distinctes',
            'Autorités provinciale et municipale de transport',
            'Architecte ou ingénieur qualifié, au besoin',
          ],
        },
      ],
    },
    {
      title: '2. Zonage et parcours du code du bâtiment',
      groups: [
        {
          title: 'Usage du terrain',
          items: [
            'Usage proposé, permis d’aménagement, marges, hauteur et occupation du terrain',
            'Stationnement, chargement, accès incendie, accessibilité et bâtiments temporaires',
            'Restrictions autochtones, environnementales, patrimoniales ou autres',
          ],
        },
        {
          title: 'Examen du code',
          items: [
            'Code applicable, édition, règles transitoires et modifications locales',
            'Classification, occupation principale et parcours Partie 3 ou Partie 9',
            'Exigences énergétiques et de protection incendie',
          ],
        },
      ],
    },
    {
      title: '3. Usine et documents de certification',
      groups: [
        {
          title: 'Renseignements sur l’usine',
          items: [
            'Nom du fabricant, adresse, expérience et projets comparables',
            'Contrôle qualité, inspections, essais, garantie et service après-vente',
          ],
        },
        {
          title: 'Certification',
          items: [
            'Organisme de certification et accréditation',
            'Certificat CSA A277, édition, adresse de l’usine et portée',
            'Étiquettes, numéros de série, état du certificat et inspections',
            'Éléments exclus de la certification indiqués par écrit',
          ],
        },
      ],
    },
    {
      title: '4. Conception, site et services',
      groups: [
        {
          title: 'Documents de conception',
          items: [
            'Plans architecturaux, structuraux, mécaniques, électriques et de plomberie',
            'Calculs structuraux, sécurité incendie, matériaux et équipements',
            'Unités canadiennes et références aux exigences applicables',
          ],
        },
        {
          title: 'Travaux sur site',
          items: [
            'Arpentage, géotechnique, fondations et ancrage',
            'Neige, vent, séisme, drainage et nivellement',
            'Eau, eaux usées, électricité, carburant et télécommunications',
            'Responsabilités de préparation du site',
          ],
        },
      ],
    },
    {
      title: '5. Transport, livraison et installation',
      groups: [
        {
          title: 'Planification du transport',
          items: [
            'Dimensions, poids, points de levage, emballage et chargement',
            'Transporteur, permis, itinéraire, ponts et dégagements',
            'Autorisations municipales, restrictions saisonnières, escortes et circulation',
          ],
        },
        {
          title: 'Livraison sur site',
          items: [
            'Entrée, rayon de braquage, capacité du sol et zone de mise en attente',
            'Plan de grue ou chariot, stockage temporaire, météo et sécurité',
            'Séquence d’assemblage, outils, équipements et main-d’œuvre',
          ],
        },
      ],
    },
    {
      title: '6. Dossier de permis, inspections et remise',
      groups: [
        {
          title: 'Avant la demande de permis',
          items: [
            'Formulaires, renseignements sur le propriétaire et l’entrepreneur',
            'Plans signés ou scellés, certificats, essais, calculs et énergie',
            'Plan du site, fondations, services, transport et registre des points ouverts',
          ],
        },
        {
          title: 'Pendant l’installation',
          items: [
            'Dossiers d’usine et de réception, dommages et modifications approuvées',
            'Inspections des fondations, systèmes, structure, incendie et sécurité',
            'Suivi et fermeture des déficiences',
          ],
        },
        {
          title: 'Avant l’occupation',
          items: [
            'Inspection finale et autorisation d’occupation, au besoin',
            'Plans tels que construits, manuels, garanties, pièces et entretien',
            'Information d’urgence, formation et liste finale des points ouverts',
          ],
        },
      ],
    },
  ],
}

const officialSources: Localized<{ label: string; href: string }[]> = {
  en: [
    {
      label: 'National Building Code of Canada 2020',
      href:
        'https://nrc.canada.ca/en/certifications-evaluations-standards/codes-canada/codes-canada-publications/national-building-code-canada-2020',
    },
    {
      label: 'CSA modular-construction standards overview',
      href:
        'https://www.csagroup.org/wp-content/uploads/CSA-ModularConstruction-CaseStudy-EN_Accessible.pdf',
    },
    {
      label: 'Ontario oversize and overweight permits',
      href: 'https://www.ontario.ca/page/get-oversizeoverweight-permit',
    },
  ],
  zh: [
    {
      label: '加拿大国家建筑规范 2020',
      href:
        'https://nrc.canada.ca/en/certifications-evaluations-standards/codes-canada/codes-canada-publications/national-building-code-canada-2020',
    },
    {
      label: 'CSA 模块化建筑标准概览',
      href:
        'https://www.csagroup.org/wp-content/uploads/CSA-ModularConstruction-CaseStudy-EN_Accessible.pdf',
    },
    {
      label: '安大略省超尺寸及超重运输许可',
      href: 'https://www.ontario.ca/page/get-oversizeoverweight-permit',
    },
  ],
  fr: [
    {
      label: 'Code national du bâtiment du Canada 2020',
      href:
        'https://nrc.canada.ca/en/certifications-evaluations-standards/codes-canada/codes-canada-publications/national-building-code-canada-2020',
    },
    {
      label: 'Aperçu des normes CSA pour la construction modulaire',
      href:
        'https://www.csagroup.org/wp-content/uploads/CSA-ModularConstruction-CaseStudy-EN_Accessible.pdf',
    },
    {
      label: 'Permis ontariens hors normes et surcharge',
      href: 'https://www.ontario.ca/page/get-oversizeoverweight-permit',
    },
  ],
}

const checklistDownloads: Localized<string> = {
  en: '/downloads/nexus-pre-construction-compliance-checklist.pdf',
  zh: '/downloads/nexus-pre-construction-compliance-checklist-zh.pdf',
  fr: '/downloads/nexus-pre-construction-compliance-checklist-fr.pdf',
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await props.params
  if (!isLocale(locale) || !isPhase5PublicComplianceEnabled()) return {}

  return {
    title: pageCopy[locale].title,
    description: pageCopy[locale].intro,
    robots: { index: true, follow: true },
  }
}

export default async function CompliancePage(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await props.params
  if (!isLocale(rawLocale) || !isPhase5PublicComplianceEnabled()) notFound()

  const locale = rawLocale as Locale
  const page = pageCopy[locale]
  const text = ui[locale]
  const cards = complianceCards[locale]
  const provinceItems = provinces[locale]
  const checklist = checklistSections[locale]
  const sources = officialSources[locale]
  const checklistHref = checklistDownloads[locale]

  const prisma = await getPrisma()
  const records = (
    await prisma.complianceRecord.findMany({
      where: {
        organizationKey: PHASE5_ORGANIZATION_KEY,
        publicVisible: true,
      },
      orderBy: [{ jurisdiction: 'asc' }, { category: 'asc' }],
      select: {
        id: true,
        jurisdiction: true,
        projectUse: true,
        category: true,
        publicVisible: true,
        publicTitleEn: true,
        publicTitleZh: true,
        publicTitleFr: true,
        publicSummaryEn: true,
        publicSummaryZh: true,
        publicSummaryFr: true,
      },
    })
  ).filter(validatePublicCompliance)

  const titleKey =
    `publicTitle${locale === 'zh' ? 'Zh' : locale === 'fr' ? 'Fr' : 'En'}` as const
  const summaryKey =
    `publicSummary${locale === 'zh' ? 'Zh' : locale === 'fr' ? 'Fr' : 'En'}` as const

  return (
    <>
      <main className="min-h-screen bg-[#f5f6f5] text-[#11191b]">
        <section className="relative overflow-hidden bg-[#082328] pb-20 pt-36 text-white">
          <SiteHeader locale={locale} />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_35%,rgba(45,130,176,.28),transparent_62%)]" />
          <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
            <p className="eyebrow text-[#b8d683]">NEXUS · CANADA</p>
            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {page.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72">
              {page.intro}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="flex gap-4 rounded-lg border border-[#dfd7a5] bg-[#fff9df] p-5 text-[0.9rem] leading-7 text-[#3d3826] sm:p-6">
            <Info className="mt-1 h-5 w-5 shrink-0 text-[#8d7725]" aria-hidden="true" />
            <p>
              <strong>{page.disclaimer}</strong>
            </p>
          </div>

          <div className="mt-12 max-w-4xl">
            <p className="premium-eyebrow">{text.pageGives}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              {text.roadmapTitle}
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-slate-600">
              <p>{text.roadmapP1}</p>
              <p>{text.roadmapP2}</p>
              <p>{text.roadmapP3}</p>
            </div>
          </div>
        </section>

        <section className="border-y border-black/10 bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <p className="premium-eyebrow">{text.bigThree}</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              {text.bigThreeTitle}
            </h2>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {cards.map(({ title, body, icon: Icon }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-[#f8faf9] p-6 sm:p-7"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-[#0b2528] text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">
                    {title}
                  </h3>
                  <p className="mt-4 leading-7 text-slate-600">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <p className="premium-eyebrow">{text.provincial}</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            {text.provincialTitle}
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-600">
            {text.provincialBody}
          </p>

          <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200 bg-white">
            {provinceItems.map((province, index) => (
              <details key={province.name} className="group" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-xl font-semibold sm:px-7">
                  {province.name}
                  <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-6 sm:px-7">
                  <p className="max-w-4xl leading-7 text-slate-600">{province.body}</p>
                  <a
                    href={province.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#176b96] hover:underline"
                  >
                    {text.sourcePrefix}: {province.source}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-[#082328] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
              <div>
                <p className="eyebrow text-[#b8d683]">{text.resource}</p>
                <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  {text.checklistTitle}
                </h2>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
                  {text.checklistBody}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a href={checklistHref} download className="premium-button-light">
                  <Download className="h-4 w-4" />
                  {text.download}
                </a>
                <Link
                  href={`/${locale}/book-a-call`}
                  className="premium-button-ghost"
                >
                  <Phone className="h-4 w-4" />
                  {text.call}
                </Link>
              </div>
            </div>

            <div className="mt-12 grid gap-4">
              {checklist.map((section, index) => (
                <details
                  key={section.title}
                  className="group rounded-xl border border-white/14 bg-white/[0.05]"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-lg font-semibold sm:px-6">
                    <span className="inline-flex items-center gap-3">
                      <FileCheck2 className="h-5 w-5 text-[#b8d683]" />
                      {section.title}
                    </span>
                    <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                  </summary>

                  <div className="grid gap-7 border-t border-white/10 px-5 py-6 sm:px-6 md:grid-cols-2">
                    {section.groups.map((group) => (
                      <div key={group.title}>
                        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#b8d683]">
                          {group.title}
                        </h3>
                        <div className="mt-4 grid gap-3">
                          {group.items.map((item) => (
                            <p
                              key={item}
                              className="flex items-start gap-3 text-sm leading-6 text-white/72"
                            >
                              <span
                                className="mt-1 h-4 w-4 shrink-0 border border-white/45"
                                aria-hidden="true"
                              />
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-7 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="premium-eyebrow">{text.unsure}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                {text.unsureTitle}
              </h2>
              <p className="mt-5 max-w-3xl leading-7 text-slate-600">
                {text.unsureBody}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="premium-button-dark">
                {text.start}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/${locale}/book-a-call`}
                className="inline-flex min-h-11 items-center gap-2 border border-[#11191b]/20 px-5 text-sm font-bold uppercase tracking-[0.08em] text-[#11191b] transition hover:bg-[#11191b] hover:text-white"
              >
                {text.call}
              </Link>
            </div>
          </div>

          {records.length > 0 ? (
            <div className="mt-16">
              <p className="premium-eyebrow">{text.reviewed}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                {text.reviewedTitle}
              </h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {records.map((record) => (
                  <article
                    key={record.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-[#176b96]">
                      <span>{record.jurisdiction}</span>
                      <span>·</span>
                      <span>{record.projectUse}</span>
                      <span>·</span>
                      <span>{record.category.replaceAll('_', ' ')}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold">{record[titleKey]}</h3>
                    <p className="mt-3 leading-7 text-slate-600">
                      {record[summaryKey]}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-16 border-t border-slate-200 pt-8">
            <h2 className="text-xl font-semibold">{text.official}</h2>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {sources.map((source) => (
                <a
                  key={source.label}
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#176b96] hover:underline"
                >
                  {source.label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-xl bg-[#eef1ee] p-5 text-sm leading-6 text-slate-600 sm:p-6">
            <strong className="text-[#11191b]">{text.growingTitle}</strong>{' '}
            {text.growingBody}
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </>
  )
}
