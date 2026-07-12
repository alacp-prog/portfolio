import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Work', end: false },
  { to: '/about', label: 'About', end: false },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  const linkClass = ({ isActive }) =>
    'rounded-full px-4 py-2.5 text-[14.5px] font-medium no-underline ' +
    (isActive ? 'bg-white/10 text-white' : 'text-white/60')

  const mobileLinkClass = ({ isActive }) =>
    'border-b border-white/10 py-4 px-1.5 text-[22px] font-semibold no-underline font-heading ' +
    (isActive ? 'text-white' : 'text-white/55')

  return (
    <nav
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="sticky top-0 z-50 flex items-center justify-between bg-[#0A0E1F] px-6 py-[18px] sm:px-12"
    >
      <NavLink to="/" className="flex items-center gap-2.5 no-underline">
        <img src={logo} alt="Pix.Ala.Code" className="h-[38px] w-[38px] object-contain" />
        <span className="font-heading text-lg font-bold tracking-tight text-white">
          Pix.Ala.Code
        </span>
      </NavLink>

      <div className="flex items-center gap-1.5 max-[860px]:hidden">
        {links.map(({ to, label, end }) => (
          <NavLink key={to} to={to} end={end} className={linkClass}>
            {label}
          </NavLink>
        ))}
        <NavLink
          to="/contact"
          className="ml-3.5 whitespace-nowrap rounded-full border-none px-[22px] py-[11px] text-sm font-semibold text-white no-underline"
          style={{
            background: 'linear-gradient(135deg,#3E7BFA,#8B3FE8)',
            boxShadow: '0 6px 16px -6px rgba(90,60,220,0.5)',
          }}
        >
          Let's talk
        </NavLink>
      </div>

      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Menu"
        className="hidden flex-col gap-[5px] border-none bg-transparent p-2 max-[860px]:flex"
      >
        <span
          className="block h-[2.5px] w-6 rounded-sm bg-white transition-transform duration-200"
          style={menuOpen ? { transform: 'translateY(7.5px) rotate(45deg)' } : undefined}
        />
        <span
          className="block h-[2.5px] w-6 rounded-sm bg-white transition-opacity duration-200"
          style={menuOpen ? { opacity: 0 } : undefined}
        />
        <span
          className="block h-[2.5px] w-6 rounded-sm bg-white transition-transform duration-200"
          style={menuOpen ? { transform: 'translateY(-7.5px) rotate(-45deg)' } : undefined}
        />
      </button>

      {menuOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-[74px] z-[49] flex flex-col gap-2 bg-[#0A0E1F] p-8"
        >
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={mobileLinkClass} onClick={closeMenu}>
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            onClick={closeMenu}
            className="mt-3.5 rounded-2xl border-none px-[22px] py-4 text-center text-base font-semibold text-white no-underline"
            style={{ background: 'linear-gradient(135deg,#3E7BFA,#8B3FE8)' }}
          >
            Let's talk
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default Navbar
