import Link from "next/link"

export default function ViewResources () {
  return (
    <>
      <div className="w-full bg-gray-100 py-16">
        <div className="text-center font-bold text-xl">Juke Box</div>
      </div>
      <div className="max-w-xl mx-auto p-4 flex flex-col items-stretch">
        <div className="flex flex-col gap-3">
          <Link href="/schools">
            <a className="p-2 border flex items-center gap-3 rounded">
              <div className="text-4xl">🏫</div>
              <div>学校</div>
            </a>
          </Link>
          <Link href="/rooms">
            <a className="p-2 border flex items-center gap-3 rounded opacity-50">
              <div className="text-4xl">🚪</div>
              <div>教室</div>
            </a>
          </Link>
          <Link href="/teachers">
            <a className="p-2 border flex items-center gap-3 rounded opacity-50">
              <div className="text-4xl">👤</div>
              <div>講師</div>
            </a>
          </Link>
          <Link href="/students">
            <a className="p-2 border flex items-center gap-3 rounded opacity-50">
              <div className="text-4xl">👤</div>
              <div>生徒</div>
            </a>
          </Link>
        </div>
      </div>
    </>


  )
}
