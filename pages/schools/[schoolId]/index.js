import Link from 'next/link'
import { useRouter } from 'next/router'

export default function School () {
  const {
    query : {
      schoolId
    }
  } = useRouter()

  return (
    <div className="p-12 flex flex-col gap-6">
      <div className="flex gap-4 text-lg">
        <div>サンプル塾</div>
        <div>/</div>
        <div className="font-bold">教室一覧</div>
      </div>
      <div className="flex flex-wrap gap-4">
        <Link href={`/schools/${schoolId}/rooms/1`}>
          <a className="bg-white p-6 text-lg w-72 border rounded text-center">
            北教室
          </a>
        </Link>
        <Link href={`/schools/${schoolId}/rooms/2`}>
          <a className="bg-white p-6 text-lg w-72 border rounded text-center">
            西教室
          </a>
        </Link>
        <Link href={`/schools/${schoolId}/rooms/2`}>
          <a className="bg-white p-6 text-lg w-72 border rounded text-center">
            南教室
          </a>
        </Link>
        <Link href={`/schools/${schoolId}/rooms/new`}>
          <a className="bg-white p-6 w-72 border rounded text-center text-gray-800">
            教室を追加する
          </a>
        </Link>
      </div>
    </div>
  )
}
