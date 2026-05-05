import { SelectHTMLAttributes } from 'react'

interface Option {
  value: string
  label: string
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: Option[]
}

export default function Select({ label, error, options, className = '', id, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white ${error ? 'border-red-300' : 'border-gray-300'} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
}
