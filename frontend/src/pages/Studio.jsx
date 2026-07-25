import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Smile } from 'lucide-react'
import logoIcon from '../assets/pac/logo-white.png'
import useT from '../hooks/useT'
import Seo from '../components/Seo'
import { breadcrumbJsonLd } from '../lib/seo'
import { eyebrowClass, sectionTitleClass, fadeUp, stagger, floatAnim, pulseAnim, circuitHeroBg } from '../lib/ui'

const MotionLink = motion.create(Link)

const VALUES = [
  {
    icon: '✓',
    fr_title: 'Qualité',
    en_title: 'Quality',
    fr_d: 'Des solutions robustes, maintenables et performantes.',
    en_d: 'Robust, maintainable and high-performing solutions.',
  },
  {
    icon: '↗',
    fr_title: 'Innovation',
    en_title: 'Innovation',
    fr_d: 'Meilleures pratiques et technologies modernes, durables.',
    en_d: 'Best practices and modern, lasting technologies.',
  },
  {
    icon: '⇄',
    fr_title: 'Collaboration',
    en_title: 'Collaboration',
    fr_d: 'Chaque projet est construit en partenariat avec le client.',
    en_d: 'Every project is built in partnership with the client.',
  },
  {
    icon: '◐',
    fr_title: 'Transparence',
    en_title: 'Transparency',
    fr_d: 'Communication claire et suivi régulier tout au long du projet.',
    en_d: 'Clear communication and regular follow-up throughout.',
  },
]

const DELIVERABLES = [
  { fr: 'Sites web modernes', en: 'Modern websites' },
  { fr: 'Applications web sur mesure', en: 'Custom web applications' },
  { fr: 'Applications mobiles iOS & Android', en: 'iOS & Android mobile apps' },
  { fr: 'Interfaces UI/UX', en: 'UI/UX interfaces' },
  { fr: 'Tableaux de bord & espaces admin', en: 'Dashboards & admin panels' },
  { fr: 'API & services backend', en: 'API & backend services' },
  { fr: 'Maintenance & évolution', en: 'Maintenance & growth' },
]

const REASONS = [
  { fr: 'Une approche centrée sur vos objectifs', en: 'An approach centered on your goals' },
  { fr: 'Des solutions sur mesure adaptées à votre activité', en: 'Custom solutions tailored to your business' },
  { fr: 'Un code propre, sécurisé et évolutif', en: 'Clean, secure and scalable code' },
  { fr: 'Une expérience utilisateur soignée', en: 'A carefully crafted user experience' },
  {
    fr: 'Un accompagnement avant, pendant et après la mise en production',
    en: 'Support before, during and after launch',
  },
]

const PROCESS = [
  {
    fr_title: 'Découverte',
    en_title: 'Discovery',
    fr_d: 'Atelier de cadrage : objectifs, utilisateurs, contraintes et périmètre.',
    en_d: 'Scoping workshop: goals, users, constraints and scope.',
  },
  {
    fr_title: 'Design',
    en_title: 'Design',
    fr_d: 'Wireframes puis maquettes haute-fidélité, validées ensemble.',
    en_d: 'Wireframes then hi-fi mockups, validated together.',
  },
  {
    fr_title: 'Développement',
    en_title: 'Development',
    fr_d: 'Sprints courts avec démos régulières. Vous voyez le produit avancer.',
    en_d: 'Short sprints with regular demos. You watch the product grow.',
  },
  {
    fr_title: 'Tests & lancement',
    en_title: 'Testing & launch',
    fr_d: 'QA complète, optimisation des performances et mise en production.',
    en_d: 'Full QA, performance tuning and production release.',
  },
  {
    fr_title: 'Suivi',
    en_title: 'Support',
    fr_d: 'Maintenance, mesure des résultats et évolutions continues.',
    en_d: 'Maintenance, results tracking and continuous evolution.',
  },
]

