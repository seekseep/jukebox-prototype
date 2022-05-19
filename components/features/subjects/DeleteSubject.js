import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useDeleteSubject, useSubject } from '@/hooks/subjects'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { Button } from '@/components/parts/buttons'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { useGetRoomPath } from '@/hooks/router'
import Suspension from '@/components/parts/Suspension'

export default function DeleteSubject () {
  const { query:{ roomId, subjectId }, replace } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  const {
    mutate,
    ...result
  } = useSubject(roomId, subjectId)
  const [deleteSubject, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteSubject(roomId, subjectId)

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
        {()=>(
          <Card>
              <CardBody>
                {deletingError && <ErrorAlert error={deletingError} />}
                <div className="flex flex-row-reverse">
                  <Button danger type="button" onClick={handleSubmit}>科目を削除する</Button>
                </div>
              </CardBody>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
