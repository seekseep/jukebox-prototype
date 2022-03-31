import { useRouter } from "next/router";

import RoomDashboard from "../../../../../components/parts/RoomDashboard";
import StudentHeader from '../../../../../components/parts/StudentHeader'

export default function RegularSchedule () {
  const router = useRouter()
  const { query: { roomId, studentId  }} = router

  return (
    <RoomDashboard roomId={roomId}>
      <StudentHeader studentId={studentId} />
    </RoomDashboard>
  )
}
