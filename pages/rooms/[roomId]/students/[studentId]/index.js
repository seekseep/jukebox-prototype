import { useRouter } from "next/router";

import { useStudent } from "../../../../../hooks/students";

import { Button } from "../../../../../components/parts/buttons";
import RoomDashboard from "../../../../../components/parts/RoomDashboard";
import StudentHeader from '../../../../../components/parts/StudentHeader'


export default function Student () {
  const router = useRouter()
  const { query: { roomId, studentId  }} = router

  const student = useStudent(studentId)

  return (
    <RoomDashboard roomId={roomId}>
      <StudentHeader studentId={studentId} />
      {student && (
        <section className="px-4">
          <div className="bg-white rounded-lg shadow-lg border">
            <div className="bg-gray-50 p-2 border-b flex justify-end">
              <Button sm secondary>編集する</Button>
            </div>
            <div className="flex flex-col">
              <div className="flex items-start">
                <div className="w-32 p-2 text-gray-600">氏名</div>
                <div className="flex-grow p-2">{student.name}</div>
              </div>
            </div>
          </div>
        </section>
      )}
    </RoomDashboard>
  )
}
