import { format, add } from 'date-fns'
import Link from 'next/link'

import { useWeeklyCalendar } from '../../../hooks/calendars'

export default function WeeklyCalendar ({ startDate, events, eventUrlBase = '/events', onGoNext, onGoBack }) {
  const {
    teachers,
    startDate: calendarStartDate,
    finishDate: calendarFinishDate
  } = useWeeklyCalendar(startDate, events)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <button onClick={onGoBack} className="bg-gray-100 px-2 py-1 rounded">戻る</button>
        <div className="flex gap-1">
          <div>{format(calendarStartDate, 'yyyy/MM/dd')}</div>
          <div>~</div>
          <div>{format(calendarFinishDate, 'yyyy/MM/dd')}</div>
        </div>
        <button onClick={onGoNext} className="bg-gray-100 px-2 py-1 rounded">次へ</button>
      </div>
      <div className="border-l border-t flex flex-col">
        <div className="flex border-b">
          <div className="w-40 border-r" />
          <div className="flex flex-grow">
            <div className={'flex flex-col py-1 items-center w-[14.285%] border-r'}>
              <div className="text-xs">{format(add(calendarStartDate, { days: 0 }), 'MM/dd')}</div>
              <div>日</div>
            </div>
            <div className={'flex flex-col py-1 items-center w-[14.285%] border-r'}>
              <div className="text-xs">{format(add(calendarStartDate, { days: 1 }), 'MM/dd')}</div>
              <div>月</div>
            </div>
            <div className={'flex flex-col py-1 items-center w-[14.285%] border-r'}>
              <div className="text-xs">{format(add(calendarStartDate, { days: 2 }), 'MM/dd')}</div>
              <div>火</div>
            </div>
            <div className={'flex flex-col py-1 items-center w-[14.285%] border-r'}>
              <div className="text-xs">{format(add(calendarStartDate, { days: 3 }), 'MM/dd')}</div>
              <div>水</div>
            </div>
            <div className={'flex flex-col items-center w-[14.285%] border-r'}>
              <div className="text-xs">{format(add(calendarStartDate, { days: 4 }), 'MM/dd')}</div>
              <div>木</div>
            </div>
            <div className={'flex flex-col items-center w-[14.285%] border-r'}>
              <div className="text-xs">{format(add(calendarStartDate, { days: 5 }), 'MM/dd')}</div>
              <div>金</div>
            </div>
            <div className={'flex flex-col items-center w-[14.285%] border-r'}>
              <div className="text-xs">{format(add(calendarStartDate, { days: 6 }), 'MM/dd')}</div>
              <div>土</div>
            </div>
          </div>
        </div>
        {teachers.map(({ user, days }, index) => (
          <div key={index} className="flex border-b">
            <div className="w-40 text-sm p-2 border-r">{user.name}</div>
            <div className="flex flex-grow">
              {days.map((events, index) =>
                <div key={index} className={'w-[14.285%] flex flex-col overflow-scroll gap-2 p-2 border-r'}>
                  {events.map(event => (
                    <Link key={event.id} href={`${eventUrlBase}/${event.id}`}>
                      <a className="rounded bg-gray-100 p-1 text-sm">
                        {event.name}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
