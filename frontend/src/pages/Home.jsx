import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import heroPortrait from '../assets/hero-portrait.webp'
import { dotGridPattern } from '../utils/patterns.js'
import { getProjects, getServices } from '../services/api.js'

const content = {
  dev: {
    line1: 'We build your app',
    line2: 'for web and mobile.',
    sub: 'Pix.Ala.Code is a freelance studio building cross-platform web and mobile apps — React, React Native, Node.js, Firebase and Supabase, shipped end-to-end.',
  },
  design: {
    line1: 'We design your app',
    line2: 'people love to use.',
    sub: 'Pix.Ala.Code is a freelance studio designing the products it builds — UX and UI for web and mobile, refined in the same hands that write the code.',
  },
}

const shots = [
  { id: 'hero-shot-1', label: 'App screen' },
  { id: 'hero-shot-2', label: 'Dashboard' },
  { id: 'hero-shot-3', label: 'Mobile UI' },
]

const marquee = [
  { label: 'React', color: '#3E7BFA' },
  { label: 'React Native', color: '#3E7BFA' },
  { label: 'Tailwind CSS', color: '#3E7BFA' },
  { label: 'Node.js', color: '#3E7BFA' },
  { label: 'Firebase', color: '#8B3FE8' },
  { label: 'Supabase', color: '#8B3FE8' },
  { label: 'Figma', color: '#8B3FE8' },
  { label: 'Design Systems', color: '#8B3FE8' },
]
const marqueeDouble = [...marquee, ...marquee]

const featuredGradients = [
  'linear-gradient(135deg,#3E7BFA,#2657C7)',
  'linear-gradient(135deg,#8B3FE8,#5A22A8)',
  'linear-gradient(135deg,#3E7BFA,#8B3FE8)',
]

const modeButtonBase =
  'rounded-full border-none px-5 py-2.5 font-sans text-sm font-semibold cursor-pointer transition-colors duration-150'

