import { motion } from 'framer-motion'
import { tapScale } from '../../lib/motion'

const VARIANTS = {
  default: 'bg-surface-muted text-ink-900 hover:bg-border-soft',
  danger: 'bg-danger-bg text-danger hover:bg-[#f9dade]',
}

export default function IconButton({ variant = 'default', className = '', children, label, ...props }) {
  return (
    <motion.button
      type="button"
      whileTap={tapScale}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center h-9 w-9 rounded-lg border-none cursor-pointer transition-colors duration-150 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
