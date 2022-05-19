import { useSchoolRefs } from '@/hooks/schools'

import { WithDocRefs } from '@/components/utilities/withDocRefs'

import Suspension from '@/components/parts/Suspension'
import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import { SchoolIcon } from '@/components/parts/icons'

export default function ManageSchools () {
  const {
    data: schoolRefs,
    ...result
  } = useSchoolRefs()

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>
          <SchoolIcon />学校の一覧
        </FeatureTitle>
        <div>
          <LinkButton href="/schools/new">学校を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
      {()=>(
        <Card>
          <Collection>
            <WithDocRefs docRefs={schoolRefs}>
              {({ data: school }) => (
                <CollectionLinkItem href={`/schools/${school.id}`}>
                  {school.name}
                </CollectionLinkItem>
              )}
            </WithDocRefs>
          </Collection>
        </Card>
        )}
      </Suspension>
    </Feature>
  )
}
