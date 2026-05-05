import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className = '', id, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
}
