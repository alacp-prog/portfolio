import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MessagesSquare, CircleUser } from 'lucide-react'
import useT from '../hooks/useT'
import Seo from '../components/Seo'
import { breadcrumbJsonLd } from '../lib/seo'
import { eyebrowClass, circuitHeroBg, pulseAnim } from '../lib/ui'
import { getCategories, getServicesByCategory, getSolutionsByService, submitContact } from '../services/api'
import { PhoneIcon, WhatsAppIcon, FacebookIcon, LinkedInIcon, InstagramIcon, GmailIcon } from '../components/BrandIcons'

const CONTACT_CHANNELS = [
  { key: 'phone', fr: 'Téléphone', en: 'Phone', href: 'tel:+212661234567', Icon: PhoneIcon },
  { key: 'whatsapp', fr: 'WhatsApp', en: 'WhatsApp', href: 'https://wa.me/212661234567', Icon: WhatsAppIcon },
  { key: 'facebook', fr: 'Facebook', en: 'Facebook', href: 'https://www.facebook.com/pixalacode', Icon: FacebookIcon },
  { key: 'linkedin', fr: 'LinkedIn', en: 'LinkedIn', href: 'https://www.linkedin.com/company/pixalacode', Icon: LinkedInIcon },
  { key: 'instagram', fr: 'Instagram', en: 'Instagram', href: 'https://www.instagram.com/pixalacode', Icon: InstagramIcon },
  { key: 'gmail', fr: 'Gmail', en: 'Gmail', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=hello@pixalacode.com', Icon: GmailIcon },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[0-9+()\-.\s]{6,20}$/

const inputClass =
  'rounded-xl border-[1.5px] border-white/18 bg-white/6 px-4 py-3.5 text-[14.5px] text-pac-ink outline-none placeholder:text-white/35 focus-visible:border-pac-cyan focus-visible:bg-white/5'
const labelClass = 'font-heading text-[13px] font-semibold text-pac-ink'
const errorClass = 'text-[12.5px] font-semibold text-[#E0455A]'
const hintClass = 'text-[12.5px] text-white/40'

function Field({ id, label, error, hint, children }) {
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
      {!error && hint && <span className={hintClass}>{hint}</span>}
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

const initialForm = {
  name: '',
  email: '',
  phone: '',
  categorySlug: '',
  serviceSlug: '',
  solutionSlugs: [],
  description: '',
}

const initialErrors = { name: false, email: false, phone: false, category: false, service: false, solutions: false }

export default function Contact({ lang }) {
  const t = useT(lang)
  const reduce = useReducedMotion()

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState(initialErrors)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serverErrors, setServerErrors] = useState([])

  const [categories, setCategories] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [categoriesError, setCategoriesError] = useState(null)

  const [services, setServices] = useState([])
  const [loadingServices, setLoadingServices] = useState(false)
  const [servicesError, setServicesError] = useState(null)

  const [solutionsList, setSolutionsList] = useState([])
  const [loadingSolutions, setLoadingSolutions] = useState(false)
  const [solutionsError, setSolutionsError] = useState(null)

  useEffect(() => {
    let cancelled = false
    getCategories()
      .then((res) => {
        if (!cancelled) setCategories(res.data ?? [])
      })
      .catch((err) => {
        if (!cancelled) setCategoriesError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoadingCategories(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!form.categorySlug) {
      setServices([])
      return
    }
    let cancelled = false
    setLoadingServices(true)
    setServicesError(null)
    getServicesByCategory(form.categorySlug)
      .then((res) => {
        if (!cancelled) setServices(res.data ?? [])
      })
      .catch((err) => {
        if (!cancelled) setServicesError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoadingServices(false)
      })
    return () => {
      cancelled = true
    }
  }, [form.categorySlug])

  useEffect(() => {
    if (!form.serviceSlug) {
      setSolutionsList([])
      return
    }
    let cancelled = false
    setLoadingSolutions(true)
    setSolutionsError(null)
    getSolutionsByService(form.serviceSlug)
      .then((res) => {
        if (!cancelled) setSolutionsList(res.data ?? [])
      })
      .catch((err) => {
        if (!cancelled) setSolutionsError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoadingSolutions(false)
      })
    return () => {
      cancelled = true
    }
  }, [form.serviceSlug])

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const updateCategory = (e) => {
    const categorySlug = e.target.value
    setForm((f) => ({ ...f, categorySlug, serviceSlug: '', solutionSlugs: [] }))
  }

  const updateService = (e) => {
    const serviceSlug = e.target.value
    setForm((f) => ({ ...f, serviceSlug, solutionSlugs: [] }))
  }

  const toggleSolution = (slug) => {
    setForm((f) => ({
      ...f,
      solutionSlugs: f.solutionSlugs.includes(slug)
        ? f.solutionSlugs.filter((s) => s !== slug)
        : [...f.solutionSlugs, slug],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errName = form.name.trim().length < 2
    const errEmail = !EMAIL_RE.test(form.email.trim())
    const errPhone = !PHONE_RE.test(form.phone.trim())
    const errCategory = !form.categorySlug
    const errService = !form.serviceSlug
    const errSolutions = form.solutionSlugs.length === 0

    if (errName || errEmail || errPhone || errCategory || errService || errSolutions) {
      setErrors({ name: errName, email: errEmail, phone: errPhone, category: errCategory, service: errService, solutions: errSolutions })
      return
    }
    setErrors(initialErrors)
    setServerErrors([])
    setSubmitting(true)

    const categoryName = categories.find((c) => c.slug === form.categorySlug)?.name ?? form.categorySlug
    const serviceName = services.find((s) => s.slug === form.serviceSlug)?.name ?? form.serviceSlug
    const solutionNames = form.solutionSlugs
      .map((slug) => solutionsList.find((s) => s.solution_slug === slug)?.solution_name)
      .filter(Boolean)

    try {
      await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        category: categoryName,
        service: serviceName,
        solutions: solutionNames,
        description: form.description.trim() || undefined,
      })
      setSent(true)
    } catch (error) {
      setServerErrors(error.errors ?? [error.message])
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setForm(initialForm)
    setErrors(initialErrors)
    setServerErrors([])
    setServices([])
    setSolutionsList([])
    setSent(false)
  }

  return (
    <>
      <Seo
        lang={lang}
        title={t('Contact', 'Contact')}
        description={t(
          'Parlons de votre projet web ou mobile. Contactez Pix.Ala.Code — réponse sous 48h, devis détaillé sous une semaine.',
          "Let's talk about your web or mobile project. Contact Pix.Ala.Code — reply within 48h, detailed quote within a week."
        )}
        path="/contact"
        jsonLd={breadcrumbJsonLd([
          { name: t('Accueil', 'Home'), path: '/' },
          { name: t('Contact', 'Contact'), path: '/contact' },
        ])}
      />
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
                    <Field id="phone" label={t('Téléphone *', 'Phone *')} error={errors.phone && t('Numéro de téléphone invalide.', 'Invalid phone number.')}>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={update('phone')}
                        placeholder={t('+212 6 61 23 45 67', '+212 6 61 23 45 67')}
                        aria-invalid={errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        autoComplete="tel"
                        className={inputClass}
                      />
                    </Field>
                    <Field id="category" label={t('Catégorie *', 'Category *')} error={errors.category && t('Veuillez choisir une catégorie.', 'Please choose a category.')}>
                      <select
                        id="category"
                        value={form.categorySlug}
                        onChange={updateCategory}
                        aria-invalid={errors.category}
                        aria-describedby={errors.category ? 'category-error' : undefined}
                        disabled={loadingCategories}
                        className={`${inputClass} cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`}
                      >
                        <option value="">
                          {loadingCategories
                            ? t('Chargement…', 'Loading…')
                            : t('Sélectionner une catégorie', 'Select a category')}
                        </option>
                        {categories.map((cat) => (
                          <option key={cat.slug} value={cat.slug}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      {categoriesError && (
                        <span className={errorClass}>
                          {t('Impossible de charger les catégories.', 'Failed to load categories.')}
                        </span>
                      )}
                    </Field>
                  </motion.div>

                  <motion.div variants={fieldRowVariants(reduce)}>
                    <Field id="service" label={t('Service *', 'Service *')} error={errors.service && t('Veuillez choisir un service.', 'Please choose a service.')}>
                      <select
                        id="service"
                        value={form.serviceSlug}
                        onChange={updateService}
                        aria-invalid={errors.service}
                        aria-describedby={errors.service ? 'service-error' : undefined}
                        disabled={!form.categorySlug || loadingServices}
                        className={`${inputClass} cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`}
                      >
                        <option value="">
                          {!form.categorySlug
                            ? t('Choisissez d’abord une catégorie', 'Choose a category first')
                            : loadingServices
                              ? t('Chargement…', 'Loading…')
                              : t('Sélectionner un service', 'Select a service')}
                        </option>
                        {services.map((svc) => (
                          <option key={svc.slug} value={svc.slug}>
                            {svc.name}
                          </option>
                        ))}
                      </select>
                      {servicesError && (
                        <span className={errorClass}>
                          {t('Impossible de charger les services.', 'Failed to load services.')}
                        </span>
                      )}
                      {!servicesError && form.categorySlug && !loadingServices && services.length === 0 && (
                        <span className={hintClass}>
                          {t('Aucun service dans cette catégorie pour le moment.', 'No services in this category yet.')}
                        </span>
                      )}
                    </Field>
                  </motion.div>

                  <motion.div variants={fieldRowVariants(reduce)}>
                    <Field
                      id="solutions"
                      label={t('Solutions souhaitées *', 'Solutions you want *')}
                      error={errors.solutions && t('Veuillez choisir au moins une solution.', 'Please choose at least one solution.')}
                    >
                      {!form.serviceSlug && (
                        <span className={hintClass}>{t('Choisissez d’abord un service.', 'Choose a service first.')}</span>
                      )}
                      {form.serviceSlug && loadingSolutions && (
                        <span className={hintClass}>{t('Chargement…', 'Loading…')}</span>
                      )}
                      {solutionsError && <span className={errorClass}>{solutionsError}</span>}
                      {form.serviceSlug && !loadingSolutions && !solutionsError && solutionsList.length === 0 && (
                        <span className={hintClass}>
                          {t('Aucune solution associée pour le moment.', 'No solution linked yet.')}
                        </span>
                      )}
                      {form.serviceSlug && !loadingSolutions && solutionsList.length > 0 && (
                        <div role="group" aria-labelledby="solutions" className="flex flex-wrap gap-2.5">
                          {solutionsList.map((sol) => {
                            const checked = form.solutionSlugs.includes(sol.solution_slug)
                            return (
                              <label
                                key={sol.solution_slug}
                                className={`flex cursor-pointer items-center gap-2 rounded-xl border-[1.5px] px-4 py-2.5 text-[13.5px] transition-colors ${
                                  checked
                                    ? 'border-pac-cyan bg-pac-cyan/10 text-pac-ink'
                                    : 'border-white/18 bg-white/6 text-white/70 hover:border-white/35'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleSolution(sol.solution_slug)}
                                  className="h-3.5 w-3.5 accent-pac-cyan"
                                />
                                {sol.solution_name}
                              </label>
                            )
                          })}
                        </div>
                      )}
                    </Field>
                  </motion.div>

                  <motion.div variants={fieldRowVariants(reduce)}>
                    <Field id="description" label={t('Description', 'Description')} hint={t('Facultatif — précisez votre besoin si vous le souhaitez.', 'Optional — add details if you like.')}>
                      <textarea
                        id="description"
                        value={form.description}
                        onChange={update('description')}
                        rows={5}
                        placeholder={t('Décrivez votre projet, vos objectifs, vos délais…', 'Describe your project, goals and timeline…')}
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
              className="relative flex flex-col gap-6 overflow-hidden rounded-[28px] p-[40px_36px] text-center"
              style={{ background: 'linear-gradient(160deg,#152A57,#0D1730)' }}
            >
              <motion.span aria-hidden="true" {...pulseAnim(3)} className="absolute right-[26px] top-[22px] h-3 w-3 rounded-full bg-pac-cyan" />
              <h2 className="m-0 flex items-center justify-center gap-3 font-heading text-[22px] font-bold text-white">
                <CircleUser aria-hidden="true" className="h-14 w-14 text-pac-cyan-light" strokeWidth={1.25} />
                {t('Coordonnées', 'Contact details')}
              </h2>

              <div className="flex flex-wrap justify-center gap-3">
                {CONTACT_CHANNELS.map(({ key, fr, en, href, Icon }) => {
                  const external = href.startsWith('http')
                  return (
                    <a
                      key={key}
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      aria-label={t(fr, en)}
                      title={t(fr, en)}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-pac-ink transition-colors hover:bg-pac-cyan hover:text-pac-navy-950"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  )
                })}
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
    </>
  )
}
