import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Button } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { FormActions } from '@/components/parts/forms'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useDeleteSubjectMutation, useSubjectQuery } from '@rooms/hooks/subjects'

export default function DeleteSubject () {
  const { query:{ roomId, subjectId }, replace } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  const {
    mutate,
    ...result
  } = useSubjectQuery(roomId, subjectId)
  const [deleteSubject, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteSubjectMutation(roomId, subjectId)

  const handleSubmit = useCallback(() => {
    if (!confirm('科目を削除しますか')) return
    deleteSubject()
  }, [deleteSubject])

  useEffect(() => {
    if (!isDeleted) return
    toast.success('科目を削除しました')
    mutate(undefined)
    replace(getRoomPath('/subjects'))
  }, [getRoomPath, isDeleted, mutate, replace])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>科目の削除</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            <CardBody>
              <ErrorAlert error={deletingError} />
              <FormActions>
                <Button danger type="button" onClick={handleSubmit}>科目を削除する</Button>
              </FormActions>
            </CardBody>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
