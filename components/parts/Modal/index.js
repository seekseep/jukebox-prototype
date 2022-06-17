import classNames from 'classnames'

export function ModalDialog ({ size = '2xl', className, children }) {
  return (
    <div className={classNames('relative py-16 mx-auto z-[30002]', {
      'max-w-xs' : size === 'xs',
      'max-w-sm' : size === 'sm',
      'max-w-md' : size === 'md',
      'max-w-lg' : size === 'lg',
      'max-w-xl' : size === 'xl',
      'max-w-2xl': size === '2xl',
      'max-w-3xl': size === '3xl',
      'max-w-4xl': size === '4xl',
      'max-w-5xl': size === '5xl',
      'max-w-6xl': size === '6xl',
      'max-w-7xl': size === '7xl',
    })}>
      <div className={classNames(className, 'bg-white rounded shadow overflow-auto')}>
        {children}
      </div>
    </div>
  )
}

export default function Modal ({ isOpened, toggle, children }) {
  if (!isOpened) return null
  return (
    <div className="fixed inset-0 z-[3000] overflow-auto">
      <div className="absolute bg-black opacity-50 inset-0 z-[3001]" onClick={toggle} />
      {typeof children === 'function' ? children() : children}
    </div>
  )
}
