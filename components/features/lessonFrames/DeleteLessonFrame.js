import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useGetRoomPath } from '@/hooks/router'
import { useDeleteLessonFrame, useLessonFrame } from '@/hooks/lessonFrames'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { Button } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'

export default function DeleteLessonFrame () {
  const { query:{ roomId, lessonFrameId }, replace } = useRouter()
  const getRoomPath = useGetRoomPath()

  const {
    mutate,
    ...result
  } = useLessonFrame(roomId, lessonFrameId)

  const [deleteLessonFrame, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteLessonFrame(roomId, lessonFrameId)

  const handleSubmit = useCallback(() => {
    if (!confirm('授業枠を削除しますか')) return
    deleteLessonFrame()
  }, [deleteLessonFrame])

  useEffect(() => {
    if (!isDeleted) return
    toast.success('授業枠を削除しました')
    mutate(undefined)
    replace(getRoomPath('/settings/lessonFrames'))
  }, [getRoomPath, isDeleted, mutate, replace])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業枠の削除</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            <CardBody>
              {deletingError && <ErrorAlert error={deletingError} />}
              <div className="flex flex-row-reverse">
                <Button danger type="button" onClick={handleSubmit}>授業枠を削除する</Button>
              </div>
            </CardBody>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
