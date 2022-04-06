import { format } from 'date-fns'
import locale from 'date-fns/locale/ja'
import { useRouter } from 'next/router'

import { useGetRoomLink } from '../../../../../../hooks/rooms'
import { useLessonsBySubjectId } from '../../../../../../hooks/lessons'

import Card, { CardActions } from '../../../../../../components/parts/Card'
import { LinkButton } from '../../../../../../components/parts/buttons'
import Collection, { CollectionPlaceholder, CollectionLinkItem } from '../../../../../../components/parts/Collection'
import RoomDashboard, { RoomDashboardSection } from '../../../../../../components/parts/RoomDashboard'
import SubjectHeader from '../../../../../../components/parts/SubjectHeader'

export default function Lessons () {
  const { query: { roomId, subjectId } } = useRouter()
  const getRoomLink = useGetRoomLink(roomId)

  const lessons = useLessonsBySubjectId(subjectId)

  return (
    <RoomDashboard roomId={roomId}>
      <SubjectHeader roomId={roomId} subjectId={subjectId} />
      <RoomDashboardSection>
        <Card>
          <CardActions>
            <LinkButton sm href={getRoomLink(`/subjects/${subjectId}/lessons/new`)}>授業を登録する</LinkButton>
          </CardActions>
          {lessons && (
            <Collection>
               {lessons.length > 0 ? (
                 lessons.map((lesson, index) => (
                   <CollectionLinkItem key={index} href={getRoomLink(`/subjects/${subjectId}/lessons/${index}`)}>
                     <div className="flex flex-col gap-1 p-1">
                       <div className="flex gap-2 leading-none items-center">
                        <div>{format(lesson.startedAt, 'yyyy年MM月dd日 (EE) HH:mm', { locale })}</div>
                        <div>~</div>
                        <div>{format(lesson.finishedAt, 'HH:mm', { locale })}</div>
                       </div>
                       <div className="text-sm text-gray-800 flex gap-2">
                         <div className="flex-grow">{lesson.name}</div>
                         <div className="w-24">
                           {lesson.teachers?.map(({ name })=>name).join(',')}
                         </div>
                        </div>
                     </div>
                   </CollectionLinkItem>
                 ))
               ) : (
                <CollectionPlaceholder>
                  登録されている授業はありません
                </CollectionPlaceholder>
               )}
            </Collection>
          )}
        </Card>
      </RoomDashboardSection>
    </RoomDashboard>
  )
}
