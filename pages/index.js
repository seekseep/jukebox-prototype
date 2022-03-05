import Head from 'next/head'
import Link from 'next/link'

export default function Home () {
  return (
    <>
      <Head>
        <title>ホーム</title>
      </Head>
      <div className="py-6 px-4">
        <div className="text-xl">ホーム</div>
        <Link href="/schools">学校一覧</Link>
      </div>
    </>
  )
}
