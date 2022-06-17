import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import Card from '@/components/parts/Card'
import { MultiSuspension } from '@/components/parts/Suspension'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { LinkButton } from '@/components/parts/buttons'

import { useGetRoomPath } from '@rooms/hooks/router'
import {
  useStudentsQuery,
  useUpdateStudentsMutation,
  useDeleteStudentsMutation,
  useDownlaodStudentsCalendars
} from '@rooms/hooks/students'
import StudentsManager from '@rooms/components/parts/students/StudentsManager'
import { useTeachersQuery } from '@rooms/hooks/teachers'
import { useRelationsQuery } from '@rooms/hooks/relations'
import { useSchedulesQuery } from '@rooms/hooks/schedules'
import { useLessonsQuery } from '@rooms/hooks/lessons'
import { useSubjectsQuery } from '@rooms/hooks/subjects'

export default function ManageStudents () {
  const { query:{ roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  const teachersResult = useTeachersQuery(roomId)
  const studentsResult = useStudentsQuery(roomId)
  const relationsResult = useRelationsQuery(roomId)
  const schedulesResult = useSchedulesQuery(roomId)
  const lessonsResult = useLessonsQuery(roomId)
  const subjectsResult = useSubjectsQuery(roomId)

  const { mutate } = studentsResult

  const [deleteStudents, deleteStudentResult] = useDeleteStudentsMutation(roomId)
  useEffect(() => {
    if (!deleteStudentResult.isSuccess) return
    toast.success('生徒を削除しました')
    mutate()
  }, [deleteStudentResult.isSuccess, mutate])

  const [updateStudents, updateStudentResult] = useUpdateStudentsMutation(roomId)
  useEffect(() => {
    if (!updateStudentResult.isSuccess) return
    toast.success('生徒を更新しました')
    mutate()
  }, [updateStudentResult.isSuccess, mutate])

  const [downloadStudentsCalendars, downloadResult] = useDownlaodStudentsCalendars(roomId, {
    teachers : teachersResult.data,
    students : studentsResult.data,
    relations: relationsResult.data,
    schedules: schedulesResult.data,
    lessons  : lessonsResult.data,
    subjects : subjectsResult.data,
  })

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>生徒の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/students/new')}>生徒を登録する</LinkButton>
        </div>
      </FeatureHead>
      <MultiSuspension results={[
        studentsResult,
        // NOTE: Resrouces
        teachersResult,
        relationsResult,
        schedulesResult,
        lessonsResult,
        subjectsResult
      ]}>
        {({ data: [students] }) => (
          <Card>
            <StudentsManager
              roomId={roomId} students={students}
              onDownloadStudentsCalendars={({ studentIds, options }) => downloadStudentsCalendars({ studentIds, options })}
              downloadResult={downloadResult}
              onUpdateStudents={({ students }) => updateStudents({ students })}
              updateResult={updateStudentResult}
              onDeleteStudents={({ students }) => deleteStudents(students.map(({ id }) => id))} />
          </Card>
        )}
      </MultiSuspension>
    </Feature>
  )
}
