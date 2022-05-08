import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useDeleteSubject, useSubject } from '@/hooks/subjects'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { Button } from '@/components/parts/buttons'
import Loading from '@/components/parts/Loading'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { useGetRoomPath } from '@/hooks/router'

export default function DeleteSubject () {
  const { query:{ roomId, subjectId }, replace } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  const {
    isLoading,
    error: gettingError,
    isSuccess: isReady,
    mutate
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
      {isLoading && <Loading />}
      {gettingError && <ErrorAlert error={gettingError} />}
      {deletingError && <ErrorAlert error={deletingError} />}
      {isReady && (
        <Card>
            <CardBody>
              <div className="flex flex-row-reverse">
                <Button danger type="button" onClick={handleSubmit}>科目の情報を削除する</Button>
              </div>
            </CardBody>
        </Card>
      )}
    </Feature>
  )
}
