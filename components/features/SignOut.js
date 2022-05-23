import { useEffect } from 'react'
import { useSignOutMutation } from '@/hooks/auth'

export default function SignUp () {
  const [signOut, { isSuccess }] = useSignOutMutation()

  useEffect(() => signOut(), [signOut])

  useEffect(() => {
    if(!isSuccess) return
    location.href = '/'
  }, [isSuccess])

  return null
}
