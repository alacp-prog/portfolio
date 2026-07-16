import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import logoIcon from '../assets/pac/logo-white.png'
import useT from '../hooks/useT'
import { cardClass, eyebrowClass, sectionTitleClass, fadeUp, stagger, floatAnim, pulseAnim, circuitHeroBg } from '../lib/ui'

const MotionLink = motion.create(Link)

const TECH_STACK = [
  { name: 'React', color: '#00C0FF' },
  { name: 'React Native', color: '#2A6BE8' },
  { name: 'Node.js', color: '#00C0FF' },
  { name: 'Flutter', color: '#2A6BE8' },
  { name: 'Laravel', color: '#00C0FF' },
  { name: 'Shopify', color: '#2A6BE8' },
  { name: 'Figma', color: '#00C0FF' },
  { name: 'Firebase', color: '#2A6BE8' },
  { name: 'Supabase', color: '#00C0FF' },
  { name: 'Tailwind CSS', color: '#2A6BE8' },
]

const STATS = [
  { value: '40+', fr: 'Projets livrés', en: 'Projects delivered' },
  { value: '25', fr: 'Clients accompagnés', en: 'Clients served' },
  { value: '98%', fr: 'Clients satisfaits', en: 'Client satisfaction' },
  { value: '5', fr: "Années d'expérience", en: 'Years of experience' },
]

const SERVICES = [
  { icon: '◐', fr: 'Design UI/UX', en: 'UI/UX Design', fr_d: 'Interfaces élégantes et parcours utilisateurs pensés pour convertir.', en_d: 'Elegant interfaces and user journeys designed to convert.' },
  { icon: '</>', fr: 'Développement web', en: 'Web development', fr_d: 'Sites et plateformes sur mesure, rapides, robustes et évolutifs.', en_d: 'Tailor-made sites and platforms — fast, robust and scalable.' },
  { icon: '▣', fr: 'Applications mobiles', en: 'Mobile apps', fr_d: 'Apps iOS & Android natives ou cross-platform, du concept au store.', en_d: 'Native or cross-platform iOS & Android apps, from concept to store.' },
  { icon: '●●●', fr: 'Branding & identité', en: 'Branding & identity', fr_d: 'Logos, chartes graphiques et identités visuelles mémorables.', en_d: 'Logos, brand guidelines and memorable visual identities.' },
]

const PROJECTS = [
  {
    placeholder_fr: 'Capture — plateforme Atlas Immobilier',
    placeholder_en: 'Screenshot — Atlas Immobilier platform',
    category_fr: 'Plateforme web',
    category_en: 'Web platform',
    name: 'Atlas Immobilier',
    fr: 'Portail immobilier — +120% de leads en 6 mois.',
    en: 'Real-estate portal — +120% leads in 6 months.',
  },
  {
    placeholder_fr: 'Écrans — app Karavan',
    placeholder_en: 'Screens — Karavan app',
    category_fr: 'App mobile',
    category_en: 'Mobile app',
    name: 'Karavan',
    fr: 'App de covoiturage — 15 000 téléchargements au lancement.',
    en: 'Carpooling app — 15,000 downloads at launch.',
  },
  {
    placeholder_fr: 'Boutique — Nespera',
    placeholder_en: 'Store — Nespera',
    category_fr: 'E-commerce',
    category_en: 'E-commerce',
    name: 'Nespera',
    fr: 'Boutique cosmétiques — +85% de ventes la première année.',
    en: 'Cosmetics store — +85% sales in year one.',
  },
]

const DISCIPLINES = [
  {
    key: 'design',
    icon: '◐',
    fr_title: 'Design',
    en_title: 'Design',
    fr_d: "L'expérience et l'identité visuelle pensées avant la première ligne de code.",
    en_d: 'Experience and visual identity, designed before the first line of code.',
    items_fr: ['Recherche & wireframes UX', 'Design systems', 'Prototypes interactifs', "Direction artistique & marque"],
    items_en: ['UX research & wireframes', 'Design systems', 'Interactive prototypes', 'Art direction & branding'],
  },
  {
    key: 'dev',
    icon: '</>',
    fr_title: 'Développement',
    en_title: 'Development',
    fr_d: 'Une exécution technique solide qui transforme le design en produit fiable.',
    en_d: 'Solid technical execution that turns design into a reliable product.',
    items_fr: ['Architecture technique', 'Développement front & back', 'Intégrations & API', 'Tests & déploiement continu'],
    items_en: ['Technical architecture', 'Front & back-end development', 'Integrations & APIs', 'Testing & continuous deployment'],
  },
]

