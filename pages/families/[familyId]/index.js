import { useRouter } from 'next/router'
import Link from 'next/link'

import { useGetFamilyLink } from '../../../hooks/families'

import FamilyDashboard, {
  FamilyDashboardTitle,
  FamilyDashboardSection,
} from '../../../components/parts/FamilyDashboard'
import Breadcrumbs, {
  BreadcrumbsCurrentItem as BCurrent
} from '../../../components/parts/Breadcrumbs'
import Card from '../../../components/parts/Card'

export default function Family () {
  const { query: { familyId } } = useRouter()
  const getFamilyLink = useGetFamilyLink(familyId)
  return (
    <FamilyDashboard title="ホーム" familyId={familyId}>
      <Breadcrumbs>
        <BCurrent>ホーム</BCurrent>
      </Breadcrumbs>
      <FamilyDashboardSection>
        <FamilyDashboardTitle>ホーム</FamilyDashboardTitle>
        <Link href={getFamilyLink('/students')} passHref>
          <Card>
            <div className="flex gap-4 items-center p-4">
              <div className="text-5xl leading-none">👨‍🎓</div>
              <div className="text-xl leading-none flex-grow">生徒</div>
            </div>
          </Card>
        </Link>
      </FamilyDashboardSection>
    </FamilyDashboard>
  )
}
