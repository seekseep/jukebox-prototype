import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'

import { useGetTeacherPath } from '@rooms/hooks/router'
import { useRelationQuery, useDeleteRelationMutation } from '@rooms/hooks/relations'

export default function DeleteTeacherRelation () {
  const { query:{ roomId, teacherId, relationId }, replace } = useRouter()
  const getTeacherPath = useGetTeacherPath(roomId, teacherId)

  const {
    mutate,
    ...result
  } = useRelationQuery(roomId, relationId)
  const [deleteRelation, {
    isSuccess: isDeleted,
    isLoading: isDeleting,
    error: deletingError
  }] = useDeleteRelationMutation(roomId, relationId)

  const handleSubmit = useCallback(() => {
    if (!confirm('講師の関係性を削除しますか')) return
    deleteRelation()
  }, [deleteRelation])

  useEffect(() => {
    if (!isDeleted) return
    toast.success('講師の関係性を削除しました')
    mutate(undefined)
    replace(getTeacherPath('/relations'))
  }, [getTeacherPath, isDeleted, mutate, replace])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>講師の関係性の削除</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            <ErrorAlert error={deletingError} />
            <CardBody>
              <FormActions>
                <Button disabled={isDeleting} danger type="button" onClick={handleSubmit}>講師の関係性を削除する</Button>
              </FormActions>
            </CardBody>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
