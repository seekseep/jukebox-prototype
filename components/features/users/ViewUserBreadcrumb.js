import { useUser } from '../../../hooks/users'
import Breadcrumb, { BreadcrumbItem } from '../../parts/Breadcrumb'

export default function ViewUserBreadcrumb ({ userId }) {
  const user = useUser(userId)
  return (
    <Breadcrumb>
      <BreadcrumbItem>{user?.name || '読込中'}</BreadcrumbItem>
    </Breadcrumb>
  )
}
