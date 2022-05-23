import Head from 'next/head'

import { LinkButton } from '@/components/parts/buttons'

export default function Unauthorized () {
  return (
    <>
      <Head>
        <title>未認証</title>
      </Head>
      <div className="max-w-lg mx-auto">
        <div className="flex flex-col py-12 items-center gap-4 min-h-screen justify-center">
          <div style={{ fontSize: '8rem' }}>😢</div>
          <h1 className="text-2xl">未認証</h1>
          <p>認証する必要があります</p>
          <LinkButton href="/signin">ログインする</LinkButton>
        </div>
      </div>
    </>
  )
}
