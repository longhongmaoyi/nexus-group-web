import type { Locale } from '@/lib/i18n'

export type LocalizedText = Record<Locale, string>
export const t = (en: string, zh: string, fr: string): LocalizedText => ({ en, zh, fr })

export type SolutionSection = {
  id: string
  title: LocalizedText
  summary: LocalizedText
  bestFor: LocalizedText[]
  firstInfo: LocalizedText[]
  costDrivers: LocalizedText[]
  delays: LocalizedText[]
  nexus: LocalizedText[]
  local: LocalizedText[]
}

export const solutionsCopy = {
  eyebrow: t('NEXUS · MODULAR SOLUTIONS', 'NEXUS · 模块化解决方案', 'NEXUS · SOLUTIONS MODULAIRES'),
  title: t('Modular solutions organised around real operating needs.', '围绕真实运营需求组织模块化解决方案。', 'Des solutions modulaires organisées autour des besoins réels.'),
  intro: t(
    'The same module can succeed in one project and fail in another. The difference is usually the brief, site, users, utilities, transport route, approval path and division of responsibilities.',
    '同一个模块在一个项目中可能成功，在另一个项目中却可能失败。差别通常来自简报、场地、使用者、公用设施、运输路线、审批路径及责任划分。',
    'Le même module peut réussir dans un projet et échouer dans un autre. La différence vient souvent du dossier, du site, des usagers, des services, du transport, des approbations et des responsabilités.',
  ),
  industriesTitle: t('Find the closest operating need', '找到最接近的运营需求', 'Trouver le besoin opérationnel le plus proche'),
  industriesBody: t(
    'Mining, energy, construction, tourism, community and commercial buyers may use similar systems, but the operating brief is different. Start with the building’s job, not an industry label.',
    '矿业、能源、建筑、旅游、社区及商业买家可能使用相似系统，但运营简报并不相同。应从建筑需要完成的任务开始，而不是从行业标签开始。',
    'Les acheteurs des mines, de l’énergie, de la construction, du tourisme, des communautés et du commerce peuvent utiliser des systèmes semblables, mais leurs dossiers diffèrent. Commencez par la fonction du bâtiment.',
  ),
  labels: {
    bestFor: t('Best suited for', '适合用途', 'Convient surtout à'),
    firstInfo: t('Information needed first', '首先需要的信息', 'Information nécessaire au départ'),
    costDrivers: t('Main cost drivers', '主要成本因素', 'Principaux facteurs de coût'),
    delays: t('Common causes of delay', '常见延误原因', 'Causes courantes de retard'),
    nexus: t('What NEXUS coordinates', 'NEXUS 协调什么', 'Ce que NEXUS coordonne'),
    local: t('What local professionals must confirm', '本地专业人士必须确认什么', 'Ce que les professionnels locaux doivent confirmer'),
  },
  cta: t('Discuss a modular project', '讨论模块化项目', 'Discuter d’un projet modulaire'),
}

const item = (en: string, zh: string, fr: string) => t(en, zh, fr)

