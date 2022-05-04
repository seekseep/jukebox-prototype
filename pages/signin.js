import Head from 'next/head'
import SignIn from '../components/features/SignIn'
import SimplePage from '../components/parts/SimplePage'

export default function SignInPage () {
  return (
    <>
      <Head>
        <title>ログイン | JUKEBOX</title>
      </Head>
      <SimplePage>
        <SignIn />
      </SimplePage>
    </>
  )
}
