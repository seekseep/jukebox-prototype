import { useRouter } from 'next/router'

import { useGetRoomLink } from '../../../../../hooks/rooms'
import { useSubjectGroup } from '../../../../../hooks/subjectGroups'

import Card, { CardActions } from '../../../../../components/parts/Card'
import { Button } from '../../../../../components/parts/buttons'
import PropertySet, { PropertyItem, PropertyLabel, PropertyContents } from '../../../../../components/parts/PropertySet'
import Collection, { CollectionLinkItem, CollectionPlaceholder } from '../../../../../components/parts/Collection'
import RoomDashboard, {
  RoomDashboardSectionTitle,
  RoomDashboardSection
} from '../../../../../components/parts/RoomDashboard'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from '../../../../../components/parts/Breadcrumbs'

export default function SubejctGroups () {
  const { query: { roomId, subjectGroupId } } = useRouter()
  const getRoomLink = useGetRoomLink(roomId)

  const subjectGroup = useSubjectGroup(subjectGroupId)

  return (
    <RoomDashboard title={subjectGroup?.name} roomId={roomId}>
      <Breadcrumbs>
        <BLink href={getRoomLink('/')}>ホーム</BLink>
        <BLink href={getRoomLink('/subjects')}>科目</BLink>
        <BLink href={getRoomLink('/subjects/subject_groups')}>科目分類</BLink>
        <BCurrent>{subjectGroup?.name}</BCurrent>
      </Breadcrumbs>
      <RoomDashboardSection>
        <RoomDashboardSectionTitle>基本情報</RoomDashboardSectionTitle>
        {subjectGroup && (
          <Card>
            <CardActions>
              <Button sm secondary>編集する</Button>
            </CardActions>
            <PropertySet>
              <PropertyItem>
                <PropertyLabel>名称</PropertyLabel>
                <PropertyContents>{subjectGroup.name}</PropertyContents>
              </PropertyItem>
            </PropertySet>
          </Card>
        )}
      </RoomDashboardSection>
      <RoomDashboardSection>
        <RoomDashboardSectionTitle>科目</RoomDashboardSectionTitle>
        <Card>
          <CardActions>
            <Button sm>登録する</Button>
          </CardActions>
          {subjectGroup && (
            <Collection>
              {subjectGroup.subjects?.length > 0 ? (
                subjectGroup.subjects.map(subject => (
                  <CollectionLinkItem key={subject.id} href={getRoomLink(`/subjects/${subject.id}`)}>
                    <div className="flex">
                      <div className="flex-grow">{subject.name}</div>
                      <div className="w-32"></div>
                    </div>
                  </CollectionLinkItem>
                ))
              ) : (
                <CollectionPlaceholder>科目が登録されていません</CollectionPlaceholder>
              )}
            </Collection>
          )}
        </Card>
      </RoomDashboardSection>
    </RoomDashboard>
  )
}
