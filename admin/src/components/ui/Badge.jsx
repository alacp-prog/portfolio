export default function Badge({ label, textClass, bgClass }) {
  return (
    <span
      className={`w-fit whitespace-nowrap rounded-full px-2.5 py-1 font-heading text-[11px] font-semibold ${textClass} ${bgClass}`}
    >
      {label}
    </span>
  )
}
