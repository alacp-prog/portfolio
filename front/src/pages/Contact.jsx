import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MessagesSquare } from 'lucide-react'
import useT from '../hooks/useT'
import { eyebrowClass, circuitHeroBg, pulseAnim } from '../lib/ui'
import { submitContact } from '../services/api'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const PROJECT_TYPES = [
  { value: 'web', fr: 'Site web', en: 'Website' },
  { value: 'ecommerce', fr: 'E-commerce', en: 'E-commerce' },
  { value: 'mobile', fr: 'Application mobile', en: 'Mobile app' },
  { value: 'branding', fr: 'Branding / identité', en: 'Branding / identity' },
  { value: 'autre', fr: 'Autre', en: 'Other' },
]

const BUDGETS = [
  { value: '<2k', fr: '< 2 000 €', en: '< €2,000' },
  { value: '2-5k', fr: '2 000 – 5 000 €', en: '€2,000 – 5,000' },
  { value: '5-15k', fr: '5 000 – 15 000 €', en: '€5,000 – 15,000' },
  { value: '>15k', fr: '> 15 000 €', en: '> €15,000' },
  { value: 'unsure', fr: 'Je ne sais pas encore', en: 'Not sure yet' },
]

const inputClass =
  'rounded-xl border-[1.5px] border-white/18 bg-white/6 px-4 py-3.5 text-[14.5px] text-pac-ink outline-none placeholder:text-white/35 focus-visible:border-pac-cyan focus-visible:bg-white/5'
const labelClass = 'font-heading text-[13px] font-semibold text-pac-ink'
const errorClass = 'text-[12.5px] font-semibold text-[#E0455A]'

