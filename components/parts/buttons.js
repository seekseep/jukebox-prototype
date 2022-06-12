import classNames from 'classnames'
import Link from 'next/link'
import { useMemo } from 'react'

function useClassName({ disabled, size = 'md', color = 'primary', className }) {
  return useMemo(() => {
    return classNames(
      'rounded p-2 leading-none border block',
      {
        'text-sm'                                                     : size === 'sm',
        'border-blue-600 bg-blue-500 text-white active:bg-blue-600'   : color === 'primary',
        'border-gray-300 bg-gray-200 text-gray-900 active:bg-gray-300': color === 'secondary',
        'border-red-600 bg-red-500 text-white active:bg-red-600'      : color === 'danger',
        'opacity-50'                                                  : disabled
      },
      className
    )
  }, [className, color, disabled, size])
}

export function Button ({ size, color, disabled = false, ...props }) {
  const className = useClassName({ color, size, disabled, ...props })
  return (
    <button {...props} className={className} />
  )
}

export function LinkButton ({ href, size, color, disabled = false, ...props }) {
  const className = useClassName({ size, color, disabled, ...props })
  return (
    <Link href={href}>
      <a className={className}  {...props} />
    </Link>
  )
}