export const solutionSections: SolutionSection[] = [
  {
    id: 'workforce-camps',
    title: t('Workforce Camps', '工人营地', 'Camps de travailleurs'),
    summary: t('Accommodation and support facilities planned around headcount, shifts, climate, utilities, transport and maintenance.', '围绕人数、班次、气候、公用设施、运输及维护规划住宿及配套设施。', 'Hébergement et soutien planifiés selon les effectifs, quarts, climat, services, transport et entretien.'),
    bestFor: [item('Mining and remote resources', '矿业及偏远资源', 'Mines et ressources éloignées'), item('Energy and construction mobilisations', '能源及建筑进场项目', 'Mobilisations d’énergie et de construction')],
    firstInfo: [item('Headcount by shift and rotation', '各班次人数及轮班方式', 'Effectifs par quart et rotation'), item('Location, climate, road access and utilities', '地点、气候、道路通行及公用设施', 'Lieu, climat, accès routier et services')],
    costDrivers: [item('Winterisation and utility systems', '冬季适应及公用设施系统', 'Adaptation hivernale et services'), item('Freight, lifting, kitchens and shared facilities', '运输、吊装、厨房及共享设施', 'Fret, levage, cuisines et installations communes')],
    delays: [item('Late site-service decisions', '场地服务决定过晚', 'Décisions tardives sur les services'), item('Unresolved route, crane or room-mix questions', '路线、吊车或房型问题未解决', 'Questions non réglées sur la route, la grue ou les chambres')],
    nexus: [item('Brief, supplier, document and freight coordination', '简报、供应商、文件及运输协调', 'Coordination du dossier, fournisseur, documents et fret'), item('Receiving, assembly and handover tracking', '收货、组装及移交跟踪', 'Suivi de la réception, de l’assemblage et de la remise')],
    local: [item('Site, foundation and utility design', '场地、基础及公用设施设计', 'Conception du site, des fondations et des services'), item('Permits, professional design and inspections', '许可、专业设计及检查', 'Permis, conception professionnelle et inspections')],
  },
  {
    id: 'commercial-kiosks',
    title: t('Commercial Kiosks', '商业售卖亭', 'Kiosques commerciaux'),
    summary: t('Coffee, food, retail and service units planned around equipment, customer flow, cleaning, utilities and approvals.', '围绕设备、顾客动线、清洁、公用设施及审批规划咖啡、餐饮、零售和服务单元。', 'Unités de café, restauration, commerce et service planifiées selon équipements, flux, nettoyage, services et approbations.'),
    bestFor: [item('Coffee, food and retail operations', '咖啡、餐饮及零售运营', 'Café, restauration et commerce'), item('Compact service or office units', '紧凑型服务或办公单元', 'Petites unités de service ou de bureau')],
    firstInfo: [item('Equipment list and peak customer volume', '设备清单及高峰客流', 'Liste d’équipements et volume de pointe'), item('Site, utilities and target opening date', '场地、公用设施及目标开业日期', 'Site, services et date d’ouverture')],
    costDrivers: [item('Equipment, ventilation and drainage', '设备、通风及排水', 'Équipements, ventilation et drainage'), item('Branding, foundation and service connections', '品牌、基础及公用设施连接', 'Marque, fondation et raccordements')],
    delays: [item('Equipment changes after layout approval', '布局批准后更换设备', 'Changement d’équipement après approbation'), item('Late health, fire or signage review', '卫生、消防或标识审查过晚', 'Examen tardif de la santé, de l’incendie ou de l’enseigne')],
    nexus: [item('Operating brief, supplier and freight coordination', '运营简报、供应商及运输协调', 'Coordination du dossier, fournisseur et fret'), item('Scope, document and responsibility tracking', '范围、文件及责任跟踪', 'Suivi de la portée, des documents et des responsabilités')],
    local: [item('Building, food, health and fire requirements', '建筑、食品、卫生及消防要求', 'Exigences bâtiment, alimentation, santé et incendie'), item('Accessibility, trades and business approvals', '无障碍、专业工种及营业审批', 'Accessibilité, métiers et autorisations commerciales')],
  },
  {
    id: 'multi-unit-buildings',
    title: t('Multi-Unit Modular Buildings', '多单元模块化建筑', 'Bâtiments modulaires multiunités'),
    summary: t('Repeated units planned with structure, fire separation, acoustics, services, foundations, delivery and inspections.', '把可重复单元与结构、防火分隔、声学、公用设施、基础、交付及检查一起规划。', 'Unités répétées planifiées avec structure, séparation incendie, acoustique, services, fondations, livraison et inspections.'),
    bestFor: [item('Multi-unit accommodation or housing', '多单元住宿或住房', 'Hébergement ou logement multiunités'), item('Phased developments with repeatable units', '采用重复单元的分期开发', 'Développements par phases avec unités répétables')],
    firstInfo: [item('Unit mix, occupancy and accessibility', '单元组合、使用人数及无障碍', 'Combinaison, occupation et accessibilité'), item('Storeys, site, services and target occupancy', '层数、场地、公用设施及目标入住日期', 'Étages, site, services et occupation cible')],
    costDrivers: [item('Structure, connections and fire separations', '结构、连接及防火分隔', 'Structure, connexions et séparations incendie'), item('Corridors, vertical services, crane and inspections', '走廊、垂直设备、吊车及检查', 'Corridors, services verticaux, grue et inspections')],
    delays: [item('Late unit-mix or code changes', '单元组合或规范变更过晚', 'Changements tardifs d’unités ou de code'), item('Factory and site services that do not align', '工厂及现场设备不一致', 'Services usine-site mal alignés')],
    nexus: [item('Supplier, document and delivery coordination', '供应商、文件及交付协调', 'Coordination du fournisseur, des documents et de la livraison'), item('Module numbering, packing and handover records', '模块编号、包装及移交记录', 'Numérotation, emballage et dossiers de remise')],
    local: [item('Architecture, engineering and foundations', '建筑、工程及基础', 'Architecture, ingénierie et fondations'), item('Permits, fire, accessibility and inspections', '许可、消防、无障碍及检查', 'Permis, incendie, accessibilité et inspections')],
  },
  {
    id: 'remote-operations',
    title: t('Remote Operations', '偏远地区运营', 'Opérations éloignées'),
    summary: t('Offices, accommodation, change facilities, storage and support buildings for mining, energy and construction sites.', '面向矿业、能源及建筑现场的办公室、住宿、更衣、仓储及配套建筑。', 'Bureaux, hébergement, vestiaires, stockage et soutien pour les mines, l’énergie et la construction.'),
    bestFor: [item('Mining, oil, gas and energy sites', '矿业、油气及能源现场', 'Sites miniers, pétroliers, gaziers et énergétiques'), item('Temporary or relocatable facilities', '临时或可迁移设施', 'Installations temporaires ou relocalisables')],
    firstInfo: [item('Use, occupancy and operating hours', '用途、人数及运营时间', 'Usage, occupation et heures'), item('Hazards, seasonal access and backup systems', '风险、季节性通行及备用系统', 'Risques, accès saisonnier et systèmes de secours')],
    costDrivers: [item('Hazard controls and specialised systems', '风险控制及专项系统', 'Contrôles des risques et systèmes spécialisés'), item('Remote freight, heating and spare parts', '偏远运输、供暖及备件', 'Fret éloigné, chauffage et pièces')],
    delays: [item('Unresolved owner or safety standards', '业主或安全标准未解决', 'Normes du propriétaire ou de sécurité non réglées'), item('Seasonal road and lifting restrictions', '季节性道路及吊装限制', 'Restrictions saisonnières de route et de levage')],
    nexus: [item('Supplier, document and transport coordination', '供应商、文件及运输协调', 'Coordination du fournisseur, des documents et du transport'), item('Receiving, assembly and maintenance records', '收货、组装及维护记录', 'Dossiers de réception, d’assemblage et d’entretien')],
    local: [item('Safety classification and engineering', '安全分类及工程', 'Classification de sécurité et ingénierie'), item('Environmental, permit and inspection requirements', '环境、许可及检查要求', 'Exigences environnementales, de permis et d’inspection')],
  },
  {
    id: 'tourism-hospitality',
    title: t('Tourism, Hospitality & Modular Living', '旅游、酒店及模块化生活', 'Tourisme, hôtellerie et habitat modulaire'),
    summary: t('Cabins, guest accommodation and shared facilities planned around occupancy, operations, utilities and seasonal use.', '围绕入住、运营、公用设施及季节性使用规划小屋、客房及共享设施。', 'Chalets, hébergement et installations communes planifiés selon l’occupation, l’exploitation, les services et la saison.'),
    bestFor: [item('Cabins, guest suites and resort accommodation', '小屋、客房及度假住宿', 'Chalets, suites et hébergement de villégiature'), item('Staff housing or private modular living', '员工住房或私人模块化生活', 'Logement du personnel ou habitat privé')],
    firstInfo: [item('Guest profile, unit mix and shared facilities', '宾客类型、单元组合及共享设施', 'Profil des usagers, combinaison et installations communes'), item('Season, utilities and opening date', '季节、公用设施及开业日期', 'Saison, services et date d’ouverture')],
    costDrivers: [item('Bathrooms, kitchens, finishes and furniture', '卫生间、厨房、饰面及家具', 'Salles de bain, cuisines, finitions et mobilier'), item('Site services and seasonal operation', '场地服务及季节性运营', 'Services du site et fonctionnement saisonnier')],
    delays: [item('Changing unit mix or operating model', '更改单元组合或运营模式', 'Changement de la combinaison ou du modèle'), item('Late wastewater or occupancy decisions', '污水或使用决定过晚', 'Décisions tardives sur les eaux usées ou l’occupation')],
    nexus: [item('Brief, supplier, finish and freight coordination', '简报、供应商、饰面及运输协调', 'Coordination du dossier, fournisseur, finitions et fret'), item('Document and handover tracking', '文件及移交跟踪', 'Suivi des documents et de la remise')],
    local: [item('Land use, building and occupancy review', '土地用途、建筑及使用审查', 'Usage du terrain, bâtiment et occupation'), item('Site services, fire and accessibility', '场地服务、消防及无障碍', 'Services du site, incendie et accessibilité')],
  },
  {
    id: 'community-facilities',
    title: t('Community Facilities', '社区设施', 'Installations communautaires'),
    summary: t('Education, administration, housing and public-serving facilities planned around users, accessibility, maintenance and local decisions.', '围绕使用者、无障碍、维护及本地决策规划教育、行政、住房及公共服务设施。', 'Installations d’éducation, d’administration, de logement et de service public planifiées selon les usagers, l’accessibilité, l’entretien et les décisions locales.'),
    bestFor: [item('Community administration and services', '社区行政及服务', 'Administration et services communautaires'), item('Education, housing and essential facilities', '教育、住房及基本设施', 'Éducation, logement et installations essentielles')],
    firstInfo: [item('Community purpose, governance and users', '社区目标、治理及使用者', 'Objectif, gouvernance et usagers'), item('Funding, site access and maintenance capacity', '资金、场地通行及维护能力', 'Financement, accès et capacité d’entretien')],
    costDrivers: [item('Accessibility and public-use durability', '无障碍及公共使用耐用性', 'Accessibilité et durabilité pour usage public'), item('Remote transport, training and spare parts', '偏远运输、培训及备件', 'Transport éloigné, formation et pièces')],
    delays: [item('Unclear governance or approval path', '治理或批准路径不清晰', 'Gouvernance ou approbation imprécise'), item('Design or publication decisions without permission', '未经许可的设计或公开决定', 'Décisions de conception ou de publication sans autorisation')],
    nexus: [item('Listening, brief and supplier coordination', '倾听、简报及供应商协调', 'Écoute, dossier et coordination fournisseur'), item('Freight, training and handover tracking', '运输、培训及移交跟踪', 'Suivi du fret, de la formation et de la remise')],
    local: [item('Community governance and permission', '社区治理及许可', 'Gouvernance et autorisation communautaires'), item('Professional design, permits and local operation', '专业设计、许可及本地运营', 'Conception professionnelle, permis et fonctionnement local')],
  },
]

