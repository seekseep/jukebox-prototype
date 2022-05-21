import { useGetAdminPath } from '@/hooks/router'

import FeatureCard from '@/components/parts/FeatureCard'

export default function Admin () {
  const getAdminPath = useGetAdminPath()
  return (
    <div className="grid grid-cols-2 gap-4">
      <FeatureCard
        href={getAdminPath('/schools')}
        icon="🏫" label="学校"
        description="学校の管理" />
    </div>
  )
}
