import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'
import { useTeacherRefs } from '@/hooks/teachers'

import { WithDocRefs } from '@/components/utilities/withDocRefs'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'

export default function ManageTeachers () {
  const { query:{ roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const result = useTeacherRefs(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>講師の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/teachers/new')}>講師を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: teacherRefs }) => (
          <Card>
            <Collection>
              {teacherRefs.length > 0 && (
                <WithDocRefs docRefs={teacherRefs}>
                  {({ data: teacher }) => (
                    <CollectionLinkItem href={getRoomPath(`/teachers/${teacher.id}`)}>
                      {teacher.name}
                    </CollectionLinkItem>
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
