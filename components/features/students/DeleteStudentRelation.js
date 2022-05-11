import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useDeleteStudent, useStudentRelation } from '@/hooks/students'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { Button } from '@/components/parts/buttons'
import Loading from '@/components/parts/Loading'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { useGetStudentPath } from '@/hooks/router'

export default function DeleteStudentRelation () {
  const { query:{ roomId, studentId, relationId }, replace } = useRouter()
  const getStudentPath = useGetStudentPath(roomId, studentId)

  const {
    isLoading,
    error: gettingError,
    isSuccess: isReady,
    mutate
  } = useStudentRelation(roomId, studentId, relationId)
  const [deleteStudent, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteStudent(roomId, studentId, relationId)

  const handleSubmit = useCallback(() => {
    if (!confirm('生徒の関係性を削除しますか')) return
    deleteStudent()
  }, [deleteStudent])

  useEffect(() => {
    if (!isDeleted) return
    toast.success('生徒の関係性を削除しました')
    mutate(undefined)
    replace(getStudentPath('/relations'))
  }, [getStudentPath, isDeleted, mutate, replace])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>生徒の関係性の削除</FeatureTitle>
      </FeatureHead>
      {isLoading && <Loading />}
      {gettingError && <ErrorAlert error={gettingError} />}
      {deletingError && <ErrorAlert error={deletingError} />}
      {isReady && (
        <Card>
            <CardBody>
              <div className="flex flex-row-reverse">
                <Button danger type="button" onClick={handleSubmit}>生徒の関係性の情報を削除する</Button>
              </div>
            </CardBody>
        </Card>
      )}
    </Feature>
  )
}
