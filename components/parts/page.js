import classNames from 'classnames'
import Link from 'next/link'

export function PageSection ({ id, className, children }) {
  return (
    <div id={id} className={classNames(className, 'w-96 px-4 py-6 flex flex-col gap-4')}>
      {children}
    </div>
  )
}

export function PageSectionTitle ({ children }) {
  return (
    <div className="text-lg font-bold">{children}</div>
  )
}

export function PageNavigation ({ children }) {
  return (
    <div className="flex flex-col gap-2 w-48">
      {children}
    </div>
  )
}

export function PageNavigationItem ({ href, children }) {
  return (
    <Link href={href} passHref>
      <a className="block px-3 py-1">
        {children}
      </a>
    </Link>
  )
}

export function NagivatedPage ({ children }) {
  return (
    <div className="flex flex-row">{children}</div>
  )
}
