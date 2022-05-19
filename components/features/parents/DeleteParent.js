import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useGetRoomPath } from '@/hooks/router'
import { useDeleteParent, useParent } from '@/hooks/parents'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { Button } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'

export default function DeleteParent () {
  const { query:{ roomId, parentId }, replace } = useRouter()
  const getRoomPath = useGetRoomPath()

  const {
    mutate,
    ...result
  } = useParent(roomId, parentId)
  const [deleteParent, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteParent(roomId, parentId)

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
      {()=>(
        <Card>
          <CardBody>
          {deletingError && <ErrorAlert error={deletingError} />}
            <div className="flex flex-row-reverse">
              <Button danger type="button" onClick={handleSubmit}>保護者を削除する</Button>
            </div>
          </CardBody>
        </Card>
        )}
      </Suspension>
    </Feature>
  )
}
