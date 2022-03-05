import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Logout () {
  const router = useRouter()

  useEffect(() => {
    router.replace('/login')
  })

  return (
    <>
      <Head>
        <title>ログアウト</title>
      </Head>
      <div className="px-16 py-32">
        <div>読込中</div>
      </div>
    </>
  )
}
