import { useRouter } from 'next/router'

import { useGetRoomPath, useGetSubjectPath } from '../../../hooks/router'

import { useSubject } from '../../../hooks/subjects'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '../../parts/Breadcrumbs'
import TabNavigation, {
  Tab
} from '../../parts/TabNavigation'

export default function ViewSubjectNavigation () {
  const { query: { schoolId, roomId, subjectId } } = useRouter()
  const getRoomPath = useGetRoomPath(schoolId, roomId)
  const getSubjectPath = useGetSubjectPath(schoolId, roomId, subjectId)
  const { data: subject } = useSubject(schoolId, roomId, subjectId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/subjects')}>科目の一覧</BLink>
        <BCurrent>{subject ? subject.name : '科目'}</BCurrent>
      </Breadcrumbs>
      <TabNavigation>
        <Tab href={getSubjectPath('/')} exact>基本情報</Tab>
        <Tab href={getSubjectPath('/lessons')}>授業</Tab>
      </TabNavigation>
    </>
  )
}
