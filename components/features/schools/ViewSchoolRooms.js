import { useSchoolRooms } from '../../../hooks/schools'

import RoomList from '../../parts/rooms/RoomList'

export default function ViewSchoolRooms ({ schoolId }) {
  const rooms = useSchoolRooms(schoolId)

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="text-lg">教室の一覧</div>
      {rooms && <RoomList rooms={rooms} />}
    </div>
  )
}
