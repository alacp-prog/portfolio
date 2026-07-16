import { motion } from 'framer-motion'
import useT from '../hooks/useT'
import { cardClass, eyebrowClass, sectionTitleClass, fadeUp, stagger, circuitHeroBg, placeholderClass } from '../lib/ui'

const PILLARS = [
  {
    icon: '◆',
    fr_title: 'Expertise',
    en_title: 'Expertise',
    fr_d: "Cinq ans à concevoir et livrer des produits digitaux pour des clients exigeants, du MVP à la plateforme à grande échelle.",
    en_d: 'Five years designing and shipping digital products for demanding clients, from MVP to large-scale platform.',
  },
  {
    icon: '✦',
    fr_title: 'Innovation',
    en_title: 'Innovation',
    fr_d: 'Une veille technique et design continue pour proposer les bonnes solutions, pas les plus à la mode.',
    en_d: 'Continuous tech and design watch to propose the right solutions, not just the trendiest ones.',
  },
  {
    icon: '◎',
    fr_title: 'Collaboration',
    en_title: 'Collaboration',
    fr_d: 'Un interlocuteur unique, des points réguliers, et une équipe qui challenge vos idées avec bienveillance.',
    en_d: 'A single point of contact, regular check-ins, and a team that constructively challenges your ideas.',
  },
]

const TEAM = [
  { name: 'Yassine Bennani', fr_role: 'Fondateur & Lead développeur', en_role: 'Founder & Lead Developer' },
  { name: 'Salma Idrissi', fr_role: 'Directrice artistique', en_role: 'Art Director' },
  { name: 'Omar Chraibi', fr_role: 'Développeur mobile', en_role: 'Mobile Developer' },
  { name: 'Lina Fassi', fr_role: 'UX/UI Designer', en_role: 'UX/UI Designer' },
]

const STACK_GROUPS = [
  { fr_title: 'Web', en_title: 'Web', tools: ['React', 'Next.js', 'Vite', 'Tailwind CSS'] },
  { fr_title: 'Mobile', en_title: 'Mobile', tools: ['React Native', 'Flutter', 'Expo', 'Swift'] },
  { fr_title: 'Backend', en_title: 'Backend', tools: ['Node.js', 'Laravel', 'Supabase', 'Firebase'] },
  { fr_title: 'Design', en_title: 'Design', tools: ['Figma', 'Framer', 'Illustrator', 'Photoshop'] },
]

const PROCESS = [
  { fr_title: 'Découverte', en_title: 'Discovery', fr_d: 'Immersion dans votre business, vos objectifs et vos utilisateurs.', en_d: 'Immersion in your business, goals and users.' },
  { fr_title: 'Conception', en_title: 'Design', fr_d: 'Wireframes, parcours et direction artistique validés avec vous.', en_d: 'Wireframes, flows and art direction validated with you.' },
  { fr_title: 'Développement', en_title: 'Development', fr_d: "Sprints courts, démonstrations régulières, code propre et testé.", en_d: 'Short sprints, regular demos, clean and tested code.' },
  { fr_title: 'Tests & QA', en_title: 'Testing & QA', fr_d: 'Vérification fonctionnelle, performance et accessibilité avant mise en ligne.', en_d: 'Functional, performance and accessibility checks before launch.' },
  { fr_title: 'Lancement & suivi', en_title: 'Launch & support', fr_d: 'Mise en production et accompagnement post-lancement.', en_d: 'Production release and post-launch support.' },
]

const TESTIMONIALS = [
  {
    fr_quote: "Une équipe qui comprend le business autant que la technique. Livraison en avance sur planning.",
    en_quote: 'A team that understands business as much as tech. Delivered ahead of schedule.',
    name: 'Sara El Amrani',
    fr_role: 'Directrice Marketing, Atlas Immobilier',
    en_role: 'Marketing Director, Atlas Immobilier',
  },
  {
    fr_quote: 'Process clair, communication fluide, et un vrai sens du détail sur le design.',
    en_quote: 'Clear process, smooth communication, and a real eye for design detail.',
    name: 'Karim Ziani',
    fr_role: 'CEO, Karavan',
    en_role: 'CEO, Karavan',
  },
  {
    fr_quote: 'Pix.Ala.Code a transformé notre idée en produit fonctionnel en moins de trois mois.',
    en_quote: 'Pix.Ala.Code turned our idea into a working product in under three months.',
    name: 'Nadia Berrada',
    fr_role: 'Fondatrice, Nespera',
    en_role: 'Founder, Nespera',
  },
]

