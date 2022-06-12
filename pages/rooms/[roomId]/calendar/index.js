import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewLessonsCalendar from '@rooms/components/features/calendar/ViewLessonsCalendar'

export default function Calendar () {
  return (
    <RoomDashboard title="カレンダー" noPadding>
      <ViewLessonsCalendar />
    </RoomDashboard>
  )
}
