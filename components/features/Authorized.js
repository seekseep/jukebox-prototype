import { useAuthState } from '@/hooks/auth'

import Loading from '@/components/parts/Loading'
import Unauthorized from '@/components/parts/Unauthorized'
import { AUTH_STATE } from '@/constatnts'

export default function Authorized ({ children }) {
  const authState = useAuthState()
  switch (authState) {
    case AUTH_STATE.LOADING:
      return <Loading />
    case AUTH_STATE.UNAUTHORIZED:
      return <Unauthorized />
    case AUTH_STATE.AUTHORIZED:
      return children
  }
}