export type InformationPageData = {
  eyebrow: LocalizedText
  title: LocalizedText
  intro: LocalizedText
  calloutTitle: LocalizedText
  calloutBody: LocalizedText
  sections: Array<{ title: LocalizedText; body: LocalizedText; points: LocalizedText[] }>
  ctaTitle: LocalizedText
  ctaLabel: LocalizedText
  ctaHref: string
}

export const aboutPageData: InformationPageData = {
  eyebrow: t('ABOUT NEXUS LIFE', '关于 NEXUS LIFE', 'À PROPOS DE NEXUS LIFE'),
  title: t('A young company built on practical modular experience.', '一家建立在实际模块化经验之上的年轻公司。', 'Une jeune entreprise fondée sur une expérience modulaire concrète.'),
  intro: t('NEXUS Life coordinates modular construction work for workforce camps, commercial kiosks, multi-unit buildings, remote operations and community facilities in Canada.', 'NEXUS Life 协调加拿大工人营地、商业售卖亭、多单元建筑、偏远运营及社区设施的模块化建设工作。', 'NEXUS Life coordonne des projets modulaires au Canada pour camps de travailleurs, kiosques commerciaux, bâtiments multiunités, opérations éloignées et installations communautaires.'),
  calloutTitle: t('The new-company reality', '关于新公司的现实', 'La réalité d’une jeune entreprise'),
  calloutBody: t(
    'NEXUS Life is a young company built on more than 20 years of Lin Jian’s hands-on experience in modular sourcing, international shipping and Canadian assembly. Our website reflects our current project pipeline—not a decades-old company portfolio. We do not present concepts as completed work or supplier claims as verified facts. Serious buyers are invited to review our process, documents, factory activity and work in progress before deciding whether to move forward.',
    'NEXUS Life 是一家年轻公司，建立在林建先生 20 多年的模块化采购、国际运输及加拿大组装一线经验之上。我们的网站反映的是当前项目管线，而不是一个拥有数十年历史的公司作品集。我们不会把概念当作已完成项目，也不会把供应商声明当作已核验事实。我们欢迎认真的买家在决定是否推进前审查我们的流程、文件、工厂活动及进行中的工作。',
    'NEXUS Life est une jeune entreprise bâtie sur plus de 20 ans d’expérience directe de Lin Jian en approvisionnement modulaire, transport international et assemblage au Canada. Le site reflète notre pipeline actuel, pas le portefeuille d’une entreprise vieille de plusieurs décennies. Nous ne présentons pas des concepts comme des réalisations ni des affirmations fournisseurs comme des faits vérifiés. Les acheteurs sérieux sont invités à examiner notre processus, nos documents, l’activité d’usine et le travail en cours avant d’avancer.',
  ),
  sections: [
    { title: t('Lin Jian — physical delivery experience', '林建 — 实体交付经验', 'Lin Jian — expérience de livraison physique'), body: t('Lin focuses on supplier capability, drawings, materials, packing, loading, shipping, assembly and site conditions.', '林建重点关注供应商能力、图纸、材料、包装、装载、运输、组装及场地条件。', 'Lin se concentre sur la capacité du fournisseur, les plans, les matériaux, l’emballage, le transport, l’assemblage et le site.'), points: [item('20+ years of hands-on modular sourcing and logistics experience', '20 多年模块化采购及物流一线经验', 'Plus de 20 ans d’expérience directe'), item('Canadian assembly and site-execution experience', '加拿大组装及现场执行经验', 'Expérience d’assemblage et d’exécution au Canada')] },
    { title: t('Satya Sharma — project information and client coordination', 'Satya Sharma — 项目信息及客户协调', 'Satya Sharma — information et coordination client'), body: t('Satya organises project information, tracks decisions, follows up documents and keeps communication clear between the buyer, supplier, project team and site.', 'Satya 负责整理项目信息、跟踪决策、跟进文件，并保持买家、供应商、项目团队及现场之间的清晰沟通。', 'Satya organise l’information, suit les décisions, relance les documents et maintient une communication claire entre l’acheteur, le fournisseur, l’équipe et le site.'), points: [item('Project briefs and responsibility maps', '项目简报及责任图', 'Dossiers et cartes de responsabilités'), item('Document registers and direct client updates', '文件登记及直接客户更新', 'Registres et mises à jour directes')] },
    { title: t('What NEXUS handles', 'NEXUS 负责什么', 'Ce que NEXUS prend en charge'), body: t('We coordinate supplier checks, factory communication, quote comparison, documents, packing, freight, receiving, assembly planning and handover records.', '我们协调供应商核查、工厂沟通、报价比较、文件、包装、运输、收货、组装规划及移交记录。', 'Nous coordonnons les vérifications fournisseurs, les échanges d’usine, les devis, les documents, l’emballage, le fret, la réception, l’assemblage et la remise.'), points: [item('Visible assumptions, exclusions and open questions', '清晰可见的假设、排除项及待决问题', 'Hypothèses, exclusions et questions visibles'), item('Evidence requested before supplier claims are repeated', '在重复供应商声明前索取证据', 'Preuves demandées avant de reprendre les affirmations')] },
    { title: t('What NEXUS does not replace', 'NEXUS 不会取代什么', 'Ce que NEXUS ne remplace pas'), body: t('We do not replace architects, engineers, inspectors, customs professionals, licensed trades, legal advisers or local authorities.', '我们不会取代建筑师、工程师、检查人员、海关专业人士、持牌工种、法律顾问或地方主管部门。', 'Nous ne remplaçons pas les architectes, ingénieurs, inspecteurs, professionnels des douanes, métiers autorisés, conseillers juridiques ou autorités.'), points: [item('Professional responsibility stays with the appointed party', '专业责任由受委任方承担', 'La responsabilité reste à la partie désignée'), item('Project details are published only with permission', '项目详情仅在获得许可后公开', 'Les détails ne sont publiés qu’avec autorisation')] },
  ],
  ctaTitle: t('Review the delivery process before discussing a project.', '在讨论项目之前先审查交付流程。', 'Examinez le processus avant de discuter d’un projet.'),
  ctaLabel: t('See How We Deliver', '查看交付方式', 'Voir notre approche'),
  ctaHref: '/assembly-centre',
}

