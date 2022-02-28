import Head from 'next/head'

import {
  useCurrentRoom
} from '../../../../hooks/rooms'

import {
  DashboardTitle,
  DashboardHead
} from '../../../../components/Dashboard'
import OwnerDashboard from '../../../../components/OwnerDashboard'

export default function Room () {
  const room = useCurrentRoom()

  return (
    <>
      <Head>
        <title>{room?.name || "読込中"} | 生徒一覧</title>
      </Head>
      <OwnerDashboard>
        <DashboardHead>
          <DashboardTitle>生徒一覧</DashboardTitle>
        </DashboardHead>
        <div className="p-6 max-w-xl flex flex-col gap-4">
          <div className="border rounded w-full h-72"></div>
        </div>
      </OwnerDashboard>
    </>
  )
}
