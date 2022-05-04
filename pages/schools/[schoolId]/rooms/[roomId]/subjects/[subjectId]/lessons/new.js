import { useRouter } from 'next/router'

import { useGetRoomPath } from '../../../../../../../../hooks/router'

import { DashboardSection } from '../../../../../../../../components/parts/dashboard'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '../../../../../../../../components/parts/Breadcrumbs'

import RegisterLesson from '../../../../../../../../components/features/lessons/RegisterLesson'
import RoomDashboard from '../../../../../../../../components/features/rooms/RoomDashboard'
import { useSubject } from '../../../../../../../../hooks/subjects'

export default function NewLesson () {
  const { query: { schoolId, roomId, subjectId } } = useRouter()
  const getRoomPath = useGetRoomPath(schoolId, roomId)

  const { data: subject } = useSubject(schoolId, roomId, schoolId)

  return (
    <RoomDashboard title="授業の登録">
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/subjects')}>科目の一覧</BLink>
        <BLink href={getRoomPath(`/subjects/${subjectId}`)}>{subject?.name || '科目'}</BLink>
        <BLink href={getRoomPath(`/subjects/${subjectId}/lessons`)}>授業の一覧</BLink>
        <BCurrent>授業の登録</BCurrent>
      </Breadcrumbs>
      <DashboardSection>
        <RegisterLesson />
      </DashboardSection>
    </RoomDashboard>
  )
}
