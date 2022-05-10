import { useRouter } from 'next/router'
import { format } from 'date-fns'

import { useGetRoomPath } from '@/hooks/router'
import { useLessons } from '@/hooks/lessons'

import ErrorAlert from '@/components/parts/ErrorAlert'
import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Loading from '@/components/parts/Loading'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'

export default function ManageLessons () {
  const { query:{ roomId } } = useRouter()

  const getRoomPath = useGetRoomPath(roomId)

  const {
    data: lessons,
    isSuccess,
    isLoading,
    error: gettingError
  } = useLessons(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/lessons/new')}>授業を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Card>
        {gettingError && <ErrorAlert error={gettingError} />}
        {isLoading && <Loading />}
        {isSuccess && (
          <Collection>
            {lessons.map(lesson => (
              <CollectionLinkItem key={lesson.id} href={getRoomPath(`/lessons/${lesson.id}`)}>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-grow items-center gap-2">
                    <div>{format(lesson.startedAt.toDate(), 'yyyy/MM/dd HH:mm')}</div>
                    <div>~</div>
                    <div>{format(lesson.finishedAt.toDate(), 'yyyy/MM/dd HH:mm')}</div>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <div>科目: {lesson.subject.name}</div>
                    <div>生徒: {lesson.students.map(student => student.name).join(',')}</div>
                    <div>講師: {lesson.teachers.map(teacher => teacher.name).join(',')}</div>
                  </div>
                </div>
              </CollectionLinkItem>
            ))}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
