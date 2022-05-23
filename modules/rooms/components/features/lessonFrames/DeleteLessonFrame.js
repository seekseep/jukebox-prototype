import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { Button } from '@/components/parts/buttons'
import { FormActions } from '@/components/parts/forms'
import Suspension from '@/components/parts/Suspension'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useDeleteLessonFrameMutation, useLessonFrameQuery } from '@rooms/hooks/lessonFrames'

export default function DeleteLessonFrame () {
  const { query:{ roomId, lessonFrameId }, replace } = useRouter()
  const getRoomPath = useGetRoomPath()

  const {
    mutate,
    ...result
  } = useLessonFrameQuery(roomId, lessonFrameId)

  const [deleteLessonFrame, {
    isLoading: isDeleting,
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteLessonFrameMutation(roomId, lessonFrameId)

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
              <ErrorAlert error={deletingError} />
              <FormActions>
                <Button disabled={isDeleting} danger type="button" onClick={handleSubmit}>授業枠を削除する</Button>
              </FormActions>
            </CardBody>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
