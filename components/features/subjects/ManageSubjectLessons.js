import { useRouter } from 'next/router'
import { format } from 'date-fns'

import { useGetSubjectPath } from '@/hooks/router'
import { useSubjectLessons } from '@/hooks/subjects'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Loading from '@/components/parts/Loading'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { useMemo } from 'react'

export default function ManageSubjectLessons () {
  const { query:{ roomId, subjectId } } = useRouter()

  const getSubjectPath = useGetSubjectPath(roomId, subjectId)

  const {
    data: lessons,
    isSuccess,
    isLoading,
    error
  } = useSubjectLessons(roomId, subjectId)

  const sortedLessons = useMemo(() => {
    if (!lessons) return lessons

    return lessons.sort((a, b) => {
      const c = a.startedAt.toDate()
      const d = b.startedAt.toDate()
      if (c === d) return 0
      return c > d ? 1 : -1
    })
  }, [lessons])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業の一覧</FeatureTitle>
        <div>
          <LinkButton href={getSubjectPath('/lessons/new')}>授業を登録する</LinkButton>
        </div>
      </FeatureHead>
      {error && <ErrorAlert error={error} />}
      <Card>
        {isLoading && <Loading />}
        {isSuccess && (
          <Collection>
            {sortedLessons.map(lesson => (
              <CollectionLinkItem key={lesson.id} href={getSubjectPath(`/lessons/${lesson.id}`)}>
                <div className="flex gap-2">
                  <div className="w-40">{format(lesson.startedAt.toDate(), 'yyyy/MM/dd HH:mm')}</div>
                  <div className="w-4">~</div>
                  <div className="w-40">{format(lesson.finishedAt.toDate(), 'yyyy/MM/dd HH:mm')}</div>
                </div>
              </CollectionLinkItem>
            ))}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
