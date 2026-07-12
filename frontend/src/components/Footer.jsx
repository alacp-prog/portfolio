import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const siteLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
]

const elsewhereLinks = [
  { href: '#', label: 'GitHub' },
  { href: '#', label: 'Dribbble' },
  { href: '#', label: 'LinkedIn' },
]

function Footer() {
  return (
    <footer
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="bg-[#1a1a2e] px-6 pb-8 pt-16 text-white/85 sm:px-12"
    >
      <div className="mx-auto flex max-w-[1120px] flex-wrap justify-between gap-12 border-b border-white/10 pb-10">
        <div className="max-w-[340px]">
          <div className="mb-3.5 flex items-center gap-2.5">
            <img src={logo} alt="Pix.Ala.Code" className="h-[34px] w-[34px] object-contain" />
            <span className="font-heading text-[17px] font-bold text-white">Pix.Ala.Code</span>
          </div>
          <p className="m-0 text-[14.5px] leading-relaxed text-white/55">
            Code that ships, design that sticks. One brand, two crafts.
          </p>
        </div>

        <div className="flex flex-wrap gap-14">
          <div>
            <div className="mb-3.5 text-xs font-semibold uppercase tracking-wider text-white/40">
              Site
            </div>
            <div className="flex flex-col gap-2.5">
              {siteLinks.map(({ to, label }) => (
                <Link key={to} to={to} className="text-[14.5px] text-white/80 no-underline">
                  {label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="text-[14.5px] text-white/80 no-underline"
              >
                Contact
              </Link>
            </div>
          </div>
          <div>
            <div className="mb-3.5 text-xs font-semibold uppercase tracking-wider text-white/40">
              Elsewhere
            </div>
            <div className="flex flex-col gap-2.5">
              {elsewhereLinks.map(({ href, label }) => (
                <a key={label} href={href} className="text-[14.5px] text-white/80 no-underline">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-[1120px] text-[13px] text-white/40">
        © 2026 Pix.Ala.Code. Built with equal parts semicolon and swatch.
      </div>
    </footer>
  )
}

export default Footer
