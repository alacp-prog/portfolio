import { useState } from 'react'
import { Link } from 'react-router-dom'
import { dotGridPattern } from '../utils/patterns.js'

const needOptions = [
  { key: 'web', label: '💻 Web app' },
  { key: 'mobile', label: '📱 Mobile app' },
  { key: 'both', label: '✨ Both' },
]

const inputStyle = {
  boxSizing: 'border-box',
  padding: '13px 14px',
  borderRadius: '12px',
  border: '1.5px solid rgba(20,20,30,0.12)',
  fontSize: '14.5px',
  fontFamily: 'Inter, sans-serif',
}

const needBtnBase =
  'rounded-full border-[1.5px] bg-white px-4 py-2.5 text-[13.5px] font-semibold font-sans cursor-pointer transition-all duration-200 hover:scale-105'

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [need, setNeed] = useState('web')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: 'linear-gradient(135deg,#0A0E1F 0%,#171432 55%,#2a1547 100%)',
        minHeight: '100vh',
      }}
      className="relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: dotGridPattern, backgroundSize: '120px', opacity: 0.35 }}
      />
      <div
        className="pointer-events-none absolute -bottom-[120px] -right-[140px] h-[380px] w-[380px] rounded-full"
        style={{
          background: 'radial-gradient(circle,#8B3FE8,transparent 70%)',
          opacity: 0.3,
          filter: 'blur(20px)',
          animation: 'blobfloat 9s ease-in-out infinite',
        }}
      />
      <div
        className="pointer-events-none absolute -left-[160px] -top-[100px] h-[420px] w-[420px] rounded-full"
        style={{
          background: 'radial-gradient(circle,#3E7BFA,transparent 70%)',
          opacity: 0.25,
          filter: 'blur(20px)',
          animation: 'blobfloat 11s ease-in-out infinite reverse',
        }}
      />

      <div className="relative mx-auto grid max-w-[1120px] grid-cols-1 gap-14 px-6 py-14 sm:px-12 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div
            style={{ animation: 'fadeInUp .7s ease both' }}
            className="mb-[18px] inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.08] px-4 py-2 text-[13px] font-bold uppercase tracking-wider text-[#9FC2FF]"
          >
            <span
              className="h-[7px] w-[7px] rounded-full"
              style={{ background: 'linear-gradient(135deg,#3E7BFA,#8B3FE8)' }}
            />
            Contact
          </div>
          <h1
            style={{
              animation: 'fadeInUp .7s ease .08s both',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(28px,4vw,40px)',
              letterSpacing: '-0.02em',
            }}
            className="m-0 mb-[18px] font-extrabold text-white"
          >
            Let's design and build your app.
          </h1>
          <p
            style={{ animation: 'fadeInUp .7s ease .16s both' }}
            className="m-0 mb-8 text-[16.5px] leading-[1.7] text-white/65"
          >
            Tell us what you're making — web, mobile, or both. We read every message ourselves
            and usually reply within a day or two.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:hello@pixalacode.dev"
              style={{ animation: 'fadeInUp .7s ease .24s both' }}
              className="flex items-center gap-3 text-[15px] font-semibold text-white no-underline transition-all duration-200 hover:scale-[1.03] hover:text-[#9FC2FF]"
            >
              <span className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-white/10 transition-colors hover:bg-white/15">
                ✉️
              </span>
              hello@pixalacode.dev
            </a>
            <a
              href="#"
              style={{ animation: 'fadeInUp .7s ease .32s both' }}
              className="flex items-center gap-3 text-[15px] font-semibold text-white no-underline transition-all duration-200 hover:scale-[1.03] hover:text-[#9FC2FF]"
            >
              <span className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-white/10 transition-colors hover:bg-white/15">
                🔗
              </span>
              GitHub / Dribbble / LinkedIn
            </a>
          </div>
        </div>

        <div
          style={{
            boxShadow: '0 20px 60px -16px rgba(0,0,0,0.4)',
            animation: 'scaleIn .6s ease .2s both',
          }}
          className="rounded-3xl border border-[rgba(20,20,30,0.08)] bg-white p-10"
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-4 px-3 py-12 text-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-[28px]"
                style={{ background: 'linear-gradient(135deg,#3E7BFA,#8B3FE8)' }}
              >
                ✓
              </div>
              <h3
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className="m-0 text-[22px] font-bold text-[#1a1a2e]"
              >
                Message sent!
              </h3>
              <p className="m-0 text-[15px] text-[rgba(20,20,30,0.6)]">
                Thanks {name || 'there'} — I'll get back to you soon.
              </p>
              <Link
                to="/"
                className="mt-4 rounded-full border-none px-7 py-3.5 text-[15px] font-bold text-white no-underline transition-all duration-200 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg,#3E7BFA,#8B3FE8)',
                }}
              >
                Back to home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[13px] font-semibold text-[#1a1a2e]">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={inputStyle}
                    className="w-full placeholder:text-[rgba(20,20,30,0.35)] focus:border-[#3E7BFA] focus:outline-none"
                    placeholder="Ada Lovelace"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold text-[#1a1a2e]">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={inputStyle}
                    className="w-full placeholder:text-[rgba(20,20,30,0.35)] focus:border-[#3E7BFA] focus:outline-none"
                    placeholder="ada@studio.com"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-[#1a1a2e]">
                  What do you need?
                </label>
                <div className="flex flex-wrap gap-2">
                  {needOptions.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setNeed(opt.key)}
                      className={needBtnBase}
                      style={
                        need === opt.key
                          ? { background: '#1a1a2e', color: '#fff', borderColor: '#1a1a2e' }
                          : { color: 'rgba(20,20,30,0.6)', borderColor: 'rgba(20,20,30,0.12)' }
                      }
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-[#1a1a2e]">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  style={inputStyle}
                  className="w-full resize-y placeholder:text-[rgba(20,20,30,0.35)] focus:border-[#3E7BFA] focus:outline-none"
                  placeholder="Tell me about the project..."
                />
              </div>

              <button
                type="submit"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: 'linear-gradient(135deg,#3E7BFA,#8B3FE8)',
                }}
                className="cursor-pointer rounded-xl border-none p-4 text-[15.5px] font-bold text-white transition-all duration-200 hover:scale-[1.02]"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact
