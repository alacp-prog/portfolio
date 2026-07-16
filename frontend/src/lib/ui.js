export const cardClass = 'flex flex-col gap-4 rounded-[18px] border border-white/10 bg-white/5 p-[34px_28px]'
export const eyebrowClass = 'font-heading text-[13px] font-bold uppercase tracking-[2px] text-pac-cyan-light'
export const sectionTitleClass = 'm-0 font-heading text-[clamp(28px,4vw,42px)] font-bold leading-[1.2] text-pac-ink'

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

export const floatAnim = {
  animate: { y: [0, -16, 0] },
  transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
}

export const pulseAnim = (duration) => ({
  animate: { opacity: [0.25, 1, 0.25] },
  transition: { duration, repeat: Infinity, ease: 'easeInOut' },
})

export const circuitHeroBg = {
  background:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cg fill='none' stroke='%2300C0FF' stroke-width='1' opacity='0.16'%3E%3Cpath d='M10 10 H60 V60 H110'/%3E%3Cpath d='M10 110 H40 V70'/%3E%3Ccircle cx='60' cy='60' r='3' fill='%2300C0FF'/%3E%3Ccircle cx='10' cy='10' r='2' fill='%2300C0FF'/%3E%3Ccircle cx='110' cy='60' r='2' fill='%2300C0FF'/%3E%3C/g%3E%3C/svg%3E\"),linear-gradient(160deg,#10204A 0%,#14265A 55%,#0B1226 100%)",
}

export const pageHeroClass = 'relative overflow-hidden px-8 pb-[80px] pt-[170px] text-center'
export const placeholderClass = 'flex items-center justify-center bg-white/6 px-6 text-center font-heading text-[13px] font-semibold text-white/55'
