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
      <div className="min-h-screen flex">
        {children}
      </div>
    </>
  )
}

export function DashboardNavigation ({ children }) {
  return (
    <nav className="bg-gray-800 text-white w-[12rem] border-r border-gray-600 shrink-0 flex flex-col">
      {children}
    </nav>
  )
}


export function DashboardNavigationSection ({ className, children }) {
  return <div className={classNames(className, 'flex flex-col')}>{children}</div>
}

export function DashboardNavigationHeader ({ ...props }) {
  return <DashboardNavigationSection {...props} />
}

export function DashboardNavigationBody ({ ...props }) {
  return <DashboardNavigationSection className="sticky top-0" {...props} />
}

export function DashboardNavigationFooter ({ ...props }) {
  return <DashboardNavigationSection {...props} />
}


export function DashboardMain ({ children }) {
  return <main className="bg-gray-50 w-[calc(100%-12rem)]">{children}</main>
}

export function DashboardContents ({ children, noPadding = false }) {
  return (
    <div className={
      classNames({
        'py-2 pb-96': !noPadding
      })
    }>
        {children}
    </div>
  )
}

export function DashboardHeader ({ children }) {
  return <header className="sticky top-0 bg-white border-b h-12 flex items-center px-4 z-[2000]">{children}</header>
}

export function DashboardPageTitle ({ children }) {
  return <h1 className="text-2xl">{children}</h1>
}

export const DASHBOARD_SECTION_SIZE = Object.freeze({
  NONE: 'max-w-none',
  XS  : 'max-w-xs',
  SM  : 'max-w-sm',
  MD  : 'max-w-md',
  LG  : 'max-w-lg',
  XL  : 'max-w-xl',
  XL_2: 'max-w-2xl',
  XL_3: 'max-w-3xl',
  XL_4: 'max-w-4xl',
  XL_5: 'max-w-5xl',
  XL_6: 'max-w-6xl',
  XL_7: 'max-w-7xl',
  FULL: 'max-w-full',
})

export function DashboardSection ({ children, size = DASHBOARD_SECTION_SIZE.XL_4 }) {
  return <section className={classNames('flex flex-col gap-4 px-4 py-2', {
    'max-w-none': size === DASHBOARD_SECTION_SIZE.NONE,
    'max-w-xs'  : size === DASHBOARD_SECTION_SIZE.XS,
    'max-w-sm'  : size === DASHBOARD_SECTION_SIZE.SM,
    'max-w-md'  : size === DASHBOARD_SECTION_SIZE.MD,
    'max-w-lg'  : size === DASHBOARD_SECTION_SIZE.LG,
    'max-w-xl'  : size === DASHBOARD_SECTION_SIZE.XL,
    'max-w-2xl' : size === DASHBOARD_SECTION_SIZE.XL_2,
    'max-w-3xl' : size === DASHBOARD_SECTION_SIZE.XL_3,
    'max-w-4xl' : size === DASHBOARD_SECTION_SIZE.XL_4,
    'max-w-5xl' : size === DASHBOARD_SECTION_SIZE.XL_5,
    'max-w-6xl' : size === DASHBOARD_SECTION_SIZE.XL_6,
    'max-w-7xl' : size === DASHBOARD_SECTION_SIZE.XL_7,
    'max-w-full': size === DASHBOARD_SECTION_SIZE.FULL,
  })}>{children}</section>
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