function Home() {
  const [mode, setMode] = useState('dev')
  const [featured, setFeatured] = useState([])
  const [services, setServices] = useState([])
  const { line1, line2, sub } = content[mode]

  useEffect(() => {
    getProjects()
      .then((res) => setFeatured((res.data ?? []).slice(0, 3)))
      .catch(() => setFeatured([]))

    getServices()
      .then((res) => setServices(res.data ?? []))
      .catch(() => setServices([]))
  }, [])

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#0A0E1F' }} className="overflow-hidden">
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0A0E1F 0%,#171432 55%,#2a1547 100%)' }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: dotGridPattern, backgroundSize: '120px', opacity: 0.35 }}
        />
        <div
          className="pointer-events-none absolute -right-[140px] -top-[100px] h-[420px] w-[420px] rounded-full"
          style={{
            background: 'radial-gradient(circle,#8B3FE8,transparent 70%)',
            opacity: 0.35,
            filter: 'blur(20px)',
            animation: 'blobfloat 9s ease-in-out infinite',
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-[120px] -left-[160px] h-[380px] w-[380px] rounded-full"
          style={{
            background: 'radial-gradient(circle,#3E7BFA,transparent 70%)',
            opacity: 0.3,
            filter: 'blur(20px)',
            animation: 'blobfloat 11s ease-in-out infinite reverse',
          }}
        />

        <div className="relative mx-auto grid max-w-[1220px] grid-cols-1 items-center gap-14 px-6 py-18 pb-24 sm:px-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col gap-[22px]">
            <div
              style={{ animation: 'fadeInUp .7s ease both' }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.08] px-4 py-2 text-[13px] font-bold uppercase tracking-wider text-[#9FC2FF]"
            >
              <span
                className="h-[7px] w-[7px] rounded-full"
                style={{ background: 'linear-gradient(135deg,#3E7BFA,#8B3FE8)' }}
              />
              Web &amp; mobile · cross-platform
            </div>

            <h1
              style={{
                animation: 'fadeInUp .7s ease .08s both',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(38px,4.6vw,58px)',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
              }}
              className="m-0 font-extrabold text-white"
            >
              {line1}
              <br />
              {line2}
            </h1>

            <p
              style={{ animation: 'fadeInUp .7s ease .16s both' }}
              className="m-0 max-w-[480px] text-lg leading-relaxed text-white/65"
            >
              {sub}
            </p>

            <div
              style={{ animation: 'fadeInUp .7s ease .24s both' }}
              className="inline-flex w-fit gap-1 rounded-full border border-white/10 bg-white/[0.07] p-[5px]"
            >
              <button
                type="button"
                onClick={() => setMode('dev')}
                className={modeButtonBase}
                style={mode === 'dev' ? { background: '#fff', color: '#1a1a2e' } : { background: 'transparent', color: 'rgba(255,255,255,0.6)' }}
              >
                💻 Code mode
              </button>
              <button
                type="button"
                onClick={() => setMode('design')}
                className={modeButtonBase}
                style={mode === 'design' ? { background: '#fff', color: '#1a1a2e' } : { background: 'transparent', color: 'rgba(255,255,255,0.6)' }}
              >
                🎨 Design mode
              </button>
            </div>

            <div
              style={{ animation: 'fadeInUp .7s ease .32s both' }}
              className="mt-1.5 flex flex-wrap gap-3.5"
            >
              <Link
                to="/projects"
                className="rounded-full px-[30px] py-[15px] text-[15.5px] font-bold text-white no-underline transition-all duration-200 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg,#3E7BFA,#8B3FE8)',
                  boxShadow: '0 14px 30px -10px rgba(90,60,220,0.55)',
                }}
              >
                See the work
              </Link>
              <Link
                to="/contact"
                className="rounded-full border-[1.5px] border-white/[0.22] bg-transparent px-[30px] py-[15px] text-[15.5px] font-semibold text-white no-underline transition-all duration-200 hover:scale-105"
              >
                Say hi
              </Link>
            </div>
          </div>

          <div
            style={{ animation: 'fadeInUp .8s ease .2s both' }}
            className="relative hidden h-[460px] md:block"
          >
            <div
              className="absolute left-5 top-9 h-[190px] w-[190px] rounded-full p-1"
              style={{
                background: 'conic-gradient(from 180deg,#3E7BFA,#8B3FE8,#3E7BFA)',
                boxShadow: '0 0 50px -8px rgba(139,63,232,0.55)',
              }}
            >
              <div className="h-full w-full overflow-hidden rounded-full bg-[#171432]">
                <img src={heroPortrait} alt="Portrait" className="block h-full w-full object-cover" />
              </div>
            </div>

            <div
              className="absolute left-[210px] top-0 w-[190px] rounded-[14px] border border-white/10 p-3.5"
              style={{ background: 'rgba(20,18,40,0.75)', backdropFilter: 'blur(10px)', boxShadow: '0 20px 40px -16px rgba(0,0,0,0.5)' }}
            >
              <div className="mb-2.5 flex gap-[5px]">
                <span className="h-[7px] w-[7px] rounded-full bg-[#FF5F57]" />
                <span className="h-[7px] w-[7px] rounded-full bg-[#FEBC2E]" />
                <span className="h-[7px] w-[7px] rounded-full bg-[#28C840]" />
              </div>
              <div className="mb-[7px] h-2 w-4/5 rounded" style={{ background: '#3E7BFA', opacity: 0.7 }} />
              <div className="mb-[7px] h-2 w-3/5 rounded bg-white/25" />
              <div className="h-2 w-[70%] rounded" style={{ background: '#8B3FE8', opacity: 0.7 }} />
            </div>

            <div
              className="absolute left-[246px] top-[150px] w-[170px] rounded-[14px] border border-white/10 p-3.5"
              style={{ background: 'rgba(20,18,40,0.75)', backdropFilter: 'blur(10px)', boxShadow: '0 20px 40px -16px rgba(0,0,0,0.5)' }}
            >
              <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#C08BFF]">User flow</div>
              <div className="mb-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-[72%]" style={{ background: 'linear-gradient(90deg,#3E7BFA,#8B3FE8)' }} />
              </div>
              <div className="h-1.5 w-4/5 rounded-full bg-white/15" />
            </div>

            <div
              className="absolute left-4 top-[250px] flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-[13px] font-semibold text-white"
              style={{ background: 'rgba(20,18,40,0.8)', backdropFilter: 'blur(10px)', boxShadow: '0 16px 32px -14px rgba(0,0,0,0.5)' }}
            >
              <span className="h-2 w-2 rounded-full bg-[#28C840]" />
              Available for work
            </div>

            <div className="absolute left-0 top-[300px] grid w-[420px] grid-cols-3 gap-3">
              {shots.map((shot) => (
                <div
                  key={shot.id}
                  className="flex h-24 items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/[0.06] text-center text-xs text-white/55"
                >
                  {shot.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-white/[0.08] bg-[#0A0E1F] py-7">
        <div className="flex w-max" style={{ animation: 'marquee 26s linear infinite' }}>
          {marqueeDouble.map((tool, i) => (
            <div
              key={`${tool.label}-${i}`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="flex items-center gap-2.5 whitespace-nowrap px-8 text-[17px] font-semibold text-white/55"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: tool.color }} />
              {tool.label}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 pb-16 pt-24 sm:px-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2.5 text-[13.5px] font-bold uppercase tracking-wider text-[#8B3FE8]">
              Selected work
            </div>
            <h2
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="m-0 text-[34px] font-bold tracking-tight text-white"
            >
              Recent builds &amp; designs
            </h2>
          </div>
          <Link to="/projects" className="flex items-center gap-1.5 font-semibold text-white no-underline transition-all duration-200 hover:scale-105">
            View all work →
          </Link>
        </div>

        {featured.length === 0 ? (
          <p className="text-white/50">No projects yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            {featured.map((p, i) => (
              <Link
                key={p.id}
                to="/projects"
                className="block overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.04] no-underline transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <div
                  className="flex h-[180px] items-center justify-center"
                  style={p.image ? {} : { background: featuredGradients[i % featuredGradients.length] }}
                >
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  ) : (
                    <span
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      className="text-[15px] font-bold tracking-wide text-white/90"
                    >
                      {p.title}
                    </span>
                  )}
                </div>
                <div className="px-[22px] pb-6 pt-[22px]">
                  <h3
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    className="m-0 mb-2 text-[19px] font-bold text-white"
                  >
                    {p.title}
                  </h3>
                  <p className="m-0 text-[14.5px] leading-relaxed text-white/60">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8 bg-[#1a1a2e] px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-[1120px]">
          <h2
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            className="m-0 mb-3 text-center text-[34px] font-bold tracking-tight text-white"
          >
            Design and development, under one roof.
          </h2>
          <p className="mx-auto mb-14 max-w-[560px] text-center text-base text-white/55">
            One team, one stack, no handoff — from first sketch to shipped app.
          </p>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[20px] bg-white/10 md:grid-cols-2">
            {services.map((s, i) => (
              <div
                key={s.id}
                className="p-11 transition-all duration-200 hover:scale-[1.02]"
                style={{ background: i % 2 === 0 ? 'linear-gradient(160deg,#16213a,#1a1a2e)' : 'linear-gradient(160deg,#241634,#1a1a2e)' }}
              >
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                  style={{ background: i % 2 === 0 ? 'linear-gradient(135deg,#3E7BFA,#7BB4FF)' : 'linear-gradient(135deg,#8B3FE8,#C08BFF)' }}
                >
                  {s.icon ?? '⚡'}
                </div>
                <h3
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  className="m-0 mb-3 text-[22px] font-bold text-white"
                >
                  {s.title}
                </h3>
                <p className="m-0 text-[15px] leading-relaxed text-white/60">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 py-24 text-center sm:px-12">
        <h2
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          className="m-0 mb-4 text-[36px] font-bold tracking-tight text-white"
        >
          Got a web or mobile app to build?
        </h2>
        <p className="m-0 mb-8 text-[17px] text-white/60">
          Pix.Ala.Code designs it and builds it — cross-platform, start to finish.
        </p>
        <Link
          to="/contact"
          className="inline-block rounded-full border-none px-9 py-[17px] text-base font-bold text-white no-underline transition-all duration-200 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg,#3E7BFA,#8B3FE8)',
            boxShadow: '0 12px 28px -10px rgba(90,60,220,0.45)',
          }}
        >
          Start a project
        </Link>
      </section>
    </div>
  )
}

export default Home
