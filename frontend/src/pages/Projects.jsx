import { useEffect, useMemo, useState } from 'react'
import { dotGridPattern } from '../utils/patterns.js'
import { getProjects } from '../services/api.js'

const cardGradients = [
  'linear-gradient(135deg,#3E7BFA,#2657C7)',
  'linear-gradient(135deg,#8B3FE8,#5A22A8)',
  'linear-gradient(135deg,#3E7BFA,#8B3FE8)',
  'linear-gradient(135deg,#2657C7,#3E7BFA)',
  'linear-gradient(135deg,#5A22A8,#8B3FE8)',
  'linear-gradient(135deg,#7BB4FF,#3E7BFA)',
]

const filterButtonBase =
  'rounded-full border-none px-5 py-2.5 font-sans text-sm font-semibold cursor-pointer transition-colors duration-150'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data ?? []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
    [projects]
  )

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

          {categories.length > 0 && (
            <div
              style={{ animation: 'fadeInUp .7s ease .24s both' }}
              className="inline-flex gap-1 rounded-full border border-white/10 bg-white/[0.07] p-[5px]"
            >
              {['all', ...categories].map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={filterButtonBase}
                  style={
                    filter === key
                      ? { background: '#fff', color: '#1a1a2e' }
                      : { background: 'transparent', color: 'rgba(255,255,255,0.6)' }
                  }
                >
                  {key === 'all' ? 'All' : key}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 pb-[120px] sm:px-12">
        {loading && <p className="py-10 text-center text-white/50">Loading projects...</p>}
        {error && <p className="py-10 text-center text-red-400">Failed to load projects: {error}</p>}
        {!loading && !error && visibleProjects.length === 0 && (
          <p className="py-10 text-center text-white/50">No projects yet — check back soon.</p>
        )}

        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[26px]">
          {visibleProjects.map((p, i) => (
            <div
              key={p.id}
              className="overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.04] transition-all duration-200 hover:-translate-y-1"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
            >
              <div
                className="relative flex h-[190px] items-center justify-center"
                style={p.image ? {} : { background: cardGradients[i % cardGradients.length] }}
              >
                {p.image ? (
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                ) : (
                  <span
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    className="text-sm font-bold tracking-wide text-white/90"
                  >
                    {p.category ?? p.title}
                  </span>
                )}
                {p.year && (
                  <span className="absolute right-3.5 top-3.5 rounded-full bg-white/20 px-3 py-[5px] text-[11.5px] font-semibold text-white backdrop-blur-sm">
                    {p.year}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  className="m-0 mb-2 text-xl font-bold text-white"
                >
                  {p.title}
                </h3>
                <p className="m-0 mb-4 text-[14.5px] leading-relaxed text-white/60">{p.description}</p>
                {p.stack?.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {p.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/[0.08] px-3 py-[5px] text-[12.5px] font-medium text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {(p.github_url || p.demo_url) && (
                  <div className="flex flex-wrap gap-3">
                    {p.demo_url && (
                      <a
                        href={p.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-white/[0.08] px-3 py-[5px] text-[12.5px] font-medium text-white/80 no-underline hover:bg-white/[0.14]"
                      >
                        Live demo →
                      </a>
                    )}
                    {p.github_url && (
                      <a
                        href={p.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-white/[0.08] px-3 py-[5px] text-[12.5px] font-medium text-white/80 no-underline hover:bg-white/[0.14]"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Projects
