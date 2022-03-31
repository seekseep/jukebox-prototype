import Link from "next/link";
import { useRouter } from "next/router";

import RoomDashboard from "../../../components/parts/RoomDashboard";
import { useGetRoomLink } from "../../../hooks/rooms";

function FeatureCard ({ title, icon, description, href }) {
  return (
    <Link href={href} >
      <a className="bg-white rounded shadow">
        <div className="flex items-center gap-4 p-4">
          <div className="text-4xl">{icon}</div>
          <div className="text-lg flex-grow">{title}</div>
        </div>
        {description && (
          <div className="border-t p-2 text-sm h-16">
            {description}
          </div>
        )}
      </a>
    </Link>
  )
}


export default function Room () {
  const { query: { roomId }} = useRouter()
  const getRoomLink = useGetRoomLink(roomId)
  return (
    <RoomDashboard title="ホーム" roomId={roomId}>
      <section className="px-4 flex flex-col gap-4">
        <h2 className="text-lg border-b p-2">やること</h2>
        <div className="bg-white h-32 shadow flex flex-col">
          <Link href="/schedules/new">
            <a className="border-b p-2 hover:bg-gray-50 text-blue-500">
              <div>授業予定の作成</div>
            </a>
          </Link>
        </div>
      </section>
      <section className="px-4 flex flex-col gap-4">
        <h2 className="text-lg border-b p-2">機能</h2>
        <div className="grid grid-cols-3 gap-4">
        <FeatureCard
          href={getRoomLink("/schedules")}
          icon="📅" title="授業予定"
          description="授業予定の作成や公開を行えます"  />
        <FeatureCard
          href={getRoomLink("/students")}
          icon="👩‍🎓" title="生徒"
          description="生徒の登録や予定を登録できます"  />
        <FeatureCard
          href={getRoomLink("/schedules")}
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
      </section>
    </RoomDashboard>
  )
}