export const deliveryPageData: InformationPageData = {
  eyebrow: t('HOW WE DELIVER', '交付方式', 'NOTRE APPROCHE'),
  title: t('How a modular project moves from factory to site.', '模块化项目如何从工厂推进到现场。', 'Comment un projet modulaire passe de l’usine au chantier.'),
  intro: t('NEXUS coordinates the information and handoffs between the buyer, supplier, shipping process, Canadian project professionals and site team.', 'NEXUS 协调买家、供应商、运输流程、加拿大项目专业人士及现场团队之间的信息与交接。', 'NEXUS coordonne l’information et les transitions entre l’acheteur, le fournisseur, le transport, les professionnels canadiens et le chantier.'),
  calloutTitle: t('What the Assembly Centre means today', '组装中心目前代表什么', 'Ce que signifie le Centre d’assemblage aujourd’hui'),
  calloutBody: t('The NEXUS Assembly Centre is our Canadian delivery and coordination model. It is not presented as a large owned nationwide facility. The actual receiving location, assembly space, contractors, professionals and responsibilities are confirmed separately for each project.', 'NEXUS 组装中心是我们的加拿大交付及协调模式。我们不会把它描述成自有的大型全国性设施。每个项目都会单独确认实际收货地点、组装空间、承包商、专业人士及责任。', 'Le Centre d’assemblage NEXUS est notre modèle canadien de livraison et de coordination. Il n’est pas présenté comme une grande installation nationale détenue par NEXUS. Le lieu de réception, l’espace d’assemblage, les entrepreneurs, les professionnels et les responsabilités sont confirmés par projet.'),
  sections: [
    ['Project brief','项目简报','Dossier de projet','Define use, users, site, budget, target date and information gaps.','明确用途、使用者、场地、预算、目标日期及信息缺口。','Définir l’usage, les usagers, le site, le budget, la date et les lacunes.'],
    ['Supplier review','供应商审查','Examen du fournisseur','Check the legal company, factory capability, evidence, quality and support plan.','审查合法主体、工厂能力、证据、质量及支持计划。','Vérifier l’entreprise, l’usine, les preuves, la qualité et le soutien.'],
    ['Scope and documents','范围及文件','Portée et documents','Separate included work, exclusions, assumptions, responsibilities and open items.','区分包含工作、排除项、假设、责任及未结事项。','Distinguer travaux inclus, exclusions, hypothèses, responsabilités et points ouverts.'],
    ['Production checks','生产检查','Contrôles de production','Track approved drawings, changes, inspection points, packing, labels and weights.','跟踪批准图纸、变更、检查点、包装、标签及重量。','Suivre les plans approuvés, changements, inspections, emballage, étiquettes et poids.'],
    ['Freight and receiving','运输及收货','Fret et réception','Plan route, border, insurance, receiving, storage and damage records.','规划路线、边境、保险、收货、储存及损坏记录。','Planifier route, frontière, assurance, réception, stockage et dommages.'],
    ['Site and assembly','场地及组装','Site et assemblage','Connect delivery to foundations, utilities, access, lifting, trades and inspections.','把交付与基础、公用设施、通行、吊装、工种及检查连接起来。','Relier la livraison aux fondations, services, accès, levage, métiers et inspections.'],
    ['Handover and support','移交及支持','Remise et soutien','Close with inspection records, manuals, warranties, parts and named open actions.','用检查记录、手册、质保、备件及明确的未结行动完成移交。','Clore avec inspections, manuels, garanties, pièces et actions ouvertes nommées.'],
  ].map(([en,zh,fr,ben,bzh,bfr]) => ({ title:t(en,zh,fr), body:t(ben,bzh,bfr), points:[item('Client, NEXUS, supplier and local responsibilities stay visible','客户、NEXUS、供应商及本地责任保持清晰','Les responsabilités du client, de NEXUS, du fournisseur et des acteurs locaux restent visibles'), item('No stage is treated as complete while critical information is open','关键信息未解决时不把阶段视为完成','Aucune étape n’est considérée terminée si une information critique reste ouverte')] })),
  ctaTitle: t('Start with a useful project brief.', '从一份有用的项目简报开始。', 'Commencez par un dossier de projet utile.'),
  ctaLabel: t('Start a Project', '启动项目', 'Démarrer un projet'),
  ctaHref: '/contact',
}

