import { SCHEDULE_STATUS } from '../../../constatnts'
import { useSchedule } from './hooks'

export default function Deck () {
  const schedule = useSchedule()

  if(schedule?.status !== SCHEDULE_STATUS.UNSUBMITTED) return null

  return (
    <div className="bg-white w-64 fixed top-16 right-0 bottom-0 border-l shadow-lg z-[2000]">

    </div>
  )
}
