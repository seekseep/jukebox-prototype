import { useRouter } from 'next/router'
import { useGetRoomLink, useRoom } from '../../../../hooks/rooms'

import RoomDashboard, { RoomDashboardSection } from '../../../../components/parts/RoomDashboard'
import SettingsHeader from '../../../../components/parts/SettingsHeader'
import PropertySet, { PropertyItem, PropertyLabel, PropertyContents} from '../../../../components/parts/PropertySet'
import Card, { CardActions } from '../../../../components/parts/Card'
import { Button } from '../../../../components/parts/buttons'
import { SCHEDULE_UNIT_TERM } from '../../../../constatnts'

export default function Settings () {
  const { query: { roomId }} = useRouter()
  const getRoomLink = useGetRoomLink(roomId)
  const room = useRoom(roomId)
  return (
    <RoomDashboard roomId={roomId}>
      <SettingsHeader roomId={roomId} />
      <RoomDashboardSection>
        {room && (
          <Card>
            <CardActions>
              <Button sm secondary>編集する</Button>
            </CardActions>
            <PropertySet>
              <PropertyItem>
                <PropertyLabel>
                  氏名
                </PropertyLabel>
                <PropertyContents>
                  {room.name}
                </PropertyContents>
              </PropertyItem>
              <PropertyItem>
                <PropertyLabel>
                  予定作成単位
                </PropertyLabel>
                <PropertyContents>
                  {room.scheduleUnit.value}
                  {room.scheduleUnit.term === SCHEDULE_UNIT_TERM.DAILY && '日毎'}
                  {room.scheduleUnit.term === SCHEDULE_UNIT_TERM.WEEKLY && '週毎'}
                  {room.scheduleUnit.term === SCHEDULE_UNIT_TERM.MONTHLY && '月毎'}
                </PropertyContents>
              </PropertyItem>
            </PropertySet>
          </Card>
        )}
      </RoomDashboardSection>
    </RoomDashboard>
  )
}