export const suppliersPageData: InformationPageData = {
  eyebrow: t('SUPPLIER REVIEW', '供应商审查', 'EXAMEN DES FOURNISSEURS'),
  title: t('How we review suppliers before treating a proposal as project-ready.', '在把方案视为适合项目之前，我们如何审查供应商。', 'Comment nous examinons les fournisseurs avant de considérer une proposition prête.'),
  intro: t('A catalogue, certificate title or low factory price is not enough. Buyers need to know which company is contracting, where the product is made, what evidence exists and who remains responsible after delivery.', '产品目录、证书名称或低工厂价格并不够。买家需要知道合同主体、生产地点、现有证据以及交付后谁继续负责。', 'Un catalogue, un titre de certificat ou un faible prix usine ne suffit pas. L’acheteur doit connaître l’entité contractante, le lieu de fabrication, les preuves et les responsabilités après livraison.'),
  calloutTitle: t('Buyer-facing review comes first', '先进行面向买家的审查', 'L’examen destiné à l’acheteur vient d’abord'),
  calloutBody: t('This page explains the checks buyers should expect. A supplier application appears at the end. Submission does not mean approval, preferred status or suitability for a Canadian project.', '本页面先说明买家应期待的审查。供应商申请位于页面末尾。提交申请不代表获批、优先地位或适合加拿大项目。', 'Cette page explique les vérifications attendues. La candidature se trouve à la fin. Une soumission ne signifie ni approbation, ni statut privilégié, ni adéquation à un projet canadien.'),
  sections: [
    ['Legal company and factory identity','合法主体及工厂身份','Identité légale et usine','Confirm who signs, manufactures and exports.','确认谁签署合同、谁制造及谁出口。','Confirmer qui signe, fabrique et exporte.'],
    ['Manufacturing and engineering capability','制造及工程能力','Capacité de fabrication et d’ingénierie','Check production capacity, drawing control and subcontracted work.','审查生产能力、图纸控制及分包工作。','Vérifier la capacité, le contrôle des plans et la sous-traitance.'],
    ['Product file and evidence','产品档案及证据','Dossier produit et preuves','Review current drawings, specifications, reports, scope and limitations.','审查最新图纸、规格、报告、范围及限制。','Examiner plans, spécifications, rapports, portée et limites.'],
    ['Quality and traceability','质量及追溯','Qualité et traçabilité','See how problems are found, recorded, corrected and traced.','了解问题如何被发现、记录、纠正及追溯。','Voir comment les problèmes sont trouvés, consignés, corrigés et tracés.'],
    ['Packing and export readiness','包装及出口准备','Emballage et préparation à l’exportation','Confirm packing, labels, lifting points, dimensions, weights and receiving instructions.','确认包装、标签、吊点、尺寸、重量及收货说明。','Confirmer emballage, étiquettes, levage, dimensions, poids et réception.'],
    ['Warranty and after-sales responsibility','质保及售后责任','Garantie et responsabilité après-vente','Require written warranty scope, spare parts, service contacts and defect responsibility.','要求书面质保范围、备件、服务联系人及缺陷责任。','Exiger une garantie écrite, des pièces, des contacts et une responsabilité claire.'],
  ].map(([en,zh,fr,ben,bzh,bfr]) => ({ title:t(en,zh,fr), body:t(ben,bzh,bfr), points:[item('Evidence must match the actual supplied configuration','证据必须与实际供应配置一致','Les preuves doivent correspondre à la configuration fournie'), item('Received is not the same as reviewed and accepted','已收到不等于已审查及接受','Reçu ne signifie pas examiné et accepté')] })),
  ctaTitle: t('Manufacturers can submit evidence for review.', '制造商可以提交证据供审查。', 'Les fabricants peuvent soumettre leurs preuves.'),
  ctaLabel: t('Apply as a Supplier', '申请成为供应商', 'Devenir fournisseur'),
  ctaHref: '/supplier-application',
}
