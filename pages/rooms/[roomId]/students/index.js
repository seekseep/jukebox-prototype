import Link from "next/link";
import { useRouter } from "next/router";

import { useGetRoomLink } from "../../../../hooks/rooms";
import { useStudentsByRoomId } from "../../../../hooks/students";

import RoomDashboard from "../../../../components/parts/RoomDashboard";
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from "../../../../components/parts/Breadcrumbs";

export default function Students () {
  const { query: { roomId }} = useRouter()

  const students = useStudentsByRoomId(roomId)
  const getRoomLink = useGetRoomLink(roomId)

  return (
    <RoomDashboard roomId={roomId}>
      <Breadcrumbs>
        <BLink href={getRoomLink("/")}>ホーム</BLink>
        <BCurrent>生徒一覧</BCurrent>
      </Breadcrumbs>
      <section className="px-4 flex flex-col gap-4">
        <h1 className="text-3xl py-2 text-gray-700">生徒の一覧</h1>
        <div className="bg-white rounded-lg shadow-lg border">
          <div className="bg-gray-50 border-b flex justify-end p-3">
            <Link href={getRoomLink("/students/new")}>
              <a className="bg-blue-500 text-white rounded p-2 text-sm">生徒を登録する</a>
            </Link>
          </div>
          <div className="flex flex-col">
            {students?.length > 0 ? students.map(student => (
              <Link key={student.id} href={getRoomLink(`/students/${student.id}`)}>
                <a className="border-b py-1 px-3 hover:bg-gray-50">{student.name}</a>
              </Link>
            )) : (
              <div className="py-12 text-center text-gray-500">
                生徒が登録されていません
              </div>
            )}
          </div>
        </div>
      </section>

    </RoomDashboard>
  )
}
