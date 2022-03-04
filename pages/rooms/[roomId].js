import { useCurrentRoomId } from '../../hooks/rooms'

import ViewRoomHead from '../../components/features/rooms/ViewRoomHead'
import ViewRoomBreadcrumb from '../../components/features/rooms/ViewRoomBreadcrumb'
import ViewRoom from '../../components/features/rooms/ViewRoom'
import ViewRoomTeachers from '../../components/features/rooms/ViewRoomTeachers'
import ViewRoomStudents from '../../components/features/rooms/ViewRoomStudents'
import ViewRoomLessons from '../../components/features/rooms/ViewRoomLessons'

export default function Rooms () {
  const currentRoomId = useCurrentRoomId()

  return (
    <>
      <ViewRoomHead roomId={currentRoomId} />
      <ViewRoomBreadcrumb roomId={currentRoomId} />
      <ViewRoom roomId={currentRoomId} />
      <ViewRoomTeachers roomId={currentRoomId} />
      <ViewRoomStudents roomId={currentRoomId} />
      <ViewRoomLessons roomId={currentRoomId} />
    </>
  )
}
