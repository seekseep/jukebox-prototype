import { useRouter } from 'next/router'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import FeatureCard from '@/components/parts/FeatureCard'
import Suspension from '@/components/parts/Suspension'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useActiveFeatures } from '@rooms/hooks/rooms'
import { ICON } from '@/constants'

export default function ViewFeatures () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  const result = useActiveFeatures(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>機能</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: features }) => {
          return (
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {features.students && (
              <FeatureCard
                href={getRoomPath('/students')}
                icon={ICON.STUDENT} label="生徒"
                description="生徒の登録や予定を登録できます"  />
            )}
            {features.teachers && (
              <FeatureCard
                href={getRoomPath('/teachers')}
                icon={ICON.TEACHER} label="講師"
                description="講師の登録や予定を登録できます"  />
            )}
            {features.sheets && (
              <FeatureCard
                href={getRoomPath('/sheets')}
                icon={ICON.SHEET} label="座席"
                description="座席の登録や予定を登録できます"  />
            )}
            {features.subjects && (
              <FeatureCard
                href={getRoomPath('/subjects')}
                icon={ICON.SUBJECT} label="科目"
                description="科目の登録や編集ができます"  />
            )}
            {features.lessons && (
              <FeatureCard
                href={getRoomPath('/lessons')}
                icon={ICON.LESSON} label="授業"
                description="授業の登録や編集ができます"  />
            )}
            {features.parents && (
              <FeatureCard
                href={getRoomPath('/parents')}
                icon={ICON.FAMILY} label="保護者"
                description="保護者の登録や予定を登録できます"  />
            )}
            {features.settings && (
              <FeatureCard
                href={getRoomPath('/settings')}
                icon={ICON.ROOM} label="教室"
                description="営業日や授業枠などの教室の設定ができます"  />
            )}
          </div>
          )
        }}
      </Suspension>
    </Feature>
  )
}
