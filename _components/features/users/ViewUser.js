import { useUser } from '../../../hooks/users'

import UserPropertyList from '../../parts/users/UserPropertyList'

export default function ViewUser ({ userId }) {
  const user = useUser(userId)

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="text-lg">講師</div>
      {user && <UserPropertyList user={user} />}
    </div>
  )
}
