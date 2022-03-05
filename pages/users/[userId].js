import { useCurrentUserId } from '../../hooks/users'

import ViewUserHead from '../../components/features/users/ViewUserHead'
import ViewUserBreadcrumb from '../../components/features/users/ViewUserBreadcrumb'
import ViewUser from '../../components/features/users/ViewUser'

export default function User () {
  const currentUserId = useCurrentUserId()

  return (
    <>
      <ViewUserHead userId={currentUserId} />
      <ViewUserBreadcrumb userId={currentUserId} />
      <ViewUser userId={currentUserId} />
    </>
  )
}
