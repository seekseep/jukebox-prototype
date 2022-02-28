import Head from 'next/head'
import Link from 'next/link'

export default function Login () {
  return (
    <>
      <Head>
        <title>ログイン</title>
      </Head>
      <div className="p-6 py-32 max-w-lg flex flex-col gap-12 mx-auto">
        <div className="flex justify-center">
          <div className="font-bold text-lg px-3 py-1 shadow text-center bg-green-900 text-white rounded">JUKeBox</div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="text-3xl font-bold">ログイン</div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="">ユーザ名</label>
              <input type="text" className="border p-2 rounded" defaultValue="testuser" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">パスワード</label>
              <input type="password" className="border p-2 rounded" defaultValue="password" />
            </div>
            <Link href="/">
              <a className="bg-blue-500 text-center rounded py-2 px-4 text-white">ログインする</a>
            </Link>
          </div>
          <Link href="/register" passHref>
            <a className="text-blue-500 underline">アカウントを作成する</a>
          </Link>
        </div>
      </div>
    </>
  )
}
