import { format, getMonth } from 'date-fns'
import Link from 'next/link'
import classNames from 'classnames'

import { useWeekEventsFromYearAndMonth } from '../../../hooks/calendars'

export default function MonthlyCalendar ({ year, month, events, onGoNext, onGoBack, eventBaseUrl = '/events' }) {
  const weeks = useWeekEventsFromYearAndMonth(year, month, events)

  return (
    <div className="p-3 flex flex-col gap-4">
      <div className="flex gap-2 items-center justify-between">
        <button className="bg-gray-100 rounded p-2 text-sm" onClick={onGoBack}>戻る</button>
        <div className="flex gap gap-2 text-lg">
          <div className="w-16 text-right">{year}年</div>
          <div className="w-16 text-right">{month}月</div>
        </div>
        <button className="bg-gray-100 rounded p-2 text-sm" onClick={onGoNext}>次へ</button>
      </div>
      <div className="border-l border-t">
      <div className="flex border-b">
        <div className="text-center p-2 border-r w-[14.285%]">日</div>
        <div className="text-center p-2 border-r w-[14.285%]">月</div>
        <div className="text-center p-2 border-r w-[14.285%]">火</div>
        <div className="text-center p-2 border-r w-[14.285%]">水</div>
        <div className="text-center p-2 border-r w-[14.285%]">木</div>
        <div className="text-center p-2 border-r w-[14.285%]">金</div>
        <div className="text-center p-2 border-r w-[14.285%]">土</div>
      </div>
      {weeks.map((week, w) => (
        <div key={w} className="border-b flex">
          {week.map(({ date, events }, d) => (
            <div key={d} className="flex-shrink p-1 border-r w-[14.285%] text-sm flex flex-col gap-2">
              <div className={classNames('w-6 text-right', {
                'text-gray-400': getMonth(date) !== month - 1
              })}>
                {format(date, 'dd')}
              </div>
              <div className='flex flex-col gap-2 h-16 overflow-scroll'>
                {events?.map(event =>
                  <Link href={`${eventBaseUrl}/${event.id}`} key={event.id}>
                    <a className="bg-gray-100 rounded px-1">
                      {event.name}
                    </a>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
      </div>
    </div>
  )
}
