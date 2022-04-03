import classNames from 'classnames'
import Link from 'next/link'
import { useMemo } from 'react'

function useClassName({ disabled, sm=false, primary = true, secondary = false }) {
  primary = primary && !secondary
  secondary = secondary

  return useMemo(() => {
    return classNames(
      'rounded p-2 leading-none border block',
      {
        'text-sm'                                                                       : sm,
        'border-blue-600 bg-blue-500 text-white active:bg-blue-600 hover:bg-blue-400'   : primary,
        'border-gray-300 bg-gray-200 text-gray-900 active:bg-gray-300 hover:bg-gray-100': secondary,
        'opacity-50'                                                                    : disabled
      }
    )
  }, [disabled, primary, secondary, sm])
}

export function Button ({ sm = false, primary = true, secondary = false, ...props }) {
  const className = useClassName({ sm, primary, secondary, ...props })
  return (
    <button className={className} {...props} />
  )
}

export function LinkButton ({ href, sm = false, primary = true, secondary = false, ...props }) {
  const className = useClassName({ sm, primary, secondary, ...props })
  return (
    <Link href={href}>
      <a className={className}  {...props} />
    </Link>
  )
}
