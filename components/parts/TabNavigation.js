import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'


export default function TabNavigation ({ children }) {
  return (
    <nav className="border-b flex gap-2 flex-wrap py-2">
      {children}
    </nav>
  )
}

export function Tab ({ href, children, exact = false }) {
  const { asPath: currentPathname,  } =useRouter()
  const isActive= useMemo(() => {
    if (exact) return href === currentPathname
    return new RegExp(`^${href}`).test(currentPathname)
  }, [currentPathname, exact, href])

  return (
    <Link href={href} passHref>
      <a className={
        classNames(
          'px-2 py-1 rounded',
          {
            'bg-blue-100 text-blue-600'   : isActive,
            'bg-transparent text-blue-500': !isActive,
          }
        )
      }>
        {children}
      </a>
    </Link>
  )
}
