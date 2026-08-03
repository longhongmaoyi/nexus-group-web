import type { LocalizedText } from '@/lib/i18n'

const t = (en: string, zh: string, fr: string): LocalizedText => ({ en, zh, fr })

export const CONSENT_TEXT_VERSION = '2026-08-03'
export const PRIVACY_NOTICE_VERSION = '2026-08-03'

export const privacyNotice = {
  eyebrow: t('Privacy & Data Use', '隐私与数据使用', 'Confidentialité et utilisation des données'),
  title: t('How NEXUS handles project-enquiry information.', 'NEXUS 如何处理项目咨询信息。', 'Comment NEXUS traite les renseignements liés aux demandes de projet.'),
  intro: t(
    `Effective ${PRIVACY_NOTICE_VERSION}. This notice covers information submitted through the NEXUS website for project, supplier, partner and compliance enquiries.`,
    `生效日期：${PRIVACY_NOTICE_VERSION}。本说明适用于通过 NEXUS 网站提交的项目、供应商、合作伙伴及合规咨询信息。`,
    `En vigueur le ${PRIVACY_NOTICE_VERSION}. Le présent avis couvre les renseignements transmis sur le site NEXUS pour les demandes de projet, de fournisseur, de partenariat et de conformité.`,
  ),
  blocks: [
    {
      title: t('Information and purposes', '信息与用途', 'Renseignements et finalités'),
      body: t(
        'We collect the contact, organization, location and project details you choose to provide, together with limited security metadata. We use them to assess and respond to your enquiry, prepare requested planning material, maintain an audit trail, protect the service and meet applicable legal obligations. We do not use an enquiry submission as consent for unrelated marketing.',
        '我们收集您选择提供的联系人、机构、地点及项目资料，以及有限的安全元数据。我们仅将这些信息用于评估和回复咨询、准备您要求的规划资料、保留审计记录、保护服务及履行适用法律义务。提交咨询不代表您同意接收无关营销信息。',
        'Nous recueillons les coordonnées, les renseignements sur l’organisation, le lieu et le projet que vous choisissez de fournir, ainsi que des métadonnées de sécurité limitées. Nous les utilisons pour évaluer votre demande et y répondre, préparer les documents de planification demandés, conserver une piste d’audit, protéger le service et respecter les obligations légales applicables. Une demande ne vaut pas consentement à du marketing non lié.',
      ),
    },
    {
      title: t('Service providers and international processing', '服务商与跨境处理', 'Fournisseurs et traitement international'),
      body: t(
        'Authorized NEXUS personnel and service providers supporting hosting, database storage, file storage and business email may process the information only for these purposes. Current infrastructure may process or store information outside your province or country, where it can be subject to local law. We do not sell personal information.',
        '经授权的 NEXUS 人员及提供托管、数据库、文件存储和商务邮件服务的供应商，仅可为上述目的处理信息。现有基础设施可能在您所在省份或国家以外处理或存储信息，并可能受当地法律约束。我们不会出售个人信息。',
        'Le personnel autorisé de NEXUS et les fournisseurs qui assurent l’hébergement, la base de données, le stockage de fichiers et le courriel professionnel ne peuvent traiter les renseignements qu’à ces fins. L’infrastructure actuelle peut les traiter ou les stocker hors de votre province ou pays, où ils peuvent être assujettis aux lois locales. Nous ne vendons pas les renseignements personnels.',
      ),
    },
    {
      title: t('Retention', '保留期限', 'Conservation'),
      body: t(
        'Proposed operating rule pending business/legal approval: unsuccessful or inactive enquiries are retained for up to 24 months after the last meaningful activity, then securely deleted or anonymized unless a longer period is required for a dispute, security investigation or legal obligation. Records connected to a quotation, contract or completed transaction may be kept for up to 7 years after the relationship ends where needed for tax, accounting, warranty, insurance or legal records. Backups expire on their normal protected cycle.',
        '拟议运营规则（有待业务及法律批准）：未成功或无后续活动的咨询，在最后一次实质活动后最多保留 24 个月，随后安全删除或匿名化；如争议、安全调查或法律义务要求更长时间，则除外。与报价、合同或已完成交易相关的记录，如税务、会计、质保、保险或法律记录所需，可在关系结束后最多保留 7 年。备份按其正常受保护周期到期。',
        'Règle opérationnelle proposée, sous réserve d’approbation commerciale et juridique : les demandes infructueuses ou inactives sont conservées jusqu’à 24 mois après la dernière activité significative, puis supprimées de façon sécuritaire ou anonymisées, sauf si un litige, une enquête de sécurité ou une obligation légale exige une période plus longue. Les dossiers liés à un devis, un contrat ou une transaction achevée peuvent être conservés jusqu’à 7 ans après la fin de la relation lorsque les exigences fiscales, comptables, de garantie, d’assurance ou juridiques le justifient. Les sauvegardes expirent selon leur cycle protégé normal.',
      ),
    },
    {
      title: t('Choices, access and questions', '选择、访问与咨询', 'Choix, accès et questions'),
      body: t(
        'You may ask about, access or correct your personal information, or withdraw consent for optional future use, subject to legal and contractual limits. Withdrawal does not affect processing already lawfully completed and may prevent us from continuing the enquiry. Contact satya@nexuslife.ca. We may verify identity before acting on a request.',
        '在法律及合同限制范围内，您可以查询、访问或更正个人信息，或撤回对未来可选用途的同意。撤回不影响此前依法完成的处理，并可能使我们无法继续处理该咨询。请联系 satya@nexuslife.ca。我们可能会在处理请求前核实身份。',
        'Vous pouvez demander des renseignements, accéder à vos renseignements personnels ou les corriger, ou retirer votre consentement à une utilisation future facultative, sous réserve des limites légales et contractuelles. Le retrait ne touche pas les traitements déjà effectués légalement et peut nous empêcher de poursuivre la demande. Écrivez à satya@nexuslife.ca. Nous pouvons vérifier votre identité avant de donner suite.',
      ),
    },
  ],
} as const

