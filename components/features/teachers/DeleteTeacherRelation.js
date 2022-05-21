import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useGetStudentPath } from '@/hooks/router'
import { useRelation, useDeleteRelation } from '@/hooks/relations'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { Button } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'

export default function DeleteStudentRelation () {
  const { query:{ roomId, teacher, relationId }, replace } = useRouter()
  const getStudentPath = useGetStudentPath(roomId, teacher)

  const {
    mutate,
    ...result
  } = useRelation(roomId, relationId)
  const [deleteRelation, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteRelation(roomId, relationId)

  const handleSubmit = useCallback(() => {
    if (!confirm('講師の関係性を削除しますか')) return
    deleteRelation()
  }, [deleteRelation])

  useEffect(() => {
    if (!isDeleted) return
    toast.success('講師の関係性を削除しました')
    mutate(undefined)
    replace(getStudentPath('/relations'))
  }, [getStudentPath, isDeleted, mutate, replace])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>講師の関係性の削除</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
        <Card>
          {deletingError && <ErrorAlert error={deletingError} />}
          <CardBody>
            <div className="flex flex-row-reverse">
              <Button danger type="button" onClick={handleSubmit}>講師の関係性を削除する</Button>
            </div>
          </CardBody>
        </Card>
        )}
      </Suspension>
    </Feature>
  )
}
