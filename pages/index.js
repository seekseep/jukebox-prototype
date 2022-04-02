import Head from 'next/head'
import Link from 'next/link'

export default function Home () {
  return (
    <>
    <Head>
      <title>JUKE BOX プロトタイプ</title>
    </Head>
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-lg mx-auto p-4 flex flex-col gap-4">
        <header className="py-8">
          <h1 className="text-center text-2xl font-bold">JUKE BOX プロトタイプ</h1>
        </header>
        <nav className="flex flex-col gap-4 leading-none">
          <Link href="/schools">
            <a className=" bg-white rounded shadow p-4 flex gap-4 items-center">
              <span className="text-4xl">🏫</span>
              <span className="text-lg">教室用</span>
            </a>
          </Link>
          <Link href="/families">
            <a className=" bg-white rounded shadow p-4 flex gap-4 items-center">
              <span className="text-4xl">👪</span>
              <span className="text-lg">家庭用</span>
            </a>
          </Link>
        </nav>
      </div>
    </main>
    </>
  )
}
