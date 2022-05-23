import { ICON } from '@/constatnts'

import FeatureCard from '@/components/parts/FeatureCard'
import { useCurrentUser } from '@/hooks/auth'
import Suspension from '@/components/parts/Suspension'

export default function ViewFeatures () {
  const result = useCurrentUser()

  return (
    <Suspension {...result}>
      {({ data: currentUser }) => (
        <div className="px-2 gap-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <FeatureCard
            icon={ICON.USER} href={`/users/${currentUser.id}`}
            label="ユーザー"
            description="ログインしているユーザの情報を閲覧できます" />
          <FeatureCard
            icon={ICON.ROOM} href="/rooms"
            label="教室"
            description="教室の情報の閲覧などが" />
          <FeatureCard
            icon={ICON.SCHOOL} href="/schools"
            label="学校"
            description="学校の情報を確認できます" />
          <FeatureCard
            icon={ICON.ADMIN} href="/admin"
            label="管理者"
            description="システムの管理"/>
        </div>
      )}
    </Suspension>
  )
}
