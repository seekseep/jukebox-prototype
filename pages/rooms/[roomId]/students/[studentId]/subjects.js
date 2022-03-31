import { useRouter } from "next/router";
import RoomDashboard from "../../../../../components/parts/RoomDashboard";
import StudentHeader from '../../../../../components/parts/StudentHeader'

export default function Subjects () {
  const router = useRouter()
  const { query: { roomId, studentId  }} = router

  return (
    <RoomDashboard roomId={roomId}>
      <StudentHeader studentId={studentId} />
      <div className="bg-white rounded-lg shadow-lg">

      </div>
    </RoomDashboard>
  )
}
