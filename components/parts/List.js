import classNames from 'classnames'
import Link from 'next/link'
import { createElement, forwardRef } from 'react'

export default function List ({ className, children }) {
  return (
    <ul className={classNames('flex flex-col', className)}>
      {children}
    </ul>
  )
}

export const Item = forwardRef(function Item ({ type = 'div', className = '', children, ...props }, ref) {
  return createElement(type, {
    ref,
    className: classNames(className, 'block p-1 border-b'),
    ...props
  }, children)
})

export function LinkItem ({ href, ...props }) {
  return (
    <Link href={href} passHref>
      <Item type="a" {...props} />
    </Link>
  )
}
