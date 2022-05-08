import { useSchools } from '@/hooks/schools'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Loading from '@/components/parts/Loading'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'

export default function ManageSchools () {
  const {
    data: schools,
    isSuccess,
    isLoading
  } = useSchools()

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>学校の一覧</FeatureTitle>
        <div>
          <LinkButton href="/schools/new">学校を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Card>
        {isLoading && <Loading />}
        {isSuccess && (
          <Collection>
            {schools.map(school => (
              <CollectionLinkItem key={school.id} href={`/schools/${school.id}`}>
                {school.name}
              </CollectionLinkItem>
            ))}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
