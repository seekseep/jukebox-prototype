import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { useSignOut } from '@/hooks/auth'

export default function SignUp () {
  const router = useRouter()

  const [signOut, { isSuccess }] = useSignOut()

  useEffect(() => signOut(), [signOut])

  useEffect(() => {
    if(!isSuccess) return
    toast.success('ログアウトしました')
    router.push('/')
  }, [isSuccess, router])

  return null
}
