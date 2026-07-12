import { createContext, useContext, useState } from 'react'
import ContactModal from '../components/ContactModal.jsx'

const ContactModalContext = createContext(null)

export function ContactModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ContactModalContext.Provider value={{ openContact: () => setIsOpen(true) }}>
      {children}
      {isOpen && <ContactModal onClose={() => setIsOpen(false)} />}
    </ContactModalContext.Provider>
  )
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext)
  if (!ctx) {
    throw new Error('useContactModal must be used within a ContactModalProvider')
  }
  return ctx
}
