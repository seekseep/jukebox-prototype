import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import FeatureCard from '@/components/parts/FeatureCard'

export default function ViewFeatures () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>機能</FeatureTitle>
      </FeatureHead>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          href={getRoomPath('/students')}
          icon="👩‍🎓" label="生徒"
          description="生徒の登録や予定を登録できます"  />
        <FeatureCard
          href={getRoomPath('/teachers')}
          icon="👨‍🏫" label="講師"
          description="講師の登録や予定を登録できます"  />
        <FeatureCard
          href={getRoomPath('/sheets')}
          icon="🪑" label="座席"
          description="座席の登録や予定を登録できます"  />
        <FeatureCard
          href={getRoomPath('/subjects')}
          icon="📕" label="科目"
          description="科目の登録や編集ができます"  />
        <FeatureCard
          href={getRoomPath('/settings')}
          icon="🔧" label="設定"
          description="教室の予定や授業枠の設定ができます"  />
      </div>
    </Feature>
  )
}
