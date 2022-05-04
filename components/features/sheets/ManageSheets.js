import { useRouter } from 'next/router'

import { useGetRoomPath } from '../../../hooks/router'
import { useSheets } from '../../../hooks/sheets'

import ErrorAlert from '../../parts/ErrorAlert'
import Card from '../../parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '../../parts/feature'
import Loading from '../../parts/Loading'
import Collection, { CollectionLinkItem } from '../../parts/Collection'
import { LinkButton } from '../../parts/buttons'

export default function ManageSheets () {
  const { query:{ schoolId, roomId } } = useRouter()

  const getRoomPath = useGetRoomPath(schoolId, roomId)

  const {
    data: sheets,
    isSuccess,
    isLoading,
    error: gettingError
  } = useSheets(schoolId, roomId)

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
