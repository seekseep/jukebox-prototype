import Head from 'next/head'

import { LinkButton } from '@/components/parts/buttons'

export default function Unauthorized () {
  return (
    <>
      <Head>
        <title>ζͺθͺθ¨Ό</title>
      </Head>
      <div className="max-w-lg mx-auto">
        <div className="flex flex-col py-12 items-center gap-4 min-h-screen justify-center">
          <div style={{ fontSize: '8rem' }}>π’</div>
          <h1 className="text-2xl">ζͺθͺθ¨Ό</h1>
          <p>θͺθ¨ΌγγεΏθ¦γγγγΎγ</p>
          <LinkButton href="/signin">γ­γ°γ€γ³γγ</LinkButton>
        </div>
      </div>
    </>
  )
}
