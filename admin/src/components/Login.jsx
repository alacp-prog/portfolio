import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeSlash, WarningCircle } from '@phosphor-icons/react'
import Button from './ui/Button'
import logo from '../assets/logo-white.png'

const CIRCUIT_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cg fill='none' stroke='%2300C0FF' stroke-width='1' opacity='0.16'%3E%3Cpath d='M10 10 H60 V60 H110'/%3E%3Cpath d='M10 110 H40 V70'/%3E%3Ccircle cx='60' cy='60' r='3' fill='%2300C0FF'/%3E%3Ccircle cx='10' cy='10' r='2' fill='%2300C0FF'/%3E%3Ccircle cx='110' cy='60' r='2' fill='%2300C0FF'/%3E%3C/g%3E%3C/svg%3E\")"

export default function Login({ onLogin, loading, error }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setFormError('Merci de renseigner votre email et votre mot de passe.')
      return
    }
    setFormError(null)
    onLogin(email.trim(), password, remember)
  }

  const displayError = formError ?? error

  return (
    <div className="grid min-h-screen bg-navy-950 text-white md:grid-cols-2">
      <div className="relative hidden flex-col justify-center overflow-hidden bg-gradient-to-br from-navy-700 via-navy-800 to-navy-950 px-16 py-20 md:flex">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: CIRCUIT_PATTERN }}
        />

        <motion.span
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-[12%] h-3.5 w-3.5 rounded-full bg-brand-cyan"
        />
        <motion.span
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 left-[10%] h-5 w-5 rounded-full bg-brand-cyan/40"
        />

        <motion.img
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          src={logo}
          alt="Pix.Ala.Code"
          className="relative z-10 mb-8 h-32 w-auto max-w-[260px] object-contain"
        />
        <h1 className="relative z-10 mb-4 max-w-md font-heading text-[40px] font-extrabold leading-[1.2] tracking-tight">
          Espace admin
          <br />
          <span className="text-brand-cyan">Pix.Ala.Code</span>
        </h1>
        <p className="relative z-10 max-w-sm text-[15.5px] leading-relaxed text-white/60">
          Gérez les projets et les compétences affichés sur le site en un seul endroit.
        </p>

        <div className="relative z-10 mt-14 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-sm text-white/70">
            <span className="h-2 w-2 flex-none rounded-full bg-brand-cyan" />
            Contenu synchronisé avec le site public
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <span className="h-2 w-2 flex-none rounded-full bg-brand-cyan" />
            Accès réservé à l'équipe du studio
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12 md:px-12">
        <form onSubmit={handleSubmit} className="flex w-full max-w-[380px] flex-col gap-7">
          <div>
            <h2 className="mb-2 font-heading text-[26px] font-bold">Connexion</h2>
            <p className="text-sm text-white/50">Entrez vos identifiants pour accéder au tableau de bord.</p>
          </div>

          <div className="flex flex-col gap-[18px]">
            <div className="flex flex-col gap-[7px]">
              <label htmlFor="login-email" className="text-[12.5px] font-semibold text-white/65">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="username"
                placeholder="vous@pixalacode.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-[10px] border-[1.5px] border-white/15 bg-white/5 px-[15px] py-[13px] text-[14.5px] text-white outline-none transition-colors duration-150 focus:border-brand-cyan focus:bg-white/[0.08]"
              />
            </div>

            <div className="flex flex-col gap-[7px]">
              <div className="flex items-center justify-between gap-2.5">
                <label
                  htmlFor="login-password"
                  className="whitespace-nowrap text-[12.5px] font-semibold text-white/65"
                >
                  Mot de passe
                </label>
                <a href="#" className="whitespace-nowrap text-xs text-brand-cyan hover:text-brand-cyan">
                  Mot de passe oublié ?
                </a>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-[10px] border-[1.5px] border-white/15 bg-white/5 px-[15px] py-[13px] pr-11 text-[14.5px] text-white outline-none transition-colors duration-150 focus:border-brand-cyan focus:bg-white/[0.08]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  className="absolute right-3.5 top-1/2 flex -translate-y-1/2 cursor-pointer items-center bg-transparent text-white/50 hover:text-white/80"
                >
                  {showPassword ? <EyeSlash size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {displayError && (
              <div className="flex items-center gap-2.5 rounded-[9px] border border-[rgba(224,69,90,0.3)] bg-[rgba(224,69,90,0.12)] px-3.5 py-[11px] text-[13px] text-[#FF8A96]">
                <WarningCircle size={16} weight="fill" className="flex-none" />
                {displayError}
              </div>
            )}

            <label className="flex cursor-pointer items-center gap-2.5 text-[13.5px] text-white/60">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 accent-brand-cyan"
              />
              Se souvenir de moi
            </label>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Connexion…' : 'Se connecter'}
            </Button>
          </div>

          <div className="flex items-center gap-3.5 text-xs text-white/30">
            <span className="h-px flex-1 bg-white/10" />
            Studio design &amp; développement
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <a
            href={import.meta.env.VITE_SITE_URL ?? '/'}
            className="text-center text-[13px] text-white/40 hover:text-white/70"
          >
            ← Retour au site public
          </a>
        </form>
      </div>
    </div>
  )
}
