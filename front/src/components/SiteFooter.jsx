import { Link } from 'react-router-dom'
import logoWhite from '../assets/pac/logo-white.png'

const NAV_LINKS = [
  { href: '/', fr: 'Accueil', en: 'Home' },
  { href: '/studio', fr: 'Le Studio', en: 'Studio' },
  { href: '/services', fr: 'Services', en: 'Services' },
  { href: '/projets', fr: 'Projets', en: 'Work' },
  { href: '/contact', fr: 'Contact', en: 'Contact' },
]

const SERVICE_LINKS = [
  { fr: 'Design UI/UX', en: 'UI/UX Design' },
  { fr: 'Développement web', en: 'Web development' },
  { fr: 'Applications mobiles', en: 'Mobile apps' },
  { fr: 'Branding & identité', en: 'Branding & identity' },
]

const linkClass = 'text-[14px] text-pac-link'
const headingClass = 'mb-1.5 font-heading text-sm font-bold uppercase tracking-[1.5px] text-pac-cyan'

export default function SiteFooter({ lang }) {
  const t = (fr, en) => (lang === 'en' ? en : fr)

  return (
    <footer className="bg-pac-navy-900 text-white">
      <div className="mx-auto max-w-[1240px] px-8 pb-9 pt-[72px]">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1.2fr] items-start gap-12 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1 max-[560px]:text-center">
          <div className="flex flex-col gap-[18px] max-[560px]:items-center">
            <Link to="/">
              <img src={logoWhite} alt="Pix.Ala.Code" className="block w-[170px]" />
            </Link>
            <p className="m-0 max-w-[300px] text-sm leading-[1.7] text-pac-muted">
              {t(
                'Studio de design & développement. Nous concevons des produits digitaux qui font grandir votre business.',
                'Design & development studio. We craft digital products that grow your business.'
              )}
            </p>
            <div aria-hidden="true" className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-pac-cyan" />
              <span className="h-2.5 w-2.5 rounded-full bg-pac-cyan opacity-60" />
              <span className="h-2.5 w-2.5 rounded-full bg-pac-cyan opacity-30" />
            </div>
          </div>

          <nav aria-label="Navigation" className="flex flex-col gap-3 max-[560px]:items-center">
            <h3 className={headingClass}>Navigation</h3>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} to={link.href} className={linkClass}>
                {t(link.fr, link.en)}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 max-[560px]:items-center">
            <h3 className={headingClass}>Services</h3>
            {SERVICE_LINKS.map((s) => (
              <Link key={s.fr} to="/services" className={linkClass}>
                {t(s.fr, s.en)}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 max-[560px]:items-center">
            <h3 className={headingClass}>Contact</h3>
            <a href="mailto:hello@pixalacode.com" className={linkClass}>
              hello@pixalacode.com
            </a>
            <a href="tel:+212661234567" className={linkClass}>
              +212 6 61 23 45 67
            </a>
            <span className="text-sm text-pac-muted">{t('Casablanca · disponibles partout', 'Casablanca · available worldwide')}</span>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-white/12 pt-6 max-[560px]:flex-col max-[560px]:text-center">
          <span className="text-[13px] text-pac-faint">© 2026 Pix.Ala.Code. {t('Tous droits réservés.', 'All rights reserved.')}</span>
          <span className="font-heading text-[13px] font-semibold text-pac-faint">
            {t('Votre succès numérique, notre code.', 'Your digital success, our code.')}
          </span>
        </div>
      </div>
    </footer>
  )
}
