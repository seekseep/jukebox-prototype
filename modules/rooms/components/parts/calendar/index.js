import classNames from 'classnames'
import { WithDocRef, WithDocRefs } from '@/components/utilities/withDocRefs'

import {
  useCalendarContext,
  useGridStyle,
  useHours,
  useLessonStyle,
  useBodyColStyle,
  useHeadColStyle,
  useLessonContainerStyle
} from './hooks'

export function Row ({ className, ...props }) {
  return <div className={classNames(className, 'flex relative')} {...props} />
}

export function Col ({ className, ...props }) {
  return <div className={classNames(className, 'shrink-0 border-r border-b')} {...props} />
}

export function HeadCol ({ style, className, ...props }) {
  const headColStyle = useHeadColStyle(style)
  return <Col style={headColStyle} className={classNames(className, 'bg-white')} {...props} />
}

export function BodyCol ({ className, ...props }) {
  const style = useBodyColStyle()
  return <Col style={style} className={classNames(className, 'bg-gray-50')} {...props} />
}

export function LessonsContainer ({ style, children }) {
  const lessonContainerStyle = useLessonContainerStyle(style)
  return (
    <div className="w-full h-full absolute" style={lessonContainerStyle}>
      {children}
    </div>
  )
}

export function Lesson ({ lesson, placement }) {
  const style = useLessonStyle(placement)
  return (
    <div className="absolute left-0 top-0 p-1" style={style}>
      <div className="w-full h-full border bg-white rounded shadow-sm">
        <div className="flex flex-wrap gap-2 text-xs p-1">
          <WithDocRef docRef={lesson.subject}>
            {({ data: subject }) => (
              <div>{subject.name}</div>
            )}
          </WithDocRef>
          <div className="flex gap-1">
            <WithDocRefs docRefs={lesson.teachers}>
              {({ data: teacher }) => (
                <div>{teacher.name}</div>
              )}
            </WithDocRefs>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HoursHeadRow () {
  const { hourColWidth, headColWidth } = useCalendarContext()
  const hours = useHours()
  const headColStyle = useGridStyle({ width: headColWidth })
  const hourColStyle = useGridStyle({ width: hourColWidth })

  return (
    <Row>
      <HeadCol style={headColStyle} />
      {hours.map(hour => (
        <HeadCol key={hour} style={hourColStyle}>
          <div className="text-xs text-gray-500 p-1">{hour}:00</div>
        </HeadCol>
      ))}
    </Row>
  )
}

export function HoursBodyRow () {
  const { hourColWidth } = useCalendarContext()
  const style = useGridStyle({ width: hourColWidth  })
  const horus = useHours()
  return (
    <Row>
      {horus.map(hour => <BodyCol key={hour} style={style} />)}
    </Row>
  )
}

export function CalendarContainer ({ children }) {
  const { hourColWidth, headColWidth } = useCalendarContext()
  const hours = useHours()
  const innerStyle = useGridStyle({
    width: hours.length * hourColWidth + headColWidth,
  })

  return (
    <div className="overflow-auto w-full pb-4">
      <div style={innerStyle}>
        {children}
      </div>
    </div>
  )
}
