import { useCurrentUser } from '@/hooks/auth'

import Loading from '@/components/parts/Loading'
import Unauthorized from '@/components/parts/Unauthorized'

export default function Authorized ({ children }) {
  const { data: currentUser, isLoading } = useCurrentUser()

  if (isLoading) return <Loading />
  if (!currentUser) return <Unauthorized />

  return children
}
