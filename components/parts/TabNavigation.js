import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'

import { useIsActive } from '@/hooks/router'

export default function TabNavigation ({ children }) {
  return (
    <nav className="border-b flex flex-row gap-2 py-2">
      {children}
    </nav>
  )
}

export function Tab ({ href, children, exact = false }) {
  const { asPath: currentPathname } = useRouter()

  const isActive = useIsActive(href, currentPathname, exact)

  return (
    <Link href={href}>
      <a className={classNames('rounded px-3 py-1 block', {
      'bg-blue-100 text-blue-500 text-bold': isActive,
      'text-blue-500'                      : !isActive,
    })}>{children}</a>
    </Link>
  )
}
