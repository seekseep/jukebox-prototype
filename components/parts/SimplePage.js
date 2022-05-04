import classNames from 'classnames'

export default function SimplePage ({ children, size = 'lg' }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className={classNames('mx-auto px-4 py-16 flex flex-col gap-8', {
        'max-w-lg' : size === 'lg',
        'max-w-xl' : size === 'xl',
        'max-w-2xl': size === '2xl',
        'max-w-3xl': size === '3xl',
        'max-w-4xl': size === '4xl',
      })}>
        {children}
      </div>
    </div>
  )
}

export function PageTitle ({ children }) {
  return (
    <h1 className="text-xl m-0">{children}</h1>
  )
}
