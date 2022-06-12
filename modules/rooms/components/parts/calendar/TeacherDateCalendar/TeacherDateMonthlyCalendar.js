import Link from 'next/link'
import { WithDocRef } from '@/components/utilities/withDocRefs'
import { useGetRoomPath } from '@rooms/hooks/router'
import { getTeacherMonthDateLessonsSets } from '@rooms/services/lessons'
import { add, differenceInWeeks, getDate, lastDayOfMonth,startOfMonth, startOfWeek, endOfWeek, differenceInDays, format } from 'date-fns'

import { useMemo } from 'react'
import { useCalendarContext } from '../hooks'

export default function TeacherDateMonthlyCalendar () {
  const {
    roomId,
    lessons,
    teachers,
    startedAt
  } = useCalendarContext()
  const getRoomPath = useGetRoomPath(roomId)

  const teacherDateLessonsSets = useMemo(() =>
    getTeacherMonthDateLessonsSets(lessons, {
      teachers,
      startedAt
    })
  , [lessons, startedAt, teachers])

  const weeks = useMemo(() => {
    if (!startedAt) return []
    const startDate = startOfWeek(startOfMonth(startedAt))
    const endDate = endOfWeek(lastDayOfMonth(startedAt))
    const weeksCount = differenceInWeeks(endDate, startDate)
    return new Array(weeksCount).fill(null).map((_, w) => {
      return new Array(7).fill(null).map((_, d) => {
        const date = add(startDate, { days: w * 7 + d })
        return {
          date,
          dayOfMonth: differenceInDays(date, startOfMonth(startedAt))
        }
      })
    })
  }, [startedAt])

  return (
    teacherDateLessonsSets.map(({ teacher, dates }) => (
      <div className="w-full" key={teacher.id}>
        <div className="p-2 text-center font-lg">
          {teacher.name}
        </div>
        <div className="flex border-t">
          <div className="w-[14.285%] text-center py-2 text-gray-500 text-xs border-r">日</div>
          <div className="w-[14.285%] text-center py-2 text-gray-500 text-xs border-r">月</div>
          <div className="w-[14.285%] text-center py-2 text-gray-500 text-xs border-r">火</div>
          <div className="w-[14.285%] text-center py-2 text-gray-500 text-xs border-r">水</div>
          <div className="w-[14.285%] text-center py-2 text-gray-500 text-xs border-r">木</div>
          <div className="w-[14.285%] text-center py-2 text-gray-500 text-xs border-r">金</div>
          <div className="w-[14.285%] text-center py-2 text-gray-500 text-xs border-r">土</div>
        </div>
        {weeks.map((days, week) => (
          <div key={week} className="flex">
            {days.map(({ date, dayOfMonth }) => {
              const dateLessonsSet = dates[dayOfMonth] || null

              return (
                <div key={date.getTime()} className="w-[14.285%] border-r border-b h-[18vh]">
                  <div className="text-center py-1 text-xs text-gray-500">{getDate(date)}</div>
                  <div className="flex flex-col gap-2">
                    {dateLessonsSet && dateLessonsSet.lessons.map(lesson => (
                      <Link key={lesson.id} href={getRoomPath(`/lessons/${lesson.id}`)}>
                        <a className="text-xs p-1 flex gap-2 flex-wrap items-center cursor-pointer">
                          <WithDocRef docRef={lesson.subject}>
                            {({ data: subject }) => <div>{subject.name}</div>}
                          </WithDocRef>
                          <div className="flex grow justify-end">
                            <div>{format(lesson.startedAt, 'HH:mm')}</div>
                            <div>~</div>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
    </div>
    ))
  )
}
