import { useRouter } from "next/router";

import { useGetRoomLink } from "../../../../../hooks/rooms";
import { useStudent } from "../../../../../hooks/students";

import RoomDashboard from "../../../../../components/parts/RoomDashboard";
import StudentHeader from '../../../../../components/parts/StudentHeader'

export default function IrregularSchedule () {
  const router = useRouter()
  const { query: { roomId, studentId  }} = router

  return (
    <RoomDashboard roomId={roomId}>
      <StudentHeader studentId={studentId} />
    </RoomDashboard>
  )
}
