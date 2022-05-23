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
import { useDeleteSheetMutation, useSheetQuery } from '@rooms/hooks/sheets'

export default function DeleteSheet () {
  const { query:{ roomId, sheetId }, replace } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  const {
    mutate,
    ...result
  } = useSheetQuery(roomId, sheetId)
  const [deleteSheet, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteSheetMutation(roomId, sheetId)

  const handleSubmit = useCallback(() => {
    if (!confirm('席を削除しますか')) return
    deleteSheet()
  }, [deleteSheet])

  useEffect(() => {
    if (!isDeleted) return
    toast.success('席を削除しました')
    mutate(undefined)
    replace(getRoomPath('/sheets'))
  }, [getRoomPath, isDeleted, mutate, replace])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>席の削除</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            <CardBody>
              <ErrorAlert error={deletingError} />
              <FormActions>
                <Button danger type="button" onClick={handleSubmit}>席を削除する</Button>
              </FormActions>
            </CardBody>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
