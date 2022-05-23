import { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  Dashboard,
  DashboardContents,
  DashboardNavigation,
  DashboardHeader,
  DashboardMain,
  DashboardNavigationLink as DNavLink
} from '@/components/parts/dashboard'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useRoomQuery } from '@rooms/hooks/rooms'

export default function RoomDashboard ({ title, children }) {
  const { query: { roomId } } = useRouter()
  const { data: room } = useRoomQuery(roomId)
  const getRoomPath = useGetRoomPath(roomId)

  const roomName = useMemo(() => room?.name || '教室', [room?.name], [])
  const pageTitle = useMemo(() => title ? `${title} | ${roomName}` : roomName, [roomName, title])

  return (
    <Dashboard title={pageTitle}>
      <DashboardNavigation>
        <div className="border-b border-gray-600 h-12">
          <Link href="/">
            <a className="block px-4 py-3 text-center font-bold">JUKE BOX</a>
          </Link>
        </div>
        <div className="flex flex-col py-8">
          <DNavLink href={getRoomPath('/')} exact>ホーム</DNavLink>
          <DNavLink href={getRoomPath('/students')}>生徒</DNavLink>
          <DNavLink href={getRoomPath('/teachers')}>講師</DNavLink>
          <DNavLink href={getRoomPath('/sheets')}>席</DNavLink>
          <DNavLink href={getRoomPath('/subjects')}>科目</DNavLink>
          <DNavLink href={getRoomPath('/lessons')}>授業</DNavLink>
          <DNavLink href={getRoomPath('/parents')}>保護者</DNavLink>
          <DNavLink href={getRoomPath('/settings')}>教室</DNavLink>
        </div>
      </DashboardNavigation>
      <DashboardMain>
        <DashboardHeader>
          <Link href={getRoomPath('/')}>{roomName}</Link>
        </DashboardHeader>
        <DashboardContents>
          {typeof children === 'function' ? children({ getRoomPath }) : children}
        </DashboardContents>
      </DashboardMain>
    </Dashboard>
  )
}