import Link from 'next/link'

import { useGetRoomPath } from '@/hooks/router'
import { useRoom, useSchedule, useSchool } from './hooks'

import { Button } from '../buttons'
import { SCHEDULE_STATUS } from '../../../constatnts'
import { format } from 'date-fns'

export default function Navigation () {
  const room = useRoom()
  const school = useSchool()
  const schedule = useSchedule()
  const getRoomPath = useGetRoomPath(school?.id, room?.id)

  return (
    <div className="bg-white border-b h-16 fixed top-0 left-0 right-0 flex gap-4 px-4 z-[3000]">
      <div className="flex flex-grow gap-2 items-center">
        <Link href={getRoomPath('/schedules')}>
          <a className="flex gap-2 p-2">
            <div>👈</div>
            <div>授業予定一覧へ</div>
          </a>
        </Link>
        {schedule && (
          <div className="flex gap-2 items-center leading-none">
            <div className="w-32 text-right">{format(schedule.startedAt.toDate(), 'yyyy年MM月dd日')}</div>
            <div className="text-sm">~</div>
            <div className="w-32 text-right">{format(schedule.finishedAt.toDate(), 'yyyy年MM月dd日')}</div>
          </div>
        )}
      </div>
      <div className="flex gap-2 items-center">
        {schedule?.status === SCHEDULE_STATUS.UNSUBMITTED && (
          <>
            <Button>確定する</Button>
          </>
        )}
        {schedule?.status === SCHEDULE_STATUS.SUBMITTED && (
          <>
            <Button>編集する</Button>
            <Button>公開する</Button>
          </>
        )}
        {schedule?.status === SCHEDULE_STATUS.PUBLISHED && (
          <>
            <Button>非公開にする</Button>
            <Button>出力する</Button>
          </>
        )}
        {schedule?.status === SCHEDULE_STATUS.ARCHIVED && (
          <>
            <Button>編集する</Button>
          </>
        )}
      </div>
    </div>
  )
}
