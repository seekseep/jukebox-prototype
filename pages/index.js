import Link from 'next/link'

import Authorized from '@/components/features/Authorized'
import FeatureCard from '@/components/parts/FeatureCard'
import SimplePage from '@/components/parts/SimplePage'

export default function Home () {
  return (
    <Authorized>
      <SimplePage>
        <div className="flex flex-col gap-4">
          <FeatureCard href="/schools" icon="🏫" label="学校用" />
          <FeatureCard href="/families" icon="🏠" label="家庭用" />
          <FeatureCard href="/admin/login" icon="🚧" label="管理者用" />
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
