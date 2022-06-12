import  { DashboardFullScreenSection } from '@/components/parts/dashboard'
import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewCalendar from '@rooms/components/features/calendar/ViewCalendar'

export default function Calendar () {
  return (
    <RoomDashboard title="カレンダー" noPadding>
      <DashboardFullScreenSection>
        <ViewCalendar />
      </DashboardFullScreenSection>
    </RoomDashboard>
  )
}