function Field({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error && (
        <span id={`${id}-error`} className={errorClass} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

function fadeInUp(reduce, delay = 0) {
  return {
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10%' },
    transition: { duration: 0.5, ease: 'easeOut', delay },
  }
}

function formContainerVariants(reduce) {
  return {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  }
}

function fieldRowVariants(reduce) {
  return {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  }
}

export default function Contact({ lang }) {
  const t = useT(lang)
  const reduce = useReducedMotion()
  const [form, setForm] = useState({ name: '', email: '', projectType: 'web', budget: '<2k', message: '' })
  const [errors, setErrors] = useState({ name: false, email: false, message: false })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serverErrors, setServerErrors] = useState([])

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errName = form.name.trim().length < 2
    const errEmail = !EMAIL_RE.test(form.email.trim())
    const errMsg = form.message.trim().length < 20
    if (errName || errEmail || errMsg) {
      setErrors({ name: errName, email: errEmail, message: errMsg })
      return
    }
    setErrors({ name: false, email: false, message: false })
    setServerErrors([])
    setSubmitting(true)

    const projectTypeLabel = PROJECT_TYPES.find((opt) => opt.value === form.projectType)
    const budgetLabel = BUDGETS.find((opt) => opt.value === form.budget)
    const context = [projectTypeLabel && t(projectTypeLabel.fr, projectTypeLabel.en), budgetLabel && t(budgetLabel.fr, budgetLabel.en)]
      .filter(Boolean)
      .join(' · ')

    try {
      await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        message: context ? `[${context}] ${form.message.trim()}` : form.message.trim(),
      })
      setSent(true)
    } catch (error) {
      setServerErrors(error.errors ?? [error.message])
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setForm({ name: '', email: '', projectType: 'web', budget: '<2k', message: '' })
    setErrors({ name: false, email: false, message: false })
    setServerErrors([])
    setSent(false)
  }

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-pac-navy-950 outline-none">
      <section aria-label={t('Contact', 'Contact')} className="relative overflow-hidden px-8 pb-[50px] pt-[170px]" style={circuitHeroBg}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto flex max-w-[1240px] flex-col gap-[18px]"
        >
          <span className={eyebrowClass}>{t('Contact', 'Contact')}</span>
          <h1 className="m-0 flex items-center gap-4 font-heading text-[clamp(32px,5vw,54px)] font-extrabold leading-[1.15] tracking-[-1px] text-pac-ink">
            <MessagesSquare aria-hidden="true" className="h-[clamp(28px,4.2vw,46px)] w-[clamp(28px,4.2vw,46px)] shrink-0 text-pac-cyan" strokeWidth={2} />
            {t('Parlons de votre projet', "Let's talk about your project")}
          </h1>
          <p className="m-0 max-w-[600px] text-[18px] leading-[1.7] text-white/65">
            {t(
              'Décrivez-nous votre idée — nous revenons vers vous sous 48h avec une première recommandation et une estimation.',
              "Tell us about your idea — we'll reply within 48h with a first recommendation and estimate."
            )}
          </p>
        </motion.div>
      </section>

      <section className="px-8 pb-[110px] pt-[30px]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-[1.3fr_0.7fr] items-start gap-10 max-[900px]:grid-cols-1">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-12 max-[560px]:p-7">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  role="status"
                  aria-live="polite"
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? {} : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="flex flex-col items-center gap-5 px-5 py-10 text-center"
                >
                  <motion.span
                    aria-hidden="true"
                    initial={reduce ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                    className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-pac-cyan/15 font-heading text-[30px] font-extrabold text-pac-cyan-light"
                  >
                    ✓
                  </motion.span>
                  <h2 className="m-0 font-heading text-[30px] font-bold text-pac-ink">{t('Message envoyé !', 'Message sent!')}</h2>
                  <p className="m-0 max-w-[420px] text-[16px] leading-[1.7] text-white/65">
                    {t(
                      "Merci pour votre confiance. Notre équipe vous répondra sous 48h à l'adresse indiquée.",
                      'Thank you. Our team will get back to you within 48h at the address provided.'
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-full border-2 border-white/25 px-7 py-3.5 font-heading text-[14px] font-bold text-pac-ink transition-colors hover:border-pac-cyan"
                  >
                    {t('Envoyer un autre message', 'Send another message')}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={handleSubmit}
                  variants={formContainerVariants(reduce)}
                  initial="hidden"
                  animate="show"
                  exit={reduce ? {} : { opacity: 0 }}
                  className="flex flex-col gap-6"
                >
                  {serverErrors.length > 0 && (
                    <div role="alert" className="rounded-xl border border-[#E0455A]/30 bg-[#E0455A]/10 px-4 py-3 text-[13.5px] text-[#E0455A]">
                      {serverErrors.map((err) => (
                        <div key={err}>{err}</div>
                      ))}
                    </div>
                  )}
                  <motion.div variants={fieldRowVariants(reduce)} className="grid grid-cols-2 gap-5 max-[560px]:grid-cols-1">
                    <Field id="name" label={t('Nom complet *', 'Full name *')} error={errors.name && t('Veuillez indiquer votre nom.', 'Please enter your name.')}>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={update('name')}
                        placeholder={t('Jean Dupont', 'Jean Dupont')}
                        aria-invalid={errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        autoComplete="name"
                        className={inputClass}
                      />
                    </Field>
                    <Field id="email" label="Email *" error={errors.email && t('Adresse email invalide.', 'Invalid email address.')}>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={update('email')}
                        placeholder={t('jean@entreprise.com', 'jean@company.com')}
                        aria-invalid={errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        autoComplete="email"
                        className={inputClass}
                      />
                    </Field>
                  </motion.div>

                  <motion.div variants={fieldRowVariants(reduce)} className="grid grid-cols-2 gap-5 max-[560px]:grid-cols-1">
                    <Field id="projectType" label={t('Type de projet', 'Project type')}>
                      <select id="projectType" value={form.projectType} onChange={update('projectType')} className={`${inputClass} cursor-pointer`}>
                        {PROJECT_TYPES.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {t(opt.fr, opt.en)}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field id="budget" label="Budget">
                      <select id="budget" value={form.budget} onChange={update('budget')} className={`${inputClass} cursor-pointer`}>
                        {BUDGETS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {t(opt.fr, opt.en)}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </motion.div>

                  <motion.div variants={fieldRowVariants(reduce)}>
                    <Field id="message" label="Message *" error={errors.message && t('Dites-nous en un peu plus (20 caractères min.).', 'Tell us a bit more (min. 20 characters).')}>
                      <textarea
                        id="message"
                        value={form.message}
                        onChange={update('message')}
                        rows={6}
                        placeholder={t('Décrivez votre projet, vos objectifs, vos délais…', 'Describe your project, goals and timeline…')}
                        aria-invalid={errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={`${inputClass} resize-y`}
                      />
                    </Field>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    variants={fieldRowVariants(reduce)}
                    whileHover={submitting ? undefined : { y: -3 }}
                    whileTap={submitting ? undefined : { y: 0 }}
                    className="w-fit self-start rounded-full bg-gradient-to-br from-pac-cyan to-pac-blue px-9 py-4 font-heading text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(0,192,255,0.35)] transition-shadow hover:shadow-[0_14px_32px_rgba(0,192,255,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? t('Envoi en cours…', 'Sending…') : t('Envoyer ma demande', 'Send my request')}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-6">
            <motion.div
              {...fadeInUp(reduce)}
              className="relative flex flex-col gap-6 overflow-hidden rounded-[24px] p-[40px_36px]"
              style={{ background: 'linear-gradient(160deg,#152A57,#0D1730)' }}
            >
              <motion.span aria-hidden="true" {...pulseAnim(3)} className="absolute right-[26px] top-[22px] h-3 w-3 rounded-full bg-pac-cyan" />
              <h2 className="m-0 font-heading text-[22px] font-bold text-white">{t('Coordonnées', 'Contact details')}</h2>

              <div className="flex flex-col gap-1.5">
                <span className="font-heading text-xs font-semibold uppercase tracking-[1.5px] text-pac-cyan">Email</span>
                <a href="mailto:hello@pixalacode.com" className="text-[15px] text-white transition-colors hover:text-pac-cyan">
                  hello@pixalacode.com
                </a>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-heading text-xs font-semibold uppercase tracking-[1.5px] text-pac-cyan">{t('Téléphone', 'Phone')}</span>
                <span className="text-[15px] text-white">+212 6 61 23 45 67</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-heading text-xs font-semibold uppercase tracking-[1.5px] text-pac-cyan">{t('Adresse', 'Address')}</span>
                <span className="text-[15px] leading-[1.6] text-white">
                  {t('Casablanca, Maroc', 'Casablanca, Morocco')}
                  <br />
                  {t('Disponibles partout à distance', 'Available remotely worldwide')}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-heading text-xs font-semibold uppercase tracking-[1.5px] text-pac-cyan">{t('Horaires', 'Hours')}</span>
                <span className="text-[15px] text-white">{t('Lun – Ven · 9h à 18h', 'Mon – Fri · 9am to 6pm')}</span>
              </div>
            </motion.div>

            <motion.div {...fadeInUp(reduce, 0.12)} className="flex flex-col gap-2.5 rounded-[24px] border border-white/10 bg-white/5 p-[32px_36px]">
              <span className="font-heading text-[30px]/[0.6] font-extrabold text-pac-cyan">48h</span>
              <p className="m-0 text-[14px] leading-[1.7] text-white/65">
                {t(
                  'Délai moyen de première réponse. Un devis détaillé suit sous une semaine.',
                  'Average first-response time. A detailed quote follows within a week.'
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