export default function Home({ lang, showStats = true }) {
  const t = useT(lang)

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-pac-navy-950 outline-none">
      {/* Hero */}
      <section
        aria-label={t('Introduction', 'Introduction')}
        className="relative overflow-hidden px-8 pb-[110px] pt-[180px]"
        style={circuitHeroBg}
      >
        <motion.span aria-hidden="true" {...pulseAnim(3)} className="absolute right-[8%] top-[120px] h-3.5 w-3.5 rounded-full bg-pac-cyan" />
        <motion.span aria-hidden="true" {...floatAnim} transition={{ ...floatAnim.transition, duration: 5 }} className="absolute right-[12%] top-[180px] h-[22px] w-[22px] rounded-full bg-pac-cyan opacity-50" />
        <motion.span aria-hidden="true" {...floatAnim} className="absolute bottom-[100px] left-[6%] h-[18px] w-[18px] rounded-full bg-white/5 opacity-15" />
        <motion.span aria-hidden="true" {...pulseAnim(4)} className="absolute left-[3%] top-[40%] h-2.5 w-2.5 rounded-full bg-pac-cyan opacity-40" />

        <div className="mx-auto grid max-w-[1240px] grid-cols-[1.15fr_0.85fr] items-center gap-[60px] max-[900px]:grid-cols-1">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex flex-col gap-7"
          >
            <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-pac-cyan/35 bg-pac-cyan/10 px-[18px] py-2">
              <span className="font-heading text-[13px] font-bold text-pac-cyan-light">&lt;/&gt;</span>
              <span className="font-heading text-[13px] font-semibold text-pac-ink">
                {t('Studio design & développement', 'Design & development studio')}
              </span>
            </div>

            <h1 className="m-0 text-balance font-heading text-[clamp(34px,6vw,62px)] font-extrabold leading-[1.12] tracking-[-1px] text-pac-ink">
              {t('Votre succès numérique, ', 'Your digital success, ')}
              <em className="not-italic text-pac-cyan">{t('notre code', 'our code')}</em>.
            </h1>

            <p className="m-0 max-w-[560px] text-[19px] leading-[1.75] text-white/65">
              {t(
                'Pix.Ala.Code conçoit et développe des produits digitaux sur mesure — sites web, applications et identités de marque qui font grandir votre business.',
                'Pix.Ala.Code designs and builds tailor-made digital products — websites, apps and brand identities that grow your business.'
              )}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <MotionLink
                to="/contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="whitespace-nowrap rounded-full bg-gradient-to-br from-pac-cyan to-pac-blue px-8 py-4 font-heading text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(0,192,255,0.35)]"
              >
                {t('Démarrer un projet', 'Start a project')}
              </MotionLink>
              <MotionLink
                to="/projets"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="whitespace-nowrap rounded-full border-2 border-white/25 px-7 py-4 font-heading text-[15px] font-semibold text-pac-ink"
              >
                {t('Voir nos réalisations →', 'See our work →')}
              </MotionLink>
            </div>
          </motion.div>

          <div className="relative h-[470px] max-[900px]:hidden">
            <div aria-hidden="true" className="absolute left-1/2 top-2.5 h-[440px] w-[440px] -translate-x-1/2 rounded-full" style={{ background: 'radial-gradient(circle,rgba(0,192,255,0.16) 0%,rgba(0,192,255,0) 70%)' }} />
            <div
              aria-hidden="true"
              className="absolute left-11 top-[70px] h-[280px] w-[280px] rounded-full p-[5px] shadow-[0_24px_60px_-14px_rgba(0,192,255,0.45)]"
              style={{ background: 'conic-gradient(from 180deg,#00C0FF,#2A6BE8,#00C0FF)' }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-pac-navy-800">
                <motion.img {...floatAnim} src={logoIcon} alt="" className="block w-[170px]" />
              </div>
            </div>
            <div aria-hidden="true" className="absolute left-80 top-5 w-[200px] rounded-2xl border border-white/12 bg-pac-navy-800/75 p-[16px_18px] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <div className="mb-3 flex gap-[5px]">
                <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
                <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
                <span className="h-2 w-2 rounded-full bg-[#28C840]" />
              </div>
              <div className="mb-2 h-2 w-[82%] rounded bg-pac-cyan opacity-80" />
              <div className="mb-2 h-2 w-[60%] rounded bg-white/25" />
              <div className="mb-2 h-2 w-[72%] rounded bg-pac-blue" />
              <div className="h-2 w-[48%] rounded bg-white/18" />
            </div>
            <div aria-hidden="true" className="absolute left-[352px] top-[230px] w-[180px] rounded-2xl border border-white/12 bg-pac-navy-800/75 p-[16px_18px] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <div className="mb-2.5 font-heading text-[11px] font-bold uppercase tracking-[1.2px] text-pac-cyan-light">
                {t('Parcours UX', 'User flow')}
              </div>
              <div className="mb-[7px] h-[7px] w-full overflow-hidden rounded bg-white/15">
                <div className="h-full w-[72%] bg-gradient-to-r from-pac-cyan to-pac-blue" />
              </div>
              <div className="h-[7px] w-[78%] rounded bg-white/15" />
            </div>
            <div className="absolute left-[70px] top-[390px] flex items-center gap-2.5 rounded-[14px] border border-white/12 bg-pac-navy-800/85 px-[18px] py-3 font-heading text-[13.5px] font-semibold text-white shadow-[0_16px_32px_-14px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <motion.span aria-hidden="true" {...pulseAnim(2.5)} className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              <span>{t('Disponibles pour vos projets', 'Available for work')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tech marquee */}
      <section aria-label={t('Technologies utilisées', 'Technologies we use')} className="overflow-hidden border-y border-white/8 bg-pac-navy-950 py-[26px]">
        <span className="sr-only">{TECH_STACK.map((tech) => tech.name).join(', ')}</span>
        <motion.div
          aria-hidden="true"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="flex w-max"
        >
          {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <div key={i} className="flex items-center gap-2.5 whitespace-nowrap px-[30px] font-heading text-base font-semibold text-white/55">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: tech.color }} />
              {tech.name}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Stats */}
      {showStats && (
        <section className="px-8 py-14" style={{ background: 'linear-gradient(160deg,#152A57,#0D1730)' }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto grid max-w-[1240px] grid-cols-4 gap-10 text-center max-[900px]:grid-cols-2"
          >
            {STATS.map((s) => (
              <motion.div key={s.value} variants={fadeUp} className="flex flex-col gap-1.5">
                <span className="font-heading text-[46px] font-extrabold text-pac-cyan">{s.value}</span>
                <span className="text-sm text-pac-muted">{t(s.fr, s.en)}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Services */}
      <section className="px-8 pb-[60px] pt-[110px]">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-[52px] flex flex-col gap-3.5">
            <span className={eyebrowClass}>{t('Nos services', 'Our services')}</span>
            <h2 className={sectionTitleClass}>{t('Du pixel au code, une seule équipe', 'From pixel to code, one team')}</h2>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
          >
            {SERVICES.map((service) => (
              <motion.div key={service.fr} variants={fadeUp} whileHover={{ y: -6 }} className={cardClass}>
                <span aria-hidden="true" className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-pac-cyan/12 font-heading text-lg font-extrabold text-pac-cyan-light">
                  {service.icon}
                </span>
                <h3 className="m-0 font-heading text-[19px] font-bold text-pac-ink">{t(service.fr, service.en)}</h3>
                <p className="m-0 text-[14.5px] leading-[1.7] text-white/65">{t(service.fr_d, service.en_d)}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-9 text-center">
            <Link to="/services" className="font-heading text-[15px] font-semibold text-pac-cyan-light">
              {t('Tous nos services →', 'All services →')}
            </Link>
          </div>
        </div>
      </section>

      {/* Recent projects */}
      <section className="px-8 pb-[110px] pt-[60px]">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-[52px] flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-3.5">
              <span className={eyebrowClass}>{t('Réalisations', 'Selected work')}</span>
              <h2 className={sectionTitleClass}>{t('Projets récents', 'Recent projects')}</h2>
            </div>
            <Link to="/projets" className="font-heading text-[15px] font-semibold text-pac-cyan-light">
              {t('Tout voir →', 'View all →')}
            </Link>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-3 gap-7 max-[900px]:grid-cols-1"
          >
            {PROJECTS.map((project) => (
              <MotionLink
                key={project.name}
                to="/projets"
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="flex flex-col overflow-hidden rounded-[20px] border border-white/10 bg-white/5 text-pac-ink"
              >
                <div className="flex h-[230px] items-center justify-center bg-white/6 px-6 text-center">
                  <span className="font-heading text-[13px] font-semibold text-white/55">
                    {t(project.placeholder_fr, project.placeholder_en)}
                  </span>
                </div>
                <div className="flex flex-col gap-2 p-[24px_26px]">
                  <span className="font-heading text-xs font-semibold uppercase tracking-[1.5px] text-pac-cyan-light">
                    {t(project.category_fr, project.category_en)}
                  </span>
                  <h3 className="m-0 font-heading text-[21px] font-bold">{project.name}</h3>
                  <p className="m-0 text-sm text-white/65">{t(project.fr, project.en)}</p>
                </div>
              </MotionLink>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Design & dev */}
      <section className="px-8 pb-[110px]" style={{ background: 'linear-gradient(160deg,#152A57,#0D1730)' }}>
        <div className="mx-auto max-w-[1240px] py-[70px]">
          <div className="mx-auto mb-[52px] flex max-w-[640px] flex-col gap-3.5 text-center">
            <span className={eyebrowClass}>{t('Notre approche', 'Our approach')}</span>
            <h2 className={sectionTitleClass}>{t('Design & dev sous un même toit', 'Design & dev, one roof')}</h2>
            <p className="m-0 text-[15.5px] leading-[1.7] text-white/65">
              {t(
                'Pas de passation entre agences : une seule équipe pense le produit de bout en bout, du wireframe au déploiement.',
                'No handoff between agencies: one team owns the product end to end, from wireframe to deployment.'
              )}
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 gap-7 max-[760px]:grid-cols-1"
          >
            {DISCIPLINES.map((d) => (
              <motion.div key={d.key} variants={fadeUp} className={cardClass}>
                <span aria-hidden="true" className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-pac-cyan/12 font-heading text-lg font-extrabold text-pac-cyan-light">
                  {d.icon}
                </span>
                <h3 className="m-0 font-heading text-[21px] font-bold text-pac-ink">{t(d.fr_title, d.en_title)}</h3>
                <p className="m-0 text-[14.5px] leading-[1.7] text-white/65">{t(d.fr_d, d.en_d)}</p>
                <ul className="m-0 flex flex-col gap-2.5 p-0">
                  {(lang === 'en' ? d.items_en : d.items_fr).map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[14px] text-pac-muted">
                      <span aria-hidden="true" className="h-1.5 w-1.5 flex-none rounded-full bg-pac-cyan" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <motion.section
        aria-label={t('Témoignage client', 'Client testimonial')}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="px-8 pb-[110px]"
      >
        <figure className="mx-auto flex max-w-[900px] flex-col gap-6 text-center">
          <span aria-hidden="true" className="font-heading text-[64px]/[0.5] font-extrabold text-pac-cyan">&ldquo;</span>
          <blockquote className="m-0 text-balance font-heading text-[26px]/[1.55] font-medium text-pac-ink">
            {t(
              'Une équipe qui comprend le business autant que la technique. Notre plateforme a été livrée en avance, et le résultat dépasse nos attentes.',
              'A team that understands business as much as tech. Our platform shipped ahead of schedule and exceeded our expectations.'
            )}
          </blockquote>
          <figcaption className="flex flex-col items-center gap-1">
            <span className="font-heading text-[15px] font-bold text-pac-ink">Sara El Amrani</span>
            <span className="text-[13.5px] text-white/50">
              {t('Directrice Marketing, Atlas Immobilier', 'Marketing Director, Atlas Immobilier')}
            </span>
          </figcaption>
        </figure>
      </motion.section>

      {/* CTA */}
      <section className="px-8 pb-[110px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto flex max-w-[1240px] flex-col items-center gap-[26px] overflow-hidden rounded-[28px] p-[80px_60px] text-center"
          style={{ background: 'linear-gradient(160deg,#152A57,#0D1730)' }}
        >
          <motion.span aria-hidden="true" {...floatAnim} transition={{ ...floatAnim.transition, duration: 5 }} className="absolute left-10 top-[30px] h-4 w-4 rounded-full bg-pac-cyan opacity-50" />
          <motion.span aria-hidden="true" {...floatAnim} transition={{ ...floatAnim.transition, duration: 7 }} className="absolute bottom-10 right-[60px] h-6 w-6 rounded-full bg-pac-cyan opacity-30" />
          <motion.span aria-hidden="true" {...pulseAnim(3.5)} className="absolute right-[15%] top-[60px] h-2.5 w-2.5 rounded-full bg-pac-cyan" />
          <h2 className="m-0 max-w-[700px] text-balance font-heading text-[clamp(28px,4.5vw,44px)] font-bold leading-[1.2] text-white">
            {t('Un projet en tête ? Parlons-en.', "Have a project in mind? Let's talk.")}
          </h2>
          <p className="m-0 max-w-[560px] text-[17px] leading-[1.7] text-pac-muted">
            {t(
              'Racontez-nous votre idée — nous revenons vers vous sous 48h avec une première recommandation.',
              "Tell us about your idea — we'll get back to you within 48h with a first recommendation."
            )}
          </p>
          <MotionLink
            to="/contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-gradient-to-br from-pac-cyan to-pac-blue px-9 py-4 font-heading text-[15px] font-bold text-white"
          >
            {t('Démarrer un projet', 'Start a project')}
          </MotionLink>
        </motion.div>
      </section>
    </main>
  )
}
