import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import aboutPortrait from '../assets/about/about-portrait.png'
import useT from '../hooks/useT'
import { eyebrowClass, fadeUp, stagger, circuitHeroBg } from '../lib/ui'
import { getSkills } from '../services/api'

const MotionLink = motion.create(Link)

const PRINCIPLES = [
  {
    n: '01',
    fr_title: 'Design directement dans le code',
    en_title: 'Design in the browser',
    fr_d: 'Les maquettes ont leurs limites — on passe vite au code réel pour tester les décisions face à la réalité.',
    en_d: 'Mockups only get you so far — we move to real code fast so decisions get tested against reality.',
  },
  {
    n: '02',
    fr_title: 'Une équipe, aucune perte à la transmission',
    en_title: 'One team, no handoff gaps',
    fr_d: "Les personnes qui conçoivent votre app sont les mêmes qui la développent — rien ne se perd en chemin.",
    en_d: 'The people who design your app are the same ones who build it — nothing gets lost in translation.',
  },
  {
    n: '03',
    fr_title: 'Un seul code, tous les écrans',
    en_title: 'One codebase, every screen',
    fr_d: 'React et React Native partagent logique et design tokens, pour que web et mobile restent alignés.',
    en_d: 'React and React Native share logic and design tokens, so web and mobile stay in sync.',
  },
]

export default function About({ lang }) {
  const t = useT(lang)
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    getSkills()
      .then((res) => {
        if (!cancelled) setSkills(res.data ?? [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-pac-navy-950 outline-none">
      <section aria-label={t('À propos', 'About')} className="relative overflow-hidden px-8 pb-[80px] pt-[170px]" style={circuitHeroBg}>
        <div className="mx-auto grid max-w-[1240px] grid-cols-[1.1fr_0.9fr] items-center gap-14 max-[860px]:grid-cols-1">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
            <span className={eyebrowClass}>{t('À propos', 'About')}</span>
            <h1 className="m-0 mt-[18px] text-balance font-heading text-[clamp(32px,5vw,50px)] font-extrabold leading-[1.15] tracking-[-1px] text-pac-ink">
              {t('Nous sommes Pix.Ala.Code.', "We're Pix.Ala.Code.")}
            </h1>
            <p className="m-0 mt-6 max-w-[540px] text-[17px] leading-[1.75] text-white/65">
              {t(
                'Un studio spécialisé dans la conception et le développement d\'applications web et mobiles cross-platform — une seule équipe qui gère l\'UX, l\'UI et le code qui les fait vivre.',
                'A studio specialized in designing and developing cross-platform web and mobile applications — one team handling UX, UI, and the code that ships it.'
              )}
            </p>
            <p className="m-0 mt-4 max-w-[540px] text-[17px] leading-[1.75] text-white/65">
              {t(
                'Nous construisons avec React, React Native, Node.js, Firebase et Supabase — pour que votre produit soit à la fois beau et fiable, sur tous les écrans.',
                'We build with React, React Native, Node.js, Firebase and Supabase — so your product looks right and runs right, on every screen.'
              )}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            whileHover={{ scale: 1.03 }}
            className="relative aspect-square rounded-[28px] bg-gradient-to-br from-pac-cyan to-pac-blue p-[5px] shadow-[0_20px_60px_-16px_rgba(0,192,255,0.4)] max-[860px]:hidden"
          >
            <div className="h-full w-full overflow-hidden rounded-[24px] bg-pac-navy-900">
              <img src={aboutPortrait} alt="" className="block h-full w-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-8 py-[90px]">
        <div className="mx-auto max-w-[1240px]">
          <span className={eyebrowClass}>{t('Compétences', 'Skills')}</span>
          <h2 className="m-0 mt-3.5 mb-9 font-heading text-[clamp(28px,4vw,42px)] font-bold leading-[1.2] text-pac-ink">
            {t('Outils & technologies', 'Tools & tech')}
          </h2>

          {loading && (
            <p className="py-6 text-[15px] text-white/50">{t('Chargement des compétences…', 'Loading skills…')}</p>
          )}
          {error && (
            <p className="py-6 text-[15px] text-[#E0455A]">
              {t('Impossible de charger les compétences : ', 'Failed to load skills: ')}
              {error}
            </p>
          )}
          {!loading && !error && skills.length === 0 && (
            <p className="py-6 text-[15px] text-white/50">{t('Aucune compétence listée pour le moment.', 'No skills listed yet.')}</p>
          )}

          {!loading && !error && skills.length > 0 && (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6"
            >
              {skills.map((skill) => (
                <motion.div
                  key={skill.id}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="rounded-[18px] border border-white/10 bg-white/5 p-[22px] transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="m-0 font-heading text-[15.5px] font-bold text-pac-ink">{skill.name}</h3>
                    <span className="text-[12.5px] font-semibold text-white/50">{skill.level ?? 0}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pac-cyan to-pac-blue"
                      style={{ width: `${skill.level ?? 0}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* How we work */}
      <section className="px-8 pb-[90px]" style={{ background: 'linear-gradient(160deg,#152A57,#0D1730)' }}>
        <div className="mx-auto max-w-[1240px] py-[70px]">
          <span className={eyebrowClass}>{t('Notre approche', 'Our approach')}</span>
          <h2 className="m-0 mt-3.5 mb-9 font-heading text-[clamp(28px,4vw,42px)] font-bold leading-[1.2] text-pac-ink">
            {t('Comment nous travaillons', 'How we work')}
          </h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8"
          >
            {PRINCIPLES.map((pr) => (
              <motion.div key={pr.n} variants={fadeUp}>
                <span className="mb-2.5 block bg-gradient-to-br from-pac-cyan to-pac-blue bg-clip-text font-heading text-[34px] font-extrabold text-transparent">
                  {pr.n}
                </span>
                <h3 className="m-0 mb-2 font-heading text-[17px] font-bold text-pac-ink">{t(pr.fr_title, pr.en_title)}</h3>
                <p className="m-0 text-[14.5px] leading-relaxed text-white/60">{t(pr.fr_d, pr.en_d)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-[110px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-[1240px] flex-col items-center gap-[26px] rounded-[28px] p-[80px_60px] text-center"
          style={{ background: 'linear-gradient(160deg,#152A57,#0D1730)' }}
        >
          <h2 className="m-0 max-w-[700px] text-balance font-heading text-[clamp(28px,4.5vw,44px)] font-bold leading-[1.2] text-white">
            {t('Envie de construire ensemble ?', 'Want to build something together?')}
          </h2>
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
