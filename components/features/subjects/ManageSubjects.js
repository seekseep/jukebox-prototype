import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'
import { useSubjects } from '@/hooks/subjects'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Loading from '@/components/parts/Loading'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import ErrorAlert from '@/components/parts/ErrorAlert'

export default function ManageSubjects () {
  const { query:{ roomId } } = useRouter()

  const getRoomPath = useGetRoomPath(roomId)

  const {
    data: subjects,
    isSuccess,
    isLoading,
    error
  } = useSubjects(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>科目の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/subjects/new')}>科目を登録する</LinkButton>
        </div>
      </FeatureHead>
      {error && <ErrorAlert error={error} />}
      <Card>
        {isLoading && <Loading />}
        {isSuccess && (
          <Collection>
            {subjects.map(subject => (
              <CollectionLinkItem key={subject.id} href={getRoomPath(`/subjects/${subject.id}`)}>
                {subject.name}
              </CollectionLinkItem>
            ))}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
