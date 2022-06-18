import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import Card from '@/components/parts/Card'
import { MultiSuspension } from '@/components/parts/Suspension'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { LinkButton } from '@/components/parts/buttons'

import { useGetRoomPath } from '@rooms/hooks/router'
import {
  useTeachersQuery,
  useUpdateTeachersMutation,
  useDeleteTeachersMutation,
  useDownlaodTeacherCalendars
} from '@rooms/hooks/teachers'
import TeachersManager from '@rooms/components/parts/teachers/TeachersManager'
import { useRelationsQuery } from '@rooms/hooks/relations'
import { useSchedulesQuery } from '@rooms/hooks/schedules'
import { useLessonsQuery } from '@rooms/hooks/lessons'
import { useSubjectsQuery } from '@rooms/hooks/subjects'
import { useStudentsQuery } from '@rooms/hooks/students'

export default function ManageTeachers () {
  const { query:{ roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  const teachersResult = useTeachersQuery(roomId)
  const studentsResult = useStudentsQuery(roomId)
  const relationsResult = useRelationsQuery(roomId)
  const schedulesResult = useSchedulesQuery(roomId)
  const lessonsResult = useLessonsQuery(roomId)
  const subjectsResult = useSubjectsQuery(roomId)

  const { mutate } = teachersResult

  const [deleteTeachers, deleteTeacherResult] = useDeleteTeachersMutation(roomId)
  useEffect(() => {
    if (!deleteTeacherResult.isSuccess) return
    toast.success('講師を削除しました')
    mutate()
  }, [deleteTeacherResult.isSuccess, mutate])

  const [updateTeachers, updateTeacherResult] = useUpdateTeachersMutation(roomId)
  useEffect(() => {
    if (!updateTeacherResult.isSuccess) return
    toast.success('講師を更新しました')
    mutate()
  }, [updateTeacherResult.isSuccess, mutate])

  const [downloadTeachersCalendars, downloadResult] = useDownlaodTeacherCalendars(roomId, {
    students : studentsResult.data,
    teachers : teachersResult.data,
    relations: relationsResult.data,
    schedules: schedulesResult.data,
    lessons  : lessonsResult.data,
    subjects : subjectsResult.data,
  })

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>講師の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/teachers/new')}>講師を登録する</LinkButton>
        </div>
      </FeatureHead>
      <MultiSuspension results={[
        teachersResult,
        // NOTE: Resrouces
        teachersResult,
        relationsResult,
        schedulesResult,
        lessonsResult,
        subjectsResult
      ]}>
        {({ data: [teachers] }) => (
          <Card>
            <TeachersManager
              roomId={roomId} teachers={teachers}
              onDownloadTeachersCalendars={({ teacherIds, options }) => downloadTeachersCalendars({ teacherIds, options })}
              downloadResult={downloadResult}
              onUpdateTeachers={({ teachers }) => updateTeachers({ teachers })}
              updateResult={updateTeacherResult}
              onDeleteTeachers={({ teachers }) => deleteTeachers(teachers.map(({ id }) => id))} />
          </Card>
        )}
      </MultiSuspension>
    </Feature>
  )
}
