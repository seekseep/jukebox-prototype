import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import { useIsActive } from '@/hooks/router'

export function Dashboard ({ title, children }) {
  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      <div className="flex min-h-screen">{children}</div>
    </>
  )
}

export function DashboardNavigation ({ children }) {
  return <nav className="bg-gray-800 text-white w-48 border-r border-gray-600 flex-shrink-0">{children}</nav>
}

export function DashboardMain ({ children }) {
  return <main className="flex-grow bg-gray-50">{children}</main>
}

export function DashboardContents ({ children }) {
  return <div className="max-w-4xl flex flex-col gap-4 items-stretch py-4">{children}</div>
}

export function DashboardHeader ({ children }) {
  return <header className="sticky top-0 bg-white border-b h-12 flex items-center px-4">{children}</header>
}

export function DashboardPageTitle ({ children }) {
  return <h1 className="text-2xl">{children}</h1>
}

export function DashboardSection ({ children }) {
  return <section className="flex flex-col gap-4 p-4">{children}</section>
}

export function DashboardSectionTitle ({ children }) {
  return <h2 className="text-xl">{children}</h2>
}

export function DashboardNavigationLink ({ href, exact = false, children }) {
  const { asPath: currentPathname } = useRouter()
  const isActive = useIsActive(href, currentPathname, exact)

  return (
    <Link href={href} passHref>
      <a className={classNames('text-sm p-2 cursor-point hover:bg-white/5', { 'bg-white/10': isActive })}>
        {children}
      </a>
    </Link>
  )
}
