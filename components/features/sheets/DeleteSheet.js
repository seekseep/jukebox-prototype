import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useDeleteSheet, useSheet } from '@/hooks/sheets'
import { useGetRoomPath } from '@/hooks/router'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { Button } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'

export default function DeleteSheet () {
  const { query:{ roomId, sheetId }, replace } = useRouter()
  const getRoomPath = useGetRoomPath()

  const {
    mutate,
    ...result
  } = useSheet(roomId, sheetId)
  const [deleteSheet, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteSheet(roomId, sheetId)

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
      {()=>(
        <Card>
          <CardBody>
            {deletingError && <ErrorAlert error={deletingError} />}
            <div className="flex flex-row-reverse">
              <Button danger type="button" onClick={handleSubmit}>席を削除する</Button>
            </div>
          </CardBody>
        </Card>
        )}
      </Suspension>
    </Feature>
  )
}
