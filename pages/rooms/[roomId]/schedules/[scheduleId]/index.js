import { useRouter } from 'next/router'

import ScheduleEditor from '../../../../../components/parts/ScheduleEditor'

export default function Schedule () {
  const {
    query: {
      roomId,
      scheduleId
    }
  } = useRouter()

  return (
    <ScheduleEditor
        roomId={roomId}
        scheduleId={scheduleId} />
  )
}
