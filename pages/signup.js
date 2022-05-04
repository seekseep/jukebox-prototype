import Head from 'next/head'
import SignUp from '../components/features/SignUp'
import SimplePage from '../components/parts/SimplePage'

export default function SignUpPage () {
  return (
    <>
      <Head>
        <title>アカウント登録 | JUKEBOX</title>
      </Head>
      <SimplePage>
        <SignUp />
      </SimplePage>
    </>
  )
}