export default function Studio({ lang }) {
  const t = useT(lang)

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-pac-navy-950 outline-none">
      <section aria-label={t('Le studio', 'The studio')} className="relative overflow-hidden px-8 pb-[80px] pt-[170px] text-center" style={circuitHeroBg}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto flex max-w-[760px] flex-col items-center gap-6"
        >
          <span className={eyebrowClass}>{t('Le studio', 'The studio')}</span>
          <h1 className="m-0 text-balance font-heading text-[clamp(32px,5vw,54px)] font-extrabold leading-[1.15] tracking-[-1px] text-pac-ink">
            {t('Une équipe, deux métiers, un seul objectif', 'One team, two crafts, one goal')}
          </h1>
          <p className="m-0 max-w-[600px] text-[17px] leading-[1.75] text-white/65">
            {t(
              'Pix.Ala.Code réunit designers et développeurs sous un même toit pour livrer des produits digitaux cohérents, du premier croquis au code en production.',
              'Pix.Ala.Code brings designers and developers together under one roof to ship coherent digital products, from first sketch to production code.'
            )}
          </p>
        </motion.div>
      </section>

      {/* Pillars */}
      <section className="px-8 py-[90px]">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto grid max-w-[1240px] grid-cols-3 gap-7 max-[760px]:grid-cols-1"
        >
          {PILLARS.map((p) => (
            <motion.div key={p.fr_title} variants={fadeUp} className={cardClass}>
              <span aria-hidden="true" className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-pac-cyan/12 font-heading text-lg font-extrabold text-pac-cyan-light">
                {p.icon}
              </span>
              <h2 className="m-0 font-heading text-[19px] font-bold text-pac-ink">{t(p.fr_title, p.en_title)}</h2>
              <p className="m-0 text-[14.5px] leading-[1.7] text-white/65">{t(p.fr_d, p.en_d)}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team */}
      <section className="px-8 pb-[90px]">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-[52px] flex flex-col gap-3.5">
            <span className={eyebrowClass}>{t('Équipe', 'Team')}</span>
            <h2 className={sectionTitleClass}>{t('Les gens derrière le code', 'The people behind the code')}</h2>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
          >
            {TEAM.map((member) => (
              <motion.div key={member.name} variants={fadeUp} whileHover={{ y: -6 }} className="flex flex-col overflow-hidden rounded-[18px] border border-white/10 bg-white/5">
                <div className={`h-[220px] ${placeholderClass}`}>{t('Photo — ' + member.name, 'Photo — ' + member.name)}</div>
                <div className="flex flex-col gap-1 p-[20px_22px]">
                  <h3 className="m-0 font-heading text-[16px] font-bold text-pac-ink">{member.name}</h3>
                  <span className="text-[13.5px] text-pac-cyan-light">{t(member.fr_role, member.en_role)}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stack & tools */}
      <section className="px-8 py-[90px]" style={{ background: 'linear-gradient(160deg,#152A57,#0D1730)' }}>
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-[52px] flex flex-col gap-3.5">
            <span className={eyebrowClass}>{t('Stack & outils', 'Stack & tools')}</span>
            <h2 className={sectionTitleClass}>{t('Les technologies que nous maîtrisons', 'The technologies we master')}</h2>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
          >
            {STACK_GROUPS.map((group) => (
              <motion.div key={group.fr_title} variants={fadeUp} className={cardClass}>
                <h3 className="m-0 font-heading text-[15px] font-bold uppercase tracking-[1.5px] text-pac-cyan-light">{t(group.fr_title, group.en_title)}</h3>
                <ul className="m-0 flex flex-col gap-2 p-0">
                  {group.tools.map((tool) => (
                    <li key={tool} className="flex items-center gap-2.5 text-[14px] text-pac-muted">
                      <span aria-hidden="true" className="h-1.5 w-1.5 flex-none rounded-full bg-pac-cyan" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="px-8 py-[90px]">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-[52px] flex flex-col gap-3.5 text-center">
            <span className={eyebrowClass}>{t('Processus', 'Process')}</span>
            <h2 className={sectionTitleClass}>{t('Comment nous travaillons', 'How we work')}</h2>
          </div>
          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="m-0 flex flex-col gap-0 p-0"
          >
            {PROCESS.map((step, i) => (
              <motion.li key={step.fr_title} variants={fadeUp} className="relative flex gap-6 pb-11 pl-0 last:pb-0">
                <div className="relative flex flex-none flex-col items-center">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border-2 border-pac-cyan bg-pac-navy-900 font-heading text-[15px] font-bold text-pac-cyan-light">
                    {i + 1}
                  </span>
                  {i < PROCESS.length - 1 && <span aria-hidden="true" className="w-px flex-1 bg-white/15" />}
                </div>
                <div className="pt-1.5">
                  <h3 className="m-0 font-heading text-[18px] font-bold text-pac-ink">{t(step.fr_title, step.en_title)}</h3>
                  <p className="m-0 mt-1.5 text-[14.5px] leading-[1.7] text-white/65">{t(step.fr_d, step.en_d)}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-8 pb-[110px]">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-[52px] flex flex-col gap-3.5 text-center">
            <span className={eyebrowClass}>{t('Témoignages', 'Testimonials')}</span>
            <h2 className={sectionTitleClass}>{t('Ce que nos clients en disent', 'What our clients say')}</h2>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-3 gap-7 max-[900px]:grid-cols-1"
          >
            {TESTIMONIALS.map((tm) => (
              <motion.figure key={tm.name} variants={fadeUp} className={`${cardClass} justify-between`}>
                <blockquote className="m-0 text-[15px] leading-[1.7] text-pac-ink">&ldquo;{t(tm.fr_quote, tm.en_quote)}&rdquo;</blockquote>
                <figcaption className="flex flex-col gap-0.5">
                  <span className="font-heading text-[14px] font-bold text-pac-ink">{tm.name}</span>
                  <span className="text-[13px] text-white/50">{t(tm.fr_role, tm.en_role)}</span>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
