import { useRouter } from "next/router";
import { useGetRoomLink } from "../../../../hooks/rooms";

import RoomDashboard from "../../../../components/parts/RoomDashboard";
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from "../../../../components/parts/Breadcrumbs";

export default function Subejcts () {
  const { query: { roomId }} = useRouter()
  const getRoomLink = useGetRoomLink(roomId)
  return (
    <RoomDashboard roomId={roomId}>
      <Breadcrumbs>
        <BLink href={getRoomLink("/")}>ホーム</BLink>
        <BCurrent>科目の一覧</BCurrent>
      </Breadcrumbs>
    </RoomDashboard>
  )
}
