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
import { useRoomQuery, useDeleteRoomMutation } from '@rooms/hooks/rooms'

export default function DeleteRoom () {
  const { query:{ roomId }, replace } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  const {
    mutate,
    ...result
  } = useRoomQuery(roomId)
  const [deleteRoom, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteRoomMutation(roomId)

  const handleSubmit = useCallback(() => {
    if (!confirm('教室を削除しますか')) return
    deleteRoom()
  }, [deleteRoom])

  useEffect(() => {
    if (!isDeleted) return
    toast.success('教室を削除しました')
    mutate(undefined)
    replace(getRoomPath('/rooms'))
  }, [getRoomPath, isDeleted, mutate, replace])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>教室の削除</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            <CardBody>
              <ErrorAlert error={deletingError} />
              <FormActions>
                <Button danger type="button" onClick={handleSubmit}>教室を削除する</Button>
              </FormActions>
            </CardBody>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
