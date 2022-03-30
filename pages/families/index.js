import Link from "next/link"

export default function Families () {
  return (
    <div className="max-w-sm py-32 px-4 mx-auto">

      <div className="flex flex-col gap-4">
        <div className="text-center text-lg font-bold">家庭用ログイン</div>

        <div className="flex flex-col gap-2">
          <label>家族ID</label>
          <input className="p-1 border rounded" type="text" />
        </div>
        <div className="flex flex-col gap-2">
          <label>パスワード</label>
          <input className="p-1 border rounded" type="text" />
        </div>
        <Link href="/families/1">
          <a className="bg-blue-500 text-white rounded text-center p-2">ログイン</a>
        </Link>
        <div className="flex justify-center py-4">
          <Link href="/schools">
            <a className="text-blue-500 underline">講師の方はこちら</a>
          </Link>
        </div>
      </div>

    </div>
  )
}
