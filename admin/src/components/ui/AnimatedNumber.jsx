import { useEffect, useRef } from 'react'
import { useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion'

export default function AnimatedNumber({ value }) {
  const shouldReduceMotion = useReducedMotion()
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => Math.round(v).toString())
  const ref = useRef(null)

  useEffect(() => {
    if (shouldReduceMotion) {
      motionValue.set(value)
      return
    }
    const controls = animate(motionValue, value, { duration: 0.6, ease: 'easeOut' })
    return controls.stop
  }, [value, shouldReduceMotion, motionValue])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = v
    })
    return unsubscribe
  }, [rounded])

  return <span ref={ref}>0</span>
}
