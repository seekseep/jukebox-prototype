import { useRouter } from 'next/router'

import { useGetRoomLink } from '../../../../../../hooks/rooms'
import { useLesson } from '../../../../../../hooks/lessons'
import { useSubject } from '../../../../../../hooks/subjects'

import Card, { CardActions } from '../../../../../../components/parts/Card'
import { Button } from '../../../../../../components/parts/buttons'
import RoomDashboard, { RoomDashboardTitle, RoomDashboardSection } from '../../../../../../components/parts/RoomDashboard'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrnt
} from '../../../../../../components/parts/Breadcrumbs'

import PropertySet, { PropertyItem, PropertyLabel, PropertyContents } from '../../../../../../components/parts/PropertySet'
import Collection, { CollectionLinkItem, CollectionPlaceholder } from '../../../../../../components/parts/Collection'

export default function Lesson () {
  const { query: { roomId, subjectId, lessonId } } = useRouter()
  const getRoomLink = useGetRoomLink(roomId)

  const subject = useSubject(subjectId)
  const lesson = useLesson(lessonId)

  return (
    <RoomDashboard roomId={roomId}>
      <Breadcrumbs>
        <BLink href={getRoomLink('/')}>ホーム</BLink>
        <BLink href={getRoomLink('/subjects')}>科目</BLink>
        {subject && <BLink href={getRoomLink(`/subjects/${subjectId}`)}>{subject.name}</BLink>}
        {lesson && <BCurrnt>{lesson.name}</BCurrnt>}
      </Breadcrumbs>
      <RoomDashboardSection>
        {lesson && <RoomDashboardTitle>{lesson.name}</RoomDashboardTitle>}
        <Card>
          <CardActions>
            <Button sm secondary>編集する</Button>
          </CardActions>
          {lesson && (
            <PropertySet>
              <PropertyItem>
                <PropertyLabel>名称</PropertyLabel>
                <PropertyContents>{lesson.name}</PropertyContents>
              </PropertyItem>
              <PropertyItem>
                <PropertyLabel>講師</PropertyLabel>
                <PropertyContents>
                  <Collection>
                    {lesson.teachers && lesson.teachers.length > 0 ? (
                      lesson.teachers.map(teacher => (
                        <CollectionLinkItem key={teacher.id} href={getRoomLink(`/teachers/${teacher.id}`)}>
                          {teacher.name}
                        </CollectionLinkItem>
                      ))
                    ) : (
                      <CollectionPlaceholder>講師が登録されていません</CollectionPlaceholder>
                    )}
                  </Collection>
                </PropertyContents>
              </PropertyItem>
            </PropertySet>
          )}
        </Card>
      </RoomDashboardSection>

    </RoomDashboard>
  )
}