export default function Studio({ lang }) {
  const t = useT(lang)

  return (
    <>
      <Seo
        lang={lang}
        title={t('Le Studio', 'Studio')}
        description={t(
          'Découvrez Pix.Ala.Code : notre mission, nos valeurs, ce que nous réalisons et notre méthode de travail, du concept au produit livré.',
          'Meet Pix.Ala.Code: our mission, our values, what we build and how we work, from concept to delivered product.'
        )}
        path="/studio"
        jsonLd={breadcrumbJsonLd([
          { name: t('Accueil', 'Home'), path: '/' },
          { name: t('Le Studio', 'Studio'), path: '/studio' },
        ])}
      />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-pac-navy-950 outline-none">
        {/* Hero */}
        <section aria-label={t('À propos de Pix.Ala.Code', 'About Pix.Ala.Code')} className="relative overflow-hidden px-8 pb-[90px] pt-[170px]" style={circuitHeroBg}>
          <motion.span aria-hidden="true" {...pulseAnim(3)} className="absolute right-[10%] top-[110px] h-3.5 w-3.5 rounded-full bg-pac-cyan" />
          <motion.span aria-hidden="true" {...floatAnim} transition={{ ...floatAnim.transition, duration: 6 }} className="absolute bottom-[60px] left-[8%] h-5 w-5 rounded-full bg-pac-cyan opacity-35" />

          <div className="relative mx-auto grid max-w-[1240px] grid-cols-[1.2fr_0.8fr] items-center gap-[60px] max-[900px]:grid-cols-1">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex flex-col gap-5"
            >
              <span className={eyebrowClass}>{t('À propos de Pix.Ala.Code', 'About Pix.Ala.Code')}</span>
              <h1 className="m-0 text-balance font-heading text-[clamp(32px,5vw,50px)] font-extrabold leading-[1.18] tracking-[-1px] text-pac-ink">
                {t('Des solutions numériques pour faire grandir votre entreprise.', 'Digital solutions to grow your business.')}
              </h1>
              <p className="m-0 max-w-[600px] text-[18px] leading-[1.75] text-white/65">
                {t(
                  'Nous concevons et développons des solutions numériques modernes qui aident entreprises, entrepreneurs et startups à transformer leurs idées en produits performants — simples, rapides, évolutifs.',
                  'We design and build modern digital solutions that help businesses, entrepreneurs and startups turn ideas into high-performing products — simple, fast and built to scale.'
                )}
              </p>
              <MotionLink
                to="/contact"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="mt-1.5 w-fit whitespace-nowrap rounded-full bg-gradient-to-br from-pac-cyan to-pac-blue px-[30px] py-[15px] font-heading text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(0,192,255,0.3)] transition-shadow hover:shadow-[0_14px_32px_rgba(0,192,255,0.4)]"
              >
                {t("Donnons vie à votre projet →", "Let's bring your project to life →")}
              </MotionLink>
            </motion.div>
            <div className="flex justify-center max-[900px]:hidden">
              <motion.img
                {...floatAnim}
                src={logoIcon}
                alt="Pix.Ala.Code"
                className="w-[240px]"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.45))' }}
              />
            </div>
          </div>
        </section>

        {/* Mission & vision */}
        <section className="px-8 py-[90px]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto grid max-w-[1240px] grid-cols-2 items-start gap-[60px] max-[860px]:grid-cols-1"
          >
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <span className={eyebrowClass}>{t('Notre mission', 'Our mission')}</span>
              <h2 className="m-0 font-heading text-[30px] font-bold leading-[1.3] text-pac-ink">{t('Rendre la technologie accessible', 'Making technology accessible')}</h2>
              <p className="m-0 text-[15.5px] leading-[1.8] text-white/65">
                {t(
                  "Notre mission est de rendre la technologie accessible en développant des sites web, des applications mobiles et des interfaces modernes qui apportent une réelle valeur aux utilisateurs et contribuent à la croissance des entreprises.",
                  'Our mission is to make technology accessible by building websites, mobile apps and modern interfaces that bring real value to users and drive business growth.'
                )}
              </p>
              <p className="m-0 text-[15.5px] leading-[1.8] text-white/65">
                {t(
                  "Nous accordons une attention particulière à la qualité du code, à l'expérience utilisateur et aux performances afin de livrer des solutions durables.",
                  'We pay close attention to code quality, user experience and performance to deliver solutions built to last.'
                )}
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <span className={eyebrowClass}>{t('Notre vision', 'Our vision')}</span>
              <h2 className="m-0 font-heading text-[30px] font-bold leading-[1.3] text-pac-ink">{t('Un partenaire de confiance', 'A trusted partner')}</h2>
              <p className="m-0 text-[15.5px] leading-[1.8] text-white/65">
                {t(
                  'Nous souhaitons devenir un partenaire de confiance pour les entreprises qui souhaitent accélérer leur transformation numérique.',
                  'We aim to become a trusted partner for businesses looking to accelerate their digital transformation.'
                )}
              </p>
              <p className="m-0 text-[15.5px] leading-[1.8] text-white/65">
                {t(
                  "À travers chaque projet, nous cherchons à allier innovation, design et excellence technique pour créer des produits capables d'évoluer avec vos besoins.",
                  'In every project, we combine innovation, design and technical excellence to build products that grow with your needs.'
                )}
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Values */}
        <section className="px-8 pb-[90px]">
          <div className="mx-auto max-w-[1240px] rounded-[28px] p-[70px_60px] max-[560px]:p-[50px_28px]" style={{ background: 'linear-gradient(160deg,#152A57,#0D1730)' }}>
            <div className="mb-11 flex flex-col gap-3.5">
              <span className={eyebrowClass}>{t('Nos valeurs', 'Our values')}</span>
              <h2 className={sectionTitleClass}>{t('Ce qui guide notre travail', 'What drives our work')}</h2>
            </div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-4 gap-[22px] max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
            >
              {VALUES.map((v) => (
                <motion.div key={v.fr_title} variants={fadeUp} className="flex flex-col gap-3 rounded-[18px] border border-white/10 bg-white/5 p-[30px_26px]">
                  <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-xl bg-pac-cyan/14 text-[19px]">
                    {v.icon}
                  </span>
                  <h3 className="m-0 font-heading text-[17px] font-bold text-pac-ink">{t(v.fr_title, v.en_title)}</h3>
                  <p className="m-0 text-[13.5px] leading-[1.7] text-white/60">{t(v.fr_d, v.en_d)}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* What we build */}
        <section className="px-8 pb-[90px]">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-11 flex flex-col gap-3.5">
              <span className={eyebrowClass}>{t('Ce que nous réalisons', 'What we build')}</span>
              <h2 className={sectionTitleClass}>{t('Du concept au produit livré', 'From concept to delivered product')}</h2>
            </div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
            >
              {DELIVERABLES.map((d, i) => (
                <motion.div key={d.fr} variants={fadeUp} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-[22px_20px]">
                  <span className="font-heading text-[17px] font-extrabold text-pac-cyan-light">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-heading text-[14.5px] font-semibold text-pac-ink">{t(d.fr, d.en)}</span>
                </motion.div>
              ))}
              <motion.div variants={fadeUp}>
                <Link
                  to="/services"
                  className="flex h-full flex-col justify-center gap-1 rounded-2xl bg-gradient-to-br from-pac-cyan to-pac-blue p-[22px_20px] text-white"
                >
                  <span className="font-heading text-[14.5px] font-bold">{t('Voir tous nos services', 'See all services')}</span>
                  <span className="text-[13px] opacity-85">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="px-8 pb-[90px]">
          <div className="mx-auto max-w-[1240px] rounded-[28px] p-[70px_60px] max-[560px]:p-[50px_28px]" style={{ background: 'linear-gradient(160deg,#152A57,#0D1730)' }}>
            <div className="mb-11 flex flex-col gap-3.5">
              <span className="font-heading text-[13px] font-bold uppercase tracking-[2px] text-pac-cyan">{t('Pourquoi nous choisir', 'Why choose us')}</span>
              <h2 className="m-0 font-heading text-[clamp(26px,3.6vw,38px)] font-bold leading-[1.2] text-pac-ink">
                {t('Pourquoi choisir Pix.Ala.Code ?', 'Why choose Pix.Ala.Code?')}
              </h2>
            </div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-2 gap-x-10 gap-y-5 max-[760px]:grid-cols-1"
            >
              {REASONS.map((r) => (
                <motion.div key={r.fr} variants={fadeUp} className="flex items-start gap-3.5">
                  <span aria-hidden="true" className="flex-none text-[17px] font-bold text-pac-cyan">✓</span>
                  <span className="text-[15px] leading-[1.6] text-[#DCE3F0]">{t(r.fr, r.en)}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process */}
        <section className="px-8 pb-[90px]">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-14 flex flex-col gap-3.5">
              <span className="font-heading text-[13px] font-bold uppercase tracking-[2px] text-pac-cyan">{t('Notre processus', 'Our process')}</span>
              <h2 className="m-0 font-heading text-[clamp(28px,4vw,42px)] font-bold leading-[1.2] text-white">
                {t('Cinq étapes, zéro surprise', 'Five steps, zero surprises')}
              </h2>
            </div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-5 gap-7 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
            >
              {PROCESS.map((step, i) => (
                <motion.div key={step.fr_title} variants={fadeUp} className="flex flex-col gap-3.5">
                  <span className="font-heading text-[40px] font-extrabold text-pac-cyan">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="m-0 font-heading text-[17px] font-bold text-white">{t(step.fr_title, step.en_title)}</h3>
                  <p className="m-0 text-[13.5px] leading-[1.7] text-[#B7C0D4]">{t(step.fr_d, step.en_d)}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-8 pb-[110px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mx-auto flex max-w-[1240px] flex-col items-center gap-4 rounded-[28px] p-[70px_60px] text-center max-[560px]:p-[50px_28px]"
            style={{ background: 'linear-gradient(160deg,#152A57,#0D1730)' }}
          >
            <Smile aria-hidden="true" className="h-16 w-16 text-pac-cyan" strokeWidth={1.25} />
            <span className={eyebrowClass}>{t('Témoignages', 'Testimonials')}</span>
            <p className="m-0 max-w-[640px] text-[17px] leading-[1.75] text-white/65">
              {t(
                'Nous préparons actuellement nos premiers projets clients. Revenez prochainement pour découvrir les témoignages et retours d’expérience de nos partenaires.',
                "We're currently preparing our first client projects. Check back soon to discover testimonials and feedback from our partners."
              )}
            </p>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="px-8 pb-[110px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto flex max-w-[1240px] flex-col items-center gap-6 overflow-hidden rounded-[28px] p-[70px_60px] text-center max-[560px]:p-[50px_28px]"
            style={circuitHeroBg}
          >
            <motion.span aria-hidden="true" {...floatAnim} transition={{ ...floatAnim.transition, duration: 5 }} className="absolute left-9 top-[26px] h-3.5 w-3.5 rounded-full bg-pac-cyan opacity-50" />
            <motion.span aria-hidden="true" {...floatAnim} transition={{ ...floatAnim.transition, duration: 7 }} className="absolute bottom-[34px] right-[60px] h-5 w-5 rounded-full bg-pac-cyan opacity-30" />
            <h2 className="m-0 max-w-[680px] text-balance font-heading text-[clamp(26px,4vw,38px)] font-bold leading-[1.25] text-white">
              {t("Donnons vie à votre prochain projet.", "Let's bring your next project to life.")}
            </h2>
            <p className="m-0 max-w-[540px] text-[16px] leading-[1.7] text-[#B7C0D4]">
              {t(
                'Chaque projet est une collaboration à long terme. Contactez-nous dès aujourd’hui.',
                'Every project is a long-term collaboration. Get in touch today.'
              )}
            </p>
            <MotionLink
              to="/contact"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-pac-cyan px-9 py-4 font-heading text-[15px] font-bold text-pac-navy-950 shadow-[0_0_0_rgba(0,0,0,0)] transition-shadow hover:shadow-[0_14px_32px_rgba(0,192,255,0.4)]"
            >
              {t('Contactez-nous', 'Contact us')}
            </MotionLink>
          </motion.div>
        </section>
      </main>
    </>
  )
}
