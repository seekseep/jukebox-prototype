import { useMemo } from "react"

import Head from "next/head"
import Link from "next/link"
import { db } from "../../mocks/db"

export default function Schools () {
  const school = useMemo(() => db.school.getAll()[0], [])
  return (
    <>
      <Head>
        <title>
          学校用ログイン | JUKE BOX プロトタイプ
        </title>
      </Head>
      <div className="max-w-sm py-32 px-4 mx-auto">
        <div className="flex flex-col gap-4">
          <div className="text-center text-lg font-bold">学校用ログイン</div>
          <div className="flex flex-col gap-2">
            <label>学校ID</label>
            <input className="p-1 border rounded" type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <label>パスワード</label>
            <input className="p-1 border rounded" type="text" />
          </div>
          <Link href={`/schools/${school.id}`} passHref>
            <a className="bg-blue-500 text-white rounded text-center p-2">ログイン</a>
          </Link>
          <div className="flex justify-center py-4">
            <Link href="/families">
              <a className="text-blue-500 underline">保護者の方はこちら</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
