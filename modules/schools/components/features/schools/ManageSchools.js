import { WithDocRef, WithDocRefs } from '@/components/utilities/withDocRefs'

import Suspension from '@/components/parts/Suspension'
import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import { SchoolIcon } from '@/components/parts/icons'

import { useSchoolRoleRefs } from '@schools/hooks/roles'

export default function ManageSchools () {
  const result = useSchoolRoleRefs()

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
        {({ data: schoolRoleRefs })=>(
          <Card>
            <Collection>
              {schoolRoleRefs.length > 0 &&  (
                <WithDocRefs docRefs={schoolRoleRefs}>
                  {({ data: schoolRole }) => (
                    <WithDocRef docRef={schoolRole.resource}>
                      {({ data: school }) => (
                        <CollectionLinkItem href={`/schools/${school.id}`}>
                          {school.name}
                        </CollectionLinkItem>
                      )}
                    </WithDocRef>
                  )}
                </WithDocRefs>
              )}
            </Collection>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
