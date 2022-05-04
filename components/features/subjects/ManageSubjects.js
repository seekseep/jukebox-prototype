import { useRouter } from 'next/router'

import { useGetRoomPath } from '../../../hooks/router'
import { useSubjects } from '../../../hooks/subjects'

import Card from '../../parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '../../parts/feature'
import Loading from '../../parts/Loading'
import Collection, { CollectionLinkItem } from '../../parts/Collection'
import { LinkButton } from '../../parts/buttons'

export default function ManageSubjects () {
  const { query:{ schoolId, roomId } } = useRouter()

  const getRoomPath = useGetRoomPath(schoolId, roomId)

  const {
    data: subjects,
    isSuccess,
    isLoading
  } = useSubjects(schoolId, roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>科目の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/subjects/new')}>科目を登録する</LinkButton>
        </div>
      </FeatureHead>
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
