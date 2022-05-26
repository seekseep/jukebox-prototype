import classNames from 'classnames'
import Link from 'next/link'
import { useMemo } from 'react'

function useClassName({ disabled, sm = false, primary = true, secondary = false, danger = false, className }) {
  primary = primary && !secondary && !danger
  secondary = secondary && !danger
  danger = danger && !secondary

  return useMemo(() => {
    return classNames(
      'rounded p-2 leading-none border block',
      {
        'text-sm'                                                     : sm,
        'border-blue-600 bg-blue-500 text-white active:bg-blue-600'   : primary,
        'border-gray-300 bg-gray-200 text-gray-900 active:bg-gray-300': secondary,
        'border-red-600 bg-red-500 text-white active:bg-red-600'      : danger,
        'opacity-50'                                                  : disabled
      },
      className
    )
  }, [className, danger, disabled, primary, secondary, sm])
}

export function Button ({ sm = false, primary = true, secondary = false, danger = false, ...props }) {
  const className = useClassName({ sm, primary, secondary, danger, ...props })
  return (
    <button {...props} className={className} />
  )
}

export function LinkButton ({ href, sm = false, primary = true, danger = false, secondary = false, ...props }) {
  const className = useClassName({ sm, primary, secondary, danger, ...props })
  return (
    <Link href={href}>
      <a className={className}  {...props} />
    </Link>
  )
}
