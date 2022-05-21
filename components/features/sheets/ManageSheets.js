import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'
import { useSheetRefs } from '@/hooks/sheets'

import { WithDocRefs } from '@/components/utilities/withDocRefs'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'

export default function ManageSheets () {
  const { query:{ roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const result = useSheetRefs(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>席の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/sheets/new')}>席を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: sheetRefs })=>(
          <Card>
            <Collection>
              {sheetRefs.length > 0 && (
                <WithDocRefs docRefs={sheetRefs}>
                  {({ data: sheet }) => (
                    <CollectionLinkItem href={getRoomPath(`/sheets/${sheet.id}`)}>
                      {sheet.name}
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
