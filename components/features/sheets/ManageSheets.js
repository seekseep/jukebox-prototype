import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'
import { useSheets } from '@/hooks/sheets'

import ErrorAlert from '@/components/parts/ErrorAlert'
import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Loading from '@/components/parts/Loading'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'

export default function ManageSheets () {
  const { query:{ roomId } } = useRouter()

  const getRoomPath = useGetRoomPath(roomId)

  const {
    data: sheets,
    isSuccess,
    isLoading,
    error: gettingError
  } = useSheets(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>席の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/sheets/new')}>席を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Card>
        {gettingError && <ErrorAlert error={gettingError} />}
        {isLoading && <Loading />}
        {isSuccess && (
          <Collection>
            {sheets.map(sheet => (
              <CollectionLinkItem key={sheet.id} href={getRoomPath(`/sheets/${sheet.id}`)}>
                {sheet.name}
              </CollectionLinkItem>
            ))}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
