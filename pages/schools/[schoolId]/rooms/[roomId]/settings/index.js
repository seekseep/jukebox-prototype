import { useRouter } from 'next/router'
import RoomDashboard from '../../../../../../components/features/rooms/RoomDashboard'
export default function Basic () {
  const { query: { schoolId, roomId } } = useRouter()
  return (
    <RoomDashboard title="基本設定" schoolId={schoolId} roomId={roomId} />
  )
}
