import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import { overlayVariants, drawerVariants } from '../../lib/motion'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Drawer({ onClose, children }) {
  const panelRef = useRef(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    const panel = panelRef.current
    const firstFocusable = panel?.querySelector(FOCUSABLE_SELECTOR)
    firstFocusable?.focus()

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const focusable = panel.querySelectorAll(FOCUSABLE_SELECTOR)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [onClose])

  return (
    <>
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="fixed inset-0 z-[500] bg-navy-950/45"
        onClick={onClose}
      />
      <motion.div
        ref={panelRef}
        variants={drawerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="fixed inset-y-0 right-0 z-[501] flex h-full w-full max-w-[420px] flex-col bg-surface shadow-drawer"
        role="dialog"
        aria-modal="true"
      >
        {children}
      </motion.div>
    </>
  )
}

export function DrawerHeader({ title, onClose }) {
  return (
    <div className="flex flex-none items-center justify-between border-b border-border px-7 py-6">
      <span className="font-heading text-[17px] font-bold text-ink-900">{title}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 hover:bg-surface-muted hover:text-ink-900 cursor-pointer"
      >
        <X size={18} />
      </button>
    </div>
  )
}

export function DrawerBody({ children }) {
  return <div className="flex flex-1 flex-col gap-[18px] overflow-y-auto px-7 py-6">{children}</div>
}

export function DrawerFooter({ children }) {
  return <div className="flex flex-none gap-2.5 border-t border-border px-7 py-5">{children}</div>
}
