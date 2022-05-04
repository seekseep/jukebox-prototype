import Head from 'next/head'
import Link from 'next/link'
import classNames from 'classnames'

import { useGetNavLinkProps } from './hooks'

function NavLink ({ className, href, children }) {
  return (
    <Link href={href} passHref>
      <a className={classNames('', className)}>
        {children}
      </a>
    </Link>
  )
}

export default function AdminDashboard ({ children }) {
  const getNavLinkProps = useGetNavLinkProps()

  return (
    <>
      <Head>
        <title>管理 | JUKEBOX</title>
      </Head>
      <div className="flex min-h-screen">
        <div className="w-64 bg-gray-800 border-r border-gray-700">
          <div className="text-center bg-gray-900 text-white p-4 leading-none gap-2 flex flex-row justify-center items-center">
            <div className="text-xl">🚧</div>
            <div className="font-bold">JUKEBOX</div>
          </div>
          <div className="flex flex-col py-8">
            <NavLink {...getNavLinkProps({ pathname: '/schools' })}>学校</NavLink>
          </div>
        </div>
        <div className="flex-grow bg-gray-50">
          <div className="max-w-4xl p-4">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export function AdminDashboardTitle ({ ...props }) {
  return <h1 className="text-3xl text-gray-800 py-3" {...props} />
}

export function AdminDashboardSection ({ ...props }) {
  return (
    <section className="flex flex-col gap-4 p-4"  {...props} />
  )
}

export function AdminDashboardSectionTitle ({ ...props }) {
  return <h2 className="text-2xl text-gray-800 py-2" {...props} />
}
