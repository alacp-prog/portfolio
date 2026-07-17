import { motion } from 'framer-motion'
import { tapScale } from '../../lib/motion'

const VARIANTS = {
  primary:
    'bg-gradient-to-br from-brand-cyan to-brand-blue text-white shadow-card hover:shadow-popover disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none',
  outline:
    'bg-surface text-ink-600 border border-border hover:border-ink-300 hover:text-ink-900 disabled:opacity-60 disabled:cursor-not-allowed',
  ghost: 'bg-transparent text-ink-600 hover:bg-surface-muted disabled:opacity-60',
}

export default function Button({ variant = 'primary', className = '', children, disabled, ...props }) {
  return (
    <motion.button
      type="button"
      whileTap={disabled ? undefined : tapScale}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-heading font-semibold text-[13px] transition-colors duration-150 px-4 py-2.5 whitespace-nowrap cursor-pointer ${VARIANTS[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
}
