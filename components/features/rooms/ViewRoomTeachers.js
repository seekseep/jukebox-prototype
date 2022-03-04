import { useTeachersByRoomId } from '../../../hooks/rooms'

import TeacherList from '../../parts/teachers/TeacherList'

export default function ViewRoomTeachers ({ roomId }) {
  const teachers = useTeachersByRoomId(roomId)

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="text-lg">講師一覧</div>
      {teachers && <TeacherList teachers={teachers} />}
    </div>
  )
}
