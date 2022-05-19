import Link from 'next/link'

import Authorized from '@/components/features/Authorized'
import FeatureCard from '@/components/parts/FeatureCard'
import SimplePage from '@/components/parts/SimplePage'
import { ICON } from '@/constatnts'

export default function Home () {
  return (
    <Authorized>
      <SimplePage>
        <div className="flex flex-col gap-4">
          <FeatureCard
            href="/schools"
            icon={ICON.SCHOOL}
            label="学校用" />
          <FeatureCard
            href="/families"
            icon={ICON.FAMILY}
            label="家庭用" />
          <FeatureCard
            href="/admin"
            icon={ICON.ADMIN}
            label="管理者用" />
          <Link href="/signout">
            <a className="text-center text-red-500 rounded block p-2">
              ログアウトする
            </a>
          </Link>
        </div>
      </SimplePage>
    </Authorized>
  )
}
