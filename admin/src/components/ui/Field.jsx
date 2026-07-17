import { useId, cloneElement, isValidElement } from 'react'

const inputClass =
  'w-full rounded-[9px] border border-border bg-surface px-3.5 py-[11px] text-[13px] text-ink-900 outline-none transition-colors duration-150 focus:border-brand-blue'

export function Field({ label, hint, error, children }) {
  const id = useId()
  const hintId = hint && !error ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const control =
    isValidElement(children) && typeof children.type === 'string'
      ? cloneElement(children, {
          id,
          'aria-describedby': errorId ?? hintId,
          'aria-invalid': error ? true : undefined,
        })
      : children

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12.5px] font-semibold text-ink-600">
        {label}
      </label>
      {control}
      {hint && !error && (
        <span id={hintId} className="text-[11.5px] text-ink-300">
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} className="text-[12px] text-danger">
          {error}
        </span>
      )}
    </div>
  )
}

export function Input({ className = '', ...props }) {
  return <input className={`${inputClass} ${className}`} {...props} />
}

export function Textarea({ className = '', ...props }) {
  return <textarea className={`${inputClass} resize-none ${className}`} {...props} />
}

export function Select({ className = '', children, ...props }) {
  return (
    <select className={`${inputClass} cursor-pointer ${className}`} {...props}>
      {children}
    </select>
  )
}
