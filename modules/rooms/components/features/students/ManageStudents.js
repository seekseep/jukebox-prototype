import { useRouter } from 'next/router'

import { WithDocRefs } from '@/components/utilities/withDocRefs'

import Card from '@/components/parts/Card'
import Suspension from '@/components/parts/Suspension'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useStudentRefsQuery } from '@rooms/hooks/students'

export default function ManageStudents () {
  const { query:{ roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const result = useStudentRefsQuery(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>生徒の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/students/new')}>生徒を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: studentRefs }) => (
          <Card>
            <Collection>
              {studentRefs.length > 0 && (
                <WithDocRefs docRefs={studentRefs}>
                  {({ data: student }) => (
                    <CollectionLinkItem href={getRoomPath(`/students/${student.id}`)}>
                      {student.name}
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
