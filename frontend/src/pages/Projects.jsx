import { useState } from 'react'
import { dotGridPattern } from '../utils/patterns.js'

const projects = [
  {
    key: 'orbit',
    category: 'DEV',
    title: 'Orbit — team dashboard',
    desc: 'React + Node.js analytics dashboard built for a 40-person ops team, with live charts and role-based views.',
    grad: 'linear-gradient(135deg,#3E7BFA,#2657C7)',
    stack: ['React', 'Node.js', 'Supabase'],
    year: '2026',
  },
  {
    key: 'fernway',
    category: 'UX',
    title: 'Fernway banking app',
    desc: 'End-to-end UX for a mobile-first neobank — research, flows, and a full design system.',
    grad: 'linear-gradient(135deg,#8B3FE8,#5A22A8)',
    stack: ['Figma', 'User research', 'Prototyping'],
    year: '2025',
  },
  {
    key: 'loam',
    category: 'DEV + UX',
    title: 'Loam — plant care shop',
    desc: 'Designed and built a cross-platform storefront, from brand system to a custom checkout flow.',
    grad: 'linear-gradient(135deg,#3E7BFA,#8B3FE8)',
    stack: ['React', 'React Native', 'Firebase'],
    year: '2025',
  },
  {
    key: 'signal',
    category: 'DEV',
    title: 'Signal — team chat app',
    desc: 'A real-time chat app for remote teams, built once and shipped to web, iOS, and Android.',
    grad: 'linear-gradient(135deg,#2657C7,#3E7BFA)',
    stack: ['React Native', 'Firebase', 'Node.js'],
    year: '2024',
  },
  {
    key: 'huer',
    category: 'UX',
    title: 'Huer color tool',
    desc: 'A playful palette-building tool for designers, with an interaction model built around gesture.',
    grad: 'linear-gradient(135deg,#5A22A8,#8B3FE8)',
    stack: ['Figma', 'Motion design', 'UI kit'],
    year: '2024',
  },
  {
    key: 'nest',
    category: 'DEV + UX',
    title: 'Nest — booking platform',
    desc: 'Redesigned and rebuilt a booking flow across web and mobile that cut checkout drop-off in six weeks.',
    grad: 'linear-gradient(135deg,#7BB4FF,#3E7BFA)',
    stack: ['React', 'React Native', 'Supabase'],
    year: '2024',
  },
]

const filterOptions = [
  { key: 'all', label: 'All' },
  { key: 'DEV', label: 'Dev' },
  { key: 'UX', label: 'UX Design' },
  { key: 'DEV + UX', label: 'Both' },
]

const filterButtonBase =
  'rounded-full border-none px-5 py-2.5 font-sans text-sm font-semibold cursor-pointer transition-colors duration-150'

function Projects() {
  const [filter, setFilter] = useState('all')
  const visibleProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#0A0E1F' }} className="min-h-screen">
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0A0E1F 0%,#171432 55%,#2a1547 100%)' }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: dotGridPattern, backgroundSize: '120px', opacity: 0.35 }}
        />
        <div
          className="pointer-events-none absolute -right-[140px] -top-[100px] h-[380px] w-[380px] rounded-full"
          style={{
            background: 'radial-gradient(circle,#8B3FE8,transparent 70%)',
            opacity: 0.3,
            filter: 'blur(20px)',
          }}
        />

        <div className="relative mx-auto max-w-[1120px] px-6 pb-14 pt-18 sm:px-12">
          <div
            style={{ animation: 'fadeInUp .7s ease both' }}
            className="mb-[18px] inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.08] px-4 py-2 text-[13px] font-bold uppercase tracking-wider text-[#9FC2FF]"
          >
            <span
              className="h-[7px] w-[7px] rounded-full"
              style={{ background: 'linear-gradient(135deg,#3E7BFA,#8B3FE8)' }}
            />
            Portfolio
          </div>

          <h1
            style={{
              animation: 'fadeInUp .7s ease .08s both',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(34px,5vw,52px)',
              letterSpacing: '-0.02em',
            }}
            className="m-0 mb-4 font-extrabold text-white"
          >
            Web and mobile apps, designed and built.
          </h1>

          <p
            style={{ animation: 'fadeInUp .7s ease .16s both' }}
            className="m-0 mb-9 max-w-[600px] text-[17px] leading-relaxed text-white/65"
          >
            A mix of shipped products, UX explorations, and cross-platform builds — start to finish.
          </p>

          <div
            style={{ animation: 'fadeInUp .7s ease .24s both' }}
            className="inline-flex gap-1 rounded-full border border-white/10 bg-white/[0.07] p-[5px]"
          >
            {filterOptions.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={filterButtonBase}
                style={
                  filter === f.key
                    ? { background: '#fff', color: '#1a1a2e' }
                    : { background: 'transparent', color: 'rgba(255,255,255,0.6)' }
                }
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 pb-[120px] sm:px-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[26px]">
          {visibleProjects.map((p) => (
            <div
              key={p.key}
              className="overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.04] transition-all duration-200 hover:-translate-y-1"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
            >
              <div
                className="relative flex h-[190px] items-center justify-center"
                style={{ background: p.grad }}
              >
                <span
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  className="text-sm font-bold tracking-wide text-white/90"
                >
                  {p.category}
                </span>
                <span className="absolute right-3.5 top-3.5 rounded-full bg-white/20 px-3 py-[5px] text-[11.5px] font-semibold text-white backdrop-blur-sm">
                  {p.year}
                </span>
              </div>
              <div className="p-6">
                <h3
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  className="m-0 mb-2 text-xl font-bold text-white"
                >
                  {p.title}
                </h3>
                <p className="m-0 mb-4 text-[14.5px] leading-relaxed text-white/60">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/[0.08] px-3 py-[5px] text-[12.5px] font-medium text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Projects
