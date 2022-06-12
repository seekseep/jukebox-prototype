import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useGetSheetPath } from '@rooms/hooks/router'
import { useDeleteSchedule, useScheduleQuery } from '@rooms/hooks/schedules'


import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Button } from '@/components/parts/buttons'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import Suspension from '@/components/parts/Suspension'

export default function DeleteSheetSchedule () {
  const { query:{ roomId, sheetId, scheduleId }, replace } = useRouter()
  const getSheetPath = useGetSheetPath(roomId, sheetId)

  const {
    mutate,
    ...result
  } = useScheduleQuery(roomId, scheduleId)
  const [deleteSheet, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteSchedule(roomId, scheduleId)

  const handleSubmit = useCallback(() => {
    if (!confirm('予定を削除しますか')) return
    deleteSheet()
  }, [deleteSheet])

  useEffect(() => {
    if (!isDeleted) return
    toast.success('予定を削除しました')
    mutate(undefined)
    replace(getSheetPath('/schedules'))
  }, [getSheetPath, isDeleted, mutate, replace])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>予定の削除</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            <CardBody>
            {deletingError && <ErrorAlert error={deletingError} />}
              <div className="flex flex-row-reverse">
                <Button color="danger" type="button" onClick={handleSubmit}>予定を削除する</Button>
              </div>
            </CardBody>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
