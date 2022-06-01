import { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  Dashboard,
  DashboardContents,
  DashboardNavigation,
  DashboardNavigationHeader,
  DashboardNavigationBody,
  DashboardMain,
  DashboardHeader,
  DashboardNavigationLink as DNavLink
} from '@/components/parts/dashboard'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useRoomQuery } from '@rooms/hooks/rooms'
import { useCurrentAccount } from '@rooms/hooks/accounts'
import AccountTypeLabel from '@rooms/components/parts/accounts/AccountTypeLabel'

// NOTE: 絵文字などの特殊な文字を含む文字列の１文字目を取る
function getFirstChar (string) {
  if(!string) return ''
  return Array.from(string)[0]
}

export default function RoomDashboard ({ title, children }) {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  const { data: room } = useRoomQuery(roomId)
  const { data: account } = useCurrentAccount(roomId)

  const pageTitle = useMemo(() => {
    const roomName = room?.name || '教室'
    return title ? `${title} | ${roomName}` : roomName
  }, [room?.name, title])

  return (
    <Dashboard title={pageTitle}>
      <DashboardNavigation>
        <DashboardNavigationHeader>
          <Link href="/">
            <a className="text-center text-lg font-bold p-2">JUKE BOX</a>
          </Link>
        </DashboardNavigationHeader>
        <DashboardNavigationBody>
          <DNavLink href={getRoomPath('/')} exact>ホーム</DNavLink>
          <DNavLink href={getRoomPath('/students')}>生徒</DNavLink>
          <DNavLink href={getRoomPath('/teachers')}>講師</DNavLink>
          <DNavLink href={getRoomPath('/sheets')}>席</DNavLink>
          <DNavLink href={getRoomPath('/subjects')}>科目</DNavLink>
          <DNavLink href={getRoomPath('/lessons')}>授業</DNavLink>
          <DNavLink href={getRoomPath('/parents')}>保護者</DNavLink>
          <DNavLink href={getRoomPath('/settings')}>教室</DNavLink>
        </DashboardNavigationBody>
      </DashboardNavigation>
      <DashboardMain>
        <DashboardHeader>
          <div className="flex flex-row justify-between w-full">
            <Link href={getRoomPath('/')}>
              <a className="text-lg font-bold px-2 leading-10">
                {room?.name}
              </a>
            </Link>
            <div className="flex gap-3 items-center px-2">
              {account && (
                <>
                  <div className="w-10 h-10 bg-gray-100 text-gray-800 rounded-full flex justify-center items-center">
                    <div>{getFirstChar(account?.name)}</div>
                  </div>
                  <div className="grow">{account?.name}</div>
                  <div className="w-16 shrink-0 text-xs bg-gray-100 text-gray-900 px-2 text-center py-1 rounded">
                    <AccountTypeLabel type={account?.type} />
                  </div>
                </>
              )}
            </div>
          </div>
        </DashboardHeader>
        <DashboardContents>
          {typeof children === 'function' ? children({ getRoomPath }) : children}
        </DashboardContents>
      </DashboardMain>
    </Dashboard>
  )
}
