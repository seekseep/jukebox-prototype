import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useGetRoomPath } from '@/hooks/router'
import { useDeleteLesson, useLesson } from '@/hooks/lessons'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { Button } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'

export default function DeleteLesson () {
  const { query:{ roomId, lessonId }, replace } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  const {
    mutate,
    ...result
  } = useLesson(roomId, lessonId)
  const [deleteLesson, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteLesson(roomId, lessonId)

  const handleSubmit = useCallback(() => {
    if (!confirm('授業を削除しますか')) return
    deleteLesson()
  }, [deleteLesson])

  useEffect(() => {
    if (!isDeleted) return
    toast.success('授業を削除しました')
    mutate(undefined)
    replace(getRoomPath('/lessons'))
  }, [getRoomPath, isDeleted, mutate, replace])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業の削除</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
              <CardBody>
                {deletingError && <ErrorAlert error={deletingError} />}
                <div className="flex flex-row-reverse">
                  <Button danger type="button" onClick={handleSubmit}>授業を削除する</Button>
                </div>
              </CardBody>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
