import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useDeleteStudent, useStudent } from '@/hooks/students'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { Button } from '@/components/parts/buttons'
import Loading from '@/components/parts/Loading'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { useGetRoomPath } from '@/hooks/router'

export default function DeleteStudent () {
  const { query:{ roomId, studentId }, replace } = useRouter()
  const getRoomPath = useGetRoomPath()

  const {
    isLoading,
    error: gettingError,
    isSuccess: isReady,
    mutate
  } = useStudent(roomId, studentId)
  const [deleteStudent, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteStudent(roomId, studentId)

  const handleSubmit = useCallback(() => {
    if (!confirm('生徒を削除しますか')) return
    deleteStudent()
  }, [deleteStudent])

  useEffect(() => {
    if (!isDeleted) return
    toast.success('生徒を削除しました')
    mutate(undefined)
    replace(getRoomPath('/students'))
  }, [getRoomPath, isDeleted, mutate, replace])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>生徒の削除</FeatureTitle>
      </FeatureHead>
      {isLoading && <Loading />}
      {gettingError && <ErrorAlert error={gettingError} />}
      {deletingError && <ErrorAlert error={deletingError} />}
      {isReady && (
        <Card>
            <CardBody>
              <div className="flex flex-row-reverse">
                <Button danger type="button" onClick={handleSubmit}>生徒の情報を削除する</Button>
              </div>
            </CardBody>
        </Card>
      )}
    </Feature>
  )
}
