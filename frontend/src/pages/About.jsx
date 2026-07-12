import aboutPortrait from '../assets/about-portrait.png'
import { dotGridPattern } from '../utils/patterns.js'

const skillGroups = [
  {
    title: 'Web',
    icon: '💻',
    color: 'rgba(62,123,250,0.12)',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
  },
  {
    title: 'Mobile',
    icon: '📱',
    color: 'rgba(62,123,250,0.12)',
    items: ['React Native', 'Expo', 'iOS', 'Android'],
  },
  {
    title: 'Backend & Data',
    icon: '⚙️',
    color: 'rgba(139,63,232,0.12)',
    items: ['Firebase', 'Supabase', 'PostgreSQL', 'REST/GraphQL'],
  },
  {
    title: 'Design',
    icon: '🎨',
    color: 'rgba(139,63,232,0.12)',
    items: ['Figma', 'Design systems', 'Prototyping', 'Motion'],
  },
]

const principles = [
  {
    n: '01',
    title: 'Design in the browser',
    desc: 'Mockups only get you so far — we move to real code fast so decisions get tested against reality.',
  },
  {
    n: '02',
    title: 'One team, no handoff gaps',
    desc: 'The people who design your app are the same ones who build it — nothing gets lost in translation.',
  },
  {
    n: '03',
    title: 'One codebase, every screen',
    desc: 'React and React Native share logic and design tokens, so web and mobile stay in sync.',
  },
]

function About() {
  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif", background: '#0A0E1F' }}
      className="min-h-screen"
    >
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg,#0A0E1F 0%,#171432 55%,#2a1547 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: dotGridPattern, backgroundSize: '120px', opacity: 0.35 }}
        />
        <div
          className="pointer-events-none absolute -left-[140px] -top-[100px] h-[380px] w-[380px] rounded-full"
          style={{
            background: 'radial-gradient(circle,#3E7BFA,transparent 70%)',
            opacity: 0.3,
            filter: 'blur(20px)',
            animation: 'blobfloat 9s ease-in-out infinite',
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-[120px] -right-[140px] h-[380px] w-[380px] rounded-full"
          style={{
            background: 'radial-gradient(circle,#8B3FE8,transparent 70%)',
            opacity: 0.25,
            filter: 'blur(20px)',
            animation: 'blobfloat 11s ease-in-out infinite reverse',
          }}
        />

        <div className="relative mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-14 px-6 py-18 sm:px-12 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div
              style={{ animation: 'fadeInUp .7s ease both' }}
              className="mb-[18px] inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-[13px] font-bold uppercase tracking-wider text-[#9FC2FF]"
            >
              <span
                className="h-[7px] w-[7px] rounded-full"
                style={{ background: 'linear-gradient(135deg,#3E7BFA,#8B3FE8)' }}
              />
              About
            </div>
            <h1
              style={{
                animation: 'fadeInUp .7s ease .08s both',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(32px,5vw,48px)',
                letterSpacing: '-0.02em',
              }}
              className="m-0 mb-5 font-extrabold text-white"
            >
              We're Pix.Ala.Code.
            </h1>
            <p
              style={{ animation: 'fadeInUp .7s ease .16s both' }}
              className="m-0 mb-4 text-[17px] leading-[1.7] text-white/65"
            >
              A freelance studio specialized in designing and developing cross-platform web and
              mobile applications — one team handling UX, UI, and the code that ships it.
            </p>
            <p
              style={{ animation: 'fadeInUp .7s ease .24s both' }}
              className="m-0 text-[17px] leading-[1.7] text-white/65"
            >
              We build with React, React Native, Node.js, Firebase and Supabase — so your product
              looks right and runs right, on every screen.
            </p>
          </div>
          <div
            style={{
              animation: 'fadeInUp .8s ease .2s both',
              background: 'conic-gradient(from 180deg,#3E7BFA,#8B3FE8,#3E7BFA)',
              boxShadow: '0 20px 60px -16px rgba(139,63,232,0.5)',
            }}
            className="relative aspect-square rounded-[28px] p-[5px] transition-all duration-200 hover:scale-[1.03]"
          >
            <div className="h-full w-full overflow-hidden rounded-3xl bg-[#171432]">
              <img
                src={aboutPortrait}
                alt="Portrait"
                className="block h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 py-16 sm:px-12">
        <h2
          style={{ animation: 'fadeInUp .7s ease both', fontFamily: "'Space Grotesk', sans-serif" }}
          className="m-0 mb-8 text-[28px] font-bold text-white"
        >
          Tools &amp; tech
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
          {skillGroups.map((group, i) => (
            <div
              key={group.title}
              style={{ animation: `scaleIn .5s ease ${i * 0.08}s both` }}
              className="rounded-[18px] border border-white/10 bg-white/[0.04] p-[26px] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div
                className="mb-4 flex h-[38px] w-[38px] items-center justify-center rounded-[10px] text-[17px]"
                style={{ background: group.color }}
              >
                {group.icon}
              </div>
              <h3
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className="m-0 mb-3 text-[16.5px] font-bold text-white"
              >
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white/[0.08] px-3 py-[5px] text-[12.5px] font-medium text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 pb-[120px] pt-16 sm:px-12">
        <h2
          style={{ animation: 'fadeInUp .7s ease both', fontFamily: "'Space Grotesk', sans-serif" }}
          className="m-0 mb-8 text-[28px] font-bold text-white"
        >
          How I work
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {principles.map((pr, i) => (
            <div key={pr.n} style={{ animation: `fadeInUp .6s ease ${i * 0.1}s both` }} className="transition-all duration-200 hover:scale-[1.03]">
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: 'linear-gradient(135deg,#3E7BFA,#8B3FE8)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
                className="mb-2.5 text-[34px] font-extrabold"
              >
                {pr.n}
              </div>
              <h3
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className="m-0 mb-2 text-[17px] font-bold text-white"
              >
                {pr.title}
              </h3>
              <p className="m-0 text-[14.5px] leading-relaxed text-white/60">{pr.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
