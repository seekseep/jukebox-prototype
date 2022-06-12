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
import { useDeleteTeacherMutation, useTeacherQuery } from '@rooms/hooks/teachers'

export default function DeleteTeacher () {
  const { query:{ roomId, teacherId }, replace } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  const {
    mutate,
    ...result
  } = useTeacherQuery(roomId, teacherId)
  const [deleteTeacher, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteTeacherMutation(roomId, teacherId)

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
      <Suspension {...result}>
        {() => (
          <Card>
            <CardBody>
              <ErrorAlert error={deletingError} />
              <FormActions>
                <Button color="danger" type="button" onClick={handleSubmit}>講師を削除する</Button>
              </FormActions>
            </CardBody>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
