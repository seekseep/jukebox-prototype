import classNames from 'classnames'
import Head from 'next/head'
import Link from 'next/link'
import { createElement } from 'react'

import { useGetFamilyPath, useFamily } from '../../../hooks/families'

export default function FamilyDashboard ({ title, familyId, children }) {
  const getFamilyPath = useGetFamilyPath(familyId)
  const family = useFamily(familyId)

  return (
    <>
      {title && (
        <Head>
          <title>{title} | {family?.name}</title>
        </Head>
      )}
      <nav className="bg-white sticky top-0 border-b h-16 block">
        <div className="flex max-w-2xl mx-auto px-2 justify-between h-full">
          <Link href={getFamilyPath('/')}>
            <a className="text-blue-500 p-2 flex items-center">
              <span>{family?.name}</span>
            </a>
          </Link>
          <Link href="/families">
            <a className="text-blue-500 p-2 flex items-center">
              <span>ログアウト</span>
            </a>
          </Link>
        </div>
      </nav>
      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto flex flex-col gap-6 py-4">
          {children}
        </div>
      </main>
    </>
  )
}

export function FamilyDashboardTitle ({ type = 'h1', ...props }) {
  return createElement(type, {
     className: classNames('text-3xl text-gray-800'),
     ...props
  })
}

export function FamilyDashboardSection ({ type = 'section', ...props }) {
  return createElement(type, {
    className: classNames('flex flex-col gap-4 px-2 md:px-3'),
    ...props
 })
}

export function FamilyDashboardSectionTitle ({ type = 'h2', ...props }) {
  return createElement(type, {
     className: classNames('text-2xl text-gray-800'),
     ...props
  })
}
