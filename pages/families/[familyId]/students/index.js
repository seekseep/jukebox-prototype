import { useRouter } from 'next/router'
import Link from 'next/link'

import { useGetFamilyPath } from '../../../../hooks/families'
import { useStudentsByFamilyId } from '../../../../hooks/students'

import FamilyDashboard, {
  FamilyDashboardTitle,
  FamilyDashboardSection,
} from '../../../../components/parts/FamilyDashboard'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from '../../../../components/parts/Breadcrumbs'
import Card from '../../../../components/parts/Card'
import Collection, { CollectionLinkItem, CollectionPlaceholder } from '../../../../components/parts/Collection'

export default function Students () {
  const { query: { familyId } } = useRouter()
  const getFamilyPath = useGetFamilyPath(familyId)
  const students = useStudentsByFamilyId(familyId)
  return (
    <FamilyDashboard title="生徒の一覧" familyId={familyId}>
      <Breadcrumbs>
        <BLink href={getFamilyPath('/')}>ホーム</BLink>
        <BCurrent>生徒の一覧</BCurrent>
      </Breadcrumbs>
      <FamilyDashboardSection>
        <FamilyDashboardTitle>生徒の一覧</FamilyDashboardTitle>
        <Card>
          {students && (
            <Collection>
              {students.length > 0 ? (
                students.map(student => (
                  <CollectionLinkItem key={student.id} href={getFamilyPath(`/students/${student.id}`)}>
                    {student.name}
                  </CollectionLinkItem>
                ))
              ) : (
                <CollectionPlaceholder>生徒が登録されていません</CollectionPlaceholder>
              )}
            </Collection>
          )}
        </Card>
      </FamilyDashboardSection>
    </FamilyDashboard>
  )
}
