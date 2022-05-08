import Head from 'next/head'
import SignOut from '@/components/features/SignOut'
import SimplePage from '@/components/parts/SimplePage'

export default function SignOutPage () {
  return (
    <>
      <Head>
        <title>アカウント登録 | JUKEBOX</title>
      </Head>
      <SimplePage>
        <SignOut />
      </SimplePage>
    </>
  )
}
