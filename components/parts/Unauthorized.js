import Link from 'next/link'

import { LinkButton } from './buttons'

export default function Unauthorized () {
  return (
    <div className="max-w-lg mx-auto py-16 px-4 flex flex-col gap-12">
      <div className="text-6xl">😢</div>
      <div className="flex flex-col gap-6 items-start">
        <h1 className="text-2xl">未認証</h1>
        <LinkButton href="/signin">ログインする</LinkButton>
      </div>

    </div>
  )
}
