import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useDeleteTeacher, useTeacher } from '@/hooks/teachers'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { Button } from '@/components/parts/buttons'
import Loading from '@/components/parts/Loading'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { useGetRoomPath } from '@/hooks/router'

export default function DeleteTeacher () {
  const { query:{ roomId, teacherId }, replace } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  const {
    isLoading,
    error: gettingError,
    isSuccess: isReady,
    mutate
  } = useTeacher(roomId, teacherId)
  const [deleteTeacher, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteTeacher(roomId, teacherId)

  const handleSubmit = useCallback(() => {
    if (!confirm('講師を削除しますか')) return
    deleteTeacher()
  }, [deleteTeacher])

  useEffect(() => {
    if (!isDeleted) return
    toast.success('講師を削除しました')
    mutate(undefined)
    replace(getRoomPath('/teachers'))
  }, [getRoomPath, isDeleted, mutate, replace])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>講師の削除</FeatureTitle>
      </FeatureHead>
      {isLoading && <Loading />}
      {gettingError && <ErrorAlert error={gettingError} />}
      {deletingError && <ErrorAlert error={deletingError} />}
      {isReady && (
        <Card>
            <CardBody>
              <div className="flex flex-row-reverse">
                <Button danger type="button" onClick={handleSubmit}>講師の情報を削除する</Button>
              </div>
            </CardBody>
        </Card>
      )}
    </Feature>
  )
}
