import Link from 'next/link'

import { useGetAdminPath } from '../../hooks/admin'

import AdminDashboard from '../../components/parts/AdminDashboard'
import Card from '../../components/parts/Card'

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

export default function Admin () {

  const getAdminPath = useGetAdminPath()

  return (
    <AdminDashboard>
      <div className="grid grid-cols-2 gap-4">
        <FeatureCard
          href={getAdminPath('/schools')}
          icon="🏫" title="学校"
          description="学校の管理" />
      </div>
    </AdminDashboard>
  )
}
