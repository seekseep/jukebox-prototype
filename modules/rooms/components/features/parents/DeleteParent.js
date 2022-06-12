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
import { useDeleteParentMutation, useParentQuery } from '@rooms/hooks/parents'

export default function DeleteParent () {
  const { query:{ roomId, parentId }, replace } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  const {
    mutate,
    ...result
  } = useParentQuery(roomId, parentId)
  const [deleteParent, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteParentMutation(roomId, parentId)

  const handleSubmit = useCallback(() => {
    if (!confirm('保護者を削除しますか')) return
    deleteParent()
  }, [deleteParent])

  useEffect(() => {
    if (!isDeleted) return
    toast.success('保護者を削除しました')
    mutate(undefined)
    replace(getRoomPath('/parents'))
  }, [getRoomPath, isDeleted, mutate, replace])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>保護者の削除</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            <CardBody>
              <ErrorAlert error={deletingError} />
              <FormActions>
                <Button color="danger" type="button" onClick={handleSubmit}>保護者を削除する</Button>
              </FormActions>
            </CardBody>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
