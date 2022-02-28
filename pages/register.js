import Link from 'next/link'
import Head from 'next/head'

export default function Register () {
  return (
    <>
    <Head>
      <title>利用登録</title>
    </Head>
    <div className="p-6 py-32 max-w-lg flex flex-col gap-12 mx-auto">
      <div className="flex justify-center">
        <div className="font-bold text-lg px-3 py-1 shadow text-center bg-green-900 text-white rounded">JUKeBox</div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="text-3xl font-bold">利用開始</div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="">氏名</label>
            <input type="text" className="border p-2 rounded" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">メールアドレス</label>
            <input type="password" className="border p-2 rounded" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">教室名</label>
            <input type="password" className="border p-2 rounded" />
          </div>
          <button className="bg-blue-500 rounded py-2 px-4 text-white">利用を開始する</button>
        </div>
        <Link href="/login" passHref>
          <a className="text-blue-500 underline">ログインする</a>
        </Link>
      </div>
    </div>
    </>
  )
}