export const consentCopy = t(
  `I consent to NEXUS collecting, storing and using the information I submit to assess and respond to this enquiry, as described in the Privacy Notice (version ${CONSENT_TEXT_VERSION}). I understand that this does not subscribe me to unrelated marketing.`,
  `我同意 NEXUS 按《隐私说明》（版本 ${CONSENT_TEXT_VERSION}）收集、存储和使用我提交的信息，以评估并回复本次咨询。我理解这不会使我订阅无关营销信息。`,
  `Je consens à ce que NEXUS recueille, conserve et utilise les renseignements transmis afin d’évaluer cette demande et d’y répondre, conformément à l’Avis de confidentialité (version ${CONSENT_TEXT_VERSION}). Je comprends que cela ne m’abonne pas à du marketing non lié.`,
)

export const planningDisclaimer = t(
  'Planning estimate only—not a quotation, offer, professional opinion, tax/customs advice, permit, certification or approval. Percentages are editable budgeting allowances, not verified rates. Duties and taxes depend on tariff classification, origin, value for duty, importer status and destination. Engineering and compliance allowances do not replace project-specific work by qualified professionals or decisions by authorities. Only a separate written quotation issued by an authorized NEXUS representative can state a price, scope, exclusions, taxes, validity period and acceptance terms.',
  '仅供规划估算——不构成报价、要约、专业意见、税务或海关建议、许可、认证或批准。百分比是可编辑的预算预留，并非经核实的适用税率。关税和税费取决于税则归类、原产地、完税价格、进口商身份及目的地。工程与合规预留不能替代合格专业人士针对具体项目的工作或主管机构的决定。只有由 NEXUS 授权代表另行出具的书面报价，方可载明价格、范围、排除项、税费、有效期及接受条款。',
  'Estimation de planification seulement — ni devis, offre, avis professionnel, conseil fiscal ou douanier, permis, certification ou approbation. Les pourcentages sont des provisions budgétaires modifiables, et non des taux vérifiés. Les droits et taxes dépendent du classement tarifaire, de l’origine, de la valeur en douane, du statut de l’importateur et de la destination. Les provisions d’ingénierie et de conformité ne remplacent pas le travail propre au projet de professionnels qualifiés ni les décisions des autorités. Seul un devis écrit distinct émis par un représentant NEXUS autorisé peut préciser le prix, la portée, les exclusions, les taxes, la période de validité et les modalités d’acceptation.',
)
