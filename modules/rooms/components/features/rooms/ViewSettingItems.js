import { useRouter } from 'next/router'

import { useGetRoomPath } from '@rooms/hooks/router'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import FeatureCard from '@/components/parts/FeatureCard'
import { ICON } from '@/constants'

export default function ViewSettingsNavigation () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>設定項目</FeatureTitle>
      </FeatureHead>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          href={getRoomPath('/settings/basic')}
          icon={ICON.ROOM} label="基本情報"
          description="教室の基本設定" />
        <FeatureCard
          href={getRoomPath('/settings/lessonFrames')}
          icon="📦" label="授業枠"
          description="授業の枠の設定"  />
      </div>
    </Feature>
  )
}
