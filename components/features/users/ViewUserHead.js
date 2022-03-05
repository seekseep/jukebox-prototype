import Head from 'next/head'
import { useUser } from '../../../hooks/users'

export default function ViewUserHead ({ userId }) {
  const user = useUser(userId)
  return (
    <Head>
      <title>{user?.name || '読込中'}</title>
    </Head>
  )
}
