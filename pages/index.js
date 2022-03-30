import Link from 'next/link'

export default function Home () {
  return (
    <div className="p-12 flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="text-2xl font-bold flex-grow items-center">教室一覧</div>
        <Link href="/rooms/new">
          <a  className="bg-blue-500 rounded p-2 text-white">
            教室を作成する
          </a>
        </Link>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Link href="/rooms/1">
          <a className="bg-white p-6 text-lg w-72 border rounded">
            北教室
          </a>
        </Link>
        <Link href="/rooms/2">
          <a className="bg-white p-6 text-lg w-72 border rounded">
            西教室
          </a>
        </Link>
        <Link href="/rooms/2">
          <a className="bg-white p-6 text-lg w-72 border rounded">
            南教室
          </a>
        </Link>
      </div>
    </div>
  )
}
