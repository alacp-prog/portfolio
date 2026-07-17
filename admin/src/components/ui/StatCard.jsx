import { motion } from 'framer-motion'
import { staggerItem } from '../../lib/motion'
import AnimatedNumber from './AnimatedNumber'
import Skeleton from './Skeleton'

export default function StatCard({ label, value, loading }) {
  return (
    <motion.div
      variants={staggerItem}
      className="rounded-xl border border-border bg-surface px-5 py-[18px] shadow-card"
    >
      <span className="text-[12px] font-semibold text-ink-400">{label}</span>
      {loading ? (
        <Skeleton className="mt-2 h-[26px] w-12" />
      ) : (
        <div className="mt-1 font-heading text-[26px] font-bold text-ink-900">
          <AnimatedNumber value={value} />
        </div>
      )}
    </motion.div>
  )
}
