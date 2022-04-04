import { useRoom, useHourRuler, useRange, useGetLessonsByTeacherIdAndDate } from '../hooks'
import { getDay, getHours, getMinutes, add }from'date-fns'

import { useTeachersByRoomId } from '../../../../hooks/teachers'

import Navigation from './Navigation'
import { WEEK_DAY } from '../../../../constatnts'
import classNames from 'classnames'

export default function Board () {
  const room = useRoom()
  const teachers = useTeachersByRoomId(room?.id)

  const { currentRange } = useRange()
  const { hours } = useHourRuler()

  const getLessonsByTeacherIdAndDate = useGetLessonsByTeacherIdAndDate()

  return (
    <div className="w-screen overflow-scroll">
      <Navigation />
      {teachers?.map(teacher => (
        <div key={teacher.id} className="flex">
          <div className="w-48 border-r flex items-streach sticky left-0 top-0 z-[1000] flex-shrink-0 bg-white">
            <div className="flex-grow flex flex-col border-b justify-center">
              <div className="px-2 sticky top-0">{teacher.name}</div>
            </div>
            <div className="flex flex-col">
              {currentRange && currentRange.map((date) => {
                const day = getDay(date)
                if (room.frames[day].length < 1) return null
                return (
                  <div key={date.getTime()} className="p-1 text-sm h-8 border-b">
                    {day === WEEK_DAY.SUNDAY && '日'}
                    {day === WEEK_DAY.MONDAY && '月'}
                    {day === WEEK_DAY.TUESDAY && '火'}
                    {day === WEEK_DAY.WEDNESDAY && '水'}
                    {day === WEEK_DAY.THURSDAY && '木'}
                    {day === WEEK_DAY.FRIDAY && '金'}
                    {day === WEEK_DAY.SATURDAY && '土'}
                  </div>
                )
              })}
            </div>
          </div>
          <div className={classNames('flex flex-col')}>
            {currentRange && currentRange.map((date) => {
              const day = getDay(date)

              if (room.frames[day].length < 1) return null

              const lessons = getLessonsByTeacherIdAndDate(teacher.id, date)
              return (
                <div key={day} className={`flex relative w-[${hours.length*12}]rem`}>
                  {hours.map((hour,i) => (
                    <div key={i} className="flex">
                      {hour.minutes.map((minute,i) => (
                        <div key={i} className="flex-shrink-0 h-8 w-8 border-b border-r flex-grow-0 overflow-visible" />
                      ))}
                    </div>
                  ))}
                  <div className="w-72" />
                  {lessons.map(lesson => {
                    const base = add(date, { hours: hours[0].hour })
                    const offset = (lesson.startedAt - base.getTime()) / 1000 / 60 / 60 * 6
                    const duration = (lesson.finishedAt - lesson.startedAt) / 1000 / 60 / 60 * 6

                    return (
                      <div
                        key={lesson.id}
                        className="absolute h-8 top-0 left-0 p-1" style={{ left: `${offset * 2}rem`, width: `${duration * 2}rem` }}>
                        <div draggable className="w-full h-full rounded border border-blue-50 bg-blue-500 text-white text-xs p-1">
                          {lesson.name}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
