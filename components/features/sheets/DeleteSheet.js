import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useDeleteSheet, useSheet } from '@/hooks/sheets'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { Button } from '@/components/parts/buttons'
import Loading from '@/components/parts/Loading'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { useGetRoomPath } from '@/hooks/router'

export default function DeleteSheet () {
  const { query:{ roomId, sheetId }, replace } = useRouter()
  const getRoomPath = useGetRoomPath()

  const {
    isLoading,
    error: gettingError,
    isSuccess: isReady,
    mutate
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
      {isLoading && <Loading />}
      {gettingError && <ErrorAlert error={gettingError} />}
      {deletingError && <ErrorAlert error={deletingError} />}
      {isReady && (
        <Card>
            <CardBody>
              <div className="flex flex-row-reverse">
                <Button danger type="button" onClick={handleSubmit}>席の情報を削除する</Button>
              </div>
            </CardBody>
        </Card>
      )}
    </Feature>
  )
}
