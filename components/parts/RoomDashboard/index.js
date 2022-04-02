import Link from 'next/link'

import classNames from 'classnames'

import { useGetRoomLink, useRoom } from '../../../hooks/rooms'

import { useGetNavLinkProps  }from'./hooks'

function NavLink ({ className, href, children }) {
  return (
    <Link href={href} passHref>
      <a className={classNames('', className)}>
        {children}
      </a>
    </Link>
  )
}

export default function RoomDashboard ({ roomId, children }) {
  const room = useRoom(roomId)

  const getRoomLink = useGetRoomLink(roomId)
  const getNavLinkProps = useGetNavLinkProps({ roomId })

  return (
    <>
      <div className="flex min-h-screen">
        <nav className="bg-gray-800 text-white w-48 border-r border-gray-600 flex-shrink-0">
          <div className="border-b border-gray-600 h-12">
            <Link href="/">
              <a className="block px-4 py-3 text-center font-bold">JUKE BOX</a>
            </Link>
          </div>
          <div className="flex flex-col py-8">
            <NavLink {...getNavLinkProps({ pathname: '/schedules'})}>授業予定</NavLink>
            <NavLink {...getNavLinkProps({ pathname: '/students'})}>生徒</NavLink>
            <NavLink {...getNavLinkProps({ pathname: '/teachers'})}>講師</NavLink>
            <NavLink {...getNavLinkProps({ pathname: '/subjects'})}>科目</NavLink>
            <NavLink {...getNavLinkProps({ pathname: '/settings'})}>設定</NavLink>
          </div>
        </nav>
        <main className="flex-grow bg-gray-50">
          <header className="sticky top-0 bg-white border-b h-12 flex items-center px-4">
            <Link href={getRoomLink()}>
              <a>{room?.name}</a>
            </Link>
          </header>
          <div className="max-w-4xl flex flex-col gap-4 items-stretch py-4">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}

export function RoomDashboardTitle ({ ...props }) {
  return <h1 className="text-3xl text-gray-800 py-3" {...props} />
}

export function RoomDashboardSection ({...props}) {
  return (
    <section className="flex flex-col gap-4 p-4"  {...props} />
  )
}

export function RoomDashboardSectionTitle ({ ...props }) {
  return <h2 className="text-2xl text-gray-800 py-2" {...props} />
}
