import Head from 'next/head'
import Link from 'next/link'
import { useRooms } from '../hooks/rooms'

function RoomCard ({ room }) {
  return (
    <div className="w-1/4 px-4 mb-4">
      <Link href={`/rooms/${room.id}`} passHref>
        <div className="border rounded p-4 flex flex-col cursor-pointer">
          <div className="text-xl">{room.name}</div>
          <div className="text-gray-800">{room.id}</div>
        </div>
      </Link>
    </div>
  )
}

export default function Home () {
  const rooms = useRooms()

  return (
    <>
      <Head>
        <title>教室一覧</title>
      </Head>
      <div className="min-h-screen flex flex-col items-stretch">
        <div className="py-12 border-b bg-gray-100">
          <div className="px-4 mx-auto max-w-4xl flex flex-col gap-2">
            <div className="text-2xl">教室一覧</div>
            <div>あなたの教室の一覧</div>
          </div>
        </div>
        <div className="py-12 flex-grow">
          <div className="max-w-4xl flex flex-wrap gap-4 mx-auto ">
            {rooms.map(room =>
              <RoomCard key={room.id} room={room} />
            )}
          </div>
        </div>
        <div>
          <div className="max-w-4xl mx-auto p-4 flex justify-center gap-4">
            <Link href="/logout">
              <a className="text-blue-500 underline">ログアウト</a>
            </Link>
          </div>
        </div>
      </div>

    </>
  )
}
