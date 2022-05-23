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
import { useDleteLessonMutation, useLessonQuery } from '@rooms/hooks/lessons'

export default function DeleteLesson () {
  const { query:{ roomId, lessonId }, replace } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  const {
    mutate,
    ...result
  } = useLessonQuery(roomId, lessonId)
  const [deleteLesson, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDleteLessonMutation(roomId, lessonId)

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
              <ErrorAlert error={deletingError} />
              <FormActions>
                <Button danger type="button" onClick={handleSubmit}>授業を削除する</Button>
              </FormActions>
            </CardBody>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
