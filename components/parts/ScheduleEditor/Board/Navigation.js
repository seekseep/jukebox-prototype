import { useRange, useHourRuler, useSchedule } from '../hooks'

import { Select } from '../../forms'
import { format, getWeekOfMonth } from 'date-fns'

export default function Navigation (){
  const { hours } = useHourRuler()
  const schedule = useSchedule()
  const { currentRange, goNextRange, goPrevRange } = useRange()

  return (
    <>
      <div className="fixed top-16 h-12 left-0 right-0 flex bg-white border-b z-[1002]">
        <div className="w-48 flex-shrink-0 bg-gray-50 p-1 flex flex-col items-stretch border-r">

        </div>
        <div className="flex flex-col">
          <div className="flex gap-3 items-stretch leading-none h-12 p-2 sticky left-48">
            {(currentRange && getWeekOfMonth(currentRange[0]) > 1) ? (
              <button type="button" onClick={goPrevRange} className="bg-gray-100 rounded p-2">⬅</button>
            ) : <div className="w-8" />}
            <div className="flex items-center gap-2">
              <div>第{currentRange && getWeekOfMonth(currentRange[0])}週</div>
              <div className="flex gap-1">
                <div>
                  {currentRange && format(currentRange[0], 'MM月dd日')}
                </div>
                <div>~</div>
                <div>
                  {currentRange && format(currentRange[currentRange.length - 1], 'MM月dd日')}
                </div>
              </div>
            </div>
            {(currentRange && getWeekOfMonth(currentRange[0]) < getWeekOfMonth(schedule.finishedAt.toDate())) ? (
              <button type="button" onClick={goNextRange} className="bg-gray-100 rounded p-2">➡</button>
            ) : <div className="w-8" />}
          </div>
        </div>
       </div>
       <div className="pt-28 sticky top-0 z-[1001] bg-white">
        <div className="flex">
          <div className="w-48 border-r border-b flex-shrink-0 sticky left-0 bg-white" />
          <div className={`w-[${hours.length * 12}rem] flex`}>
          {hours.map(({ hour, minutes },i) => (
            <div key={i} className="flex flex-col text-sm bg-white flex-shrink-0">
              <div className="px-2 pt-1 border-r">{hour}:00</div>
              <div className="flex">
                {minutes.map((minute,i) => (
                  <div key={i} className="w-8 h-2 border-r" />
                ))}
              </div>
            </div>
          ))}
          <div className="w-72" />
          </div>
        </div>
      </div>
    </>
  )
}
