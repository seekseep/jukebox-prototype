import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Button } from '@/components/parts/buttons'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import Suspension from '@/components/parts/Suspension'

import { useDeleteSchedule, useScheduleQuery } from '@rooms/hooks/schedules'
import { useGetStudentPath } from '@rooms/hooks/router'

export default function DeleteStudentSchedule () {
  const { query:{ roomId, studentId, scheduleId }, replace } = useRouter()
  const getStudentPath = useGetStudentPath(roomId, studentId)

  const {
    mutate,
    ...result
  } = useScheduleQuery(roomId, scheduleId)
  const [deleteStudent, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteSchedule(roomId, scheduleId)

  const handleSubmit = useCallback(() => {
    if (!confirm('生徒の予定を削除しますか')) return
    deleteStudent()
  }, [deleteStudent])

  useEffect(() => {
    if (!isDeleted) return
    toast.success('生徒の予定を削除しました')
    mutate(undefined)
    replace(getStudentPath('/schedules'))
  }, [getStudentPath, isDeleted, mutate, replace])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>予定の削除</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            <CardBody>
            {deletingError && <ErrorAlert error={deletingError} />}
              <div className="flex flex-row-reverse">
                <Button color="danger" type="button" onClick={handleSubmit}>生徒の予定を削除する</Button>
              </div>
            </CardBody>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
