import Link from "next/link";
import { useRouter } from "next/router";

import RoomDashboard, {
   RoomDashboardSection,
   RoomDashboardSectionTitle
} from "../../../components/parts/RoomDashboard";
import Collection, { CollectionLinkItem } from '../../../components/parts/Collection'
import Card from '../../../components/parts/Card'
import { useGetRoomLink } from "../../../hooks/rooms";

function FeatureCard ({ title, icon, description, href }) {
  return (
    <Link href={href} passHref>
      <Card type="a">
        <div className="flex items-center gap-4 p-4">
          <div className="text-4xl">{icon}</div>
          <div className="text-lg flex-grow">{title}</div>
        </div>
        {description && (
          <div className="border-t p-2 text-sm h-16">
            {description}
          </div>
        )}
      </Card>
    </Link>
  )
}

export default function Room () {
  const { query: { roomId }} = useRouter()
  const getRoomLink = useGetRoomLink(roomId)
  return (
    <RoomDashboard roomId={roomId}>
      <RoomDashboardSection>
        <RoomDashboardSectionTitle>やること</RoomDashboardSectionTitle>
        <Card>
          <Collection>
            <CollectionLinkItem href="/schedules/new">
              <div>授業予定の作成</div>
            </CollectionLinkItem>
          </Collection>
        </Card>
      </RoomDashboardSection>
      <RoomDashboardSection>
        <RoomDashboardSectionTitle>機能</RoomDashboardSectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            href={getRoomLink("/schedules")}
            icon="📅" title="授業予定"
            description="授業予定の作成や公開を行えます"  />
          <FeatureCard
            href={getRoomLink("/students")}
            icon="👩‍🎓" title="生徒"
            description="生徒の登録や予定を登録できます"  />
          <FeatureCard
            href={getRoomLink("/teachers")}
            icon="👨‍🏫" title="講師"
            description="講師の登録や予定を登録できます"  />
          <FeatureCard
            href={getRoomLink("/subjects")}
            icon="📕" title="科目"
            description="科目の登録や編集ができます"  />
          <FeatureCard
            href={getRoomLink("/settings")}
            icon="🔧" title="設定"
            description="教室の予定や授業枠の設定ができます"  />
        </div>
      </RoomDashboardSection>
    </RoomDashboard>
  )
}
