import Link from 'next/link'
import { Children, cloneElement } from 'react'
import classNames from 'classnames'

export default function Breadcrumb ({ children }) {
  const childrenArray = Children.toArray(children)
  const contents = childrenArray.map((child, index, children) => {
    if (index < children.length - 1) return child
    return cloneElement(child, { isLast: true, ...child.props })
  })
  return (
    <div className="flex flex-row gap-2 items-center">{contents}</div>
  )
}

export function BreadcrumbItem ({ href, isLast = false, children }) {
  const className = classNames('py-1 px-2', { 'font-bold': isLast, 'text-blue-500 unerline cursor-pointer': !!href })

  const content = href
    ? (
    <Link href={href} passHref>
      <a className={className}>{children}</a>
    </Link>
      )
    : (
    <div className={className}>{children}</div>
      )
  return (
    <>
      {content}
      {!isLast && <div className="text-gray-300">{'/'}</div>}
    </>
  )
}
