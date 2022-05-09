import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useDeleteLesson, useLesson } from '@/hooks/lessons'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { Button } from '@/components/parts/buttons'
import Loading from '@/components/parts/Loading'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { useGetSubjectPath } from '@/hooks/router'

export default function DeleteSubjectLesson () {
  const { query:{ roomId, subjectId, lessonId }, replace } = useRouter()
  const getSubjectPath = useGetSubjectPath(roomId, subjectId)

  const {
    isLoading,
    error: gettingError,
    isSuccess: isReady,
    mutate
  } = useLesson(roomId, lessonId)
  const [deleteLesson, {
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteLesson(roomId, lessonId)

  const handleSubmit = useCallback(() => {
    if (!confirm('授業を削除しますか')) return
    deleteLesson()
  }, [deleteLesson])

  useEffect(() => {
    if (!isDeleted) return
    toast.success('授業を削除しました')
    mutate(undefined)
    replace(getSubjectPath('/lessons'))
  }, [getSubjectPath, isDeleted, mutate, replace])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業の削除</FeatureTitle>
      </FeatureHead>
      {isLoading && <Loading />}
      {gettingError && <ErrorAlert error={gettingError} />}
      {deletingError && <ErrorAlert error={deletingError} />}
      {isReady && (
        <Card>
            <CardBody>
              <div className="flex flex-row-reverse">
                <Button danger type="button" onClick={handleSubmit}>授業の情報を削除する</Button>
              </div>
            </CardBody>
        </Card>
      )}
    </Feature>
  )
}
