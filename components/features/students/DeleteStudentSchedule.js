import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useDeleteStudent, useStudentSchedule } from '@/hooks/students'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { Button } from '@/components/parts/buttons'
import Loading from '@/components/parts/Loading'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { useGetStudentPath } from '@/hooks/router'

export default function DeleteStudentSchedule () {
  const { query:{ roomId, studentId, scheduleId }, replace } = useRouter()
  const getStudentPath = useGetStudentPath(roomId, studentId)

  const {
    isLoading,
    error: gettingError,
    isSuccess: isReady,
    mutate
  } = useStudentSchedule(roomId, studentId, scheduleId)
  const [deleteStudent, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteStudent(roomId, studentId, scheduleId)

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
        <FeatureTitle>生徒の予定の削除</FeatureTitle>
      </FeatureHead>
      {isLoading && <Loading />}
      {gettingError && <ErrorAlert error={gettingError} />}
      {deletingError && <ErrorAlert error={deletingError} />}
      {isReady && (
        <Card>
            <CardBody>
              <div className="flex flex-row-reverse">
                <Button danger type="button" onClick={handleSubmit}>生徒の予定の情報を削除する</Button>
              </div>
            </CardBody>
        </Card>
      )}
    </Feature>
  )
}
