import classNames from 'classnames'
import Link from 'next/link'

import { LESSON_VALIDITY } from '@rooms/constants'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useLessonValidity } from '@rooms/hooks/lessons/validity'

import { useCalendarContext } from '@rooms/components/parts/calendar/hooks'
import { useGridStyle } from '@rooms/components/parts/calendar/hooks/layout'
import {
  useLayoutContext,
  useLessonStyle,
  useBodyColStyle,
  useHeadColStyle,
  useLessonContainerStyle
} from '@rooms/components/parts/calendar/hooks/layout/horizontal'

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
  return <Col style={style} className={classNames(className)} {...props} />
}

export function LessonsContainer ({ style, children }) {
  const lessonContainerStyle = useLessonContainerStyle(style)
  return (
    <div className="w-full h-full absolute" style={lessonContainerStyle}>
      {children}
    </div>
  )
}

export function Lesson ({ lesson, placement, children }) {
  const { roomId } = useCalendarContext()

  const style = useLessonStyle(placement)
  const { isOverflowToBefore, isOverflowToAfter } = placement

  const getRoomPath = useGetRoomPath(roomId)
  const { validity } = useLessonValidity(roomId, lesson.id)

  return (
    <Link href={getRoomPath(`/lessons/${lesson.id}`)}>
      <a className={classNames('block absolute left-0 top-0 pr-1 pb-1 mt-[-1px] ml-[-1px]')} style={style}>
        <div className={classNames('w-full h-full border border-gray-500', {
        'rounded-l'                : !isOverflowToBefore,
        'rounded-r'                : !isOverflowToAfter,
        'bg-white border-gray-300' : validity !== LESSON_VALIDITY.INVALID,
        'bg-red-100 border-red-500': validity === LESSON_VALIDITY.INVALID
        })}>
          {children}
        </div>
      </a>
    </Link>
  )
}

export function HoursHeadRow () {
  const { hourColWidth, headColWidth } = useLayoutContext()
  const { hours } = useCalendarContext()

  const headColStyle = useGridStyle({ width: headColWidth })
  const hourColStyle = useGridStyle({ width: hourColWidth })

  return (
    <Row className="sticky top-0 z-[2000]">
      <HeadCol className="sticky left-0 bg-white" style={headColStyle} />
      {hours.map(hour => (
        <HeadCol key={hour} style={hourColStyle}>
          <div className="text-xs text-gray-500 p-1">{hour}:00</div>
        </HeadCol>
      ))}
    </Row>
  )
}

export function HoursBodyRow () {
  const { hours } = useCalendarContext()
  const { hourColWidth } = useLayoutContext()
  const style = useGridStyle({ width: hourColWidth  })

  return (
    <Row className="sticky top-0">
      {hours.map(hour => (
        <BodyCol className="flex" key={hour} style={style}>
          <div className="w-1/4 border-r border-gray-100" />
          <div className="w-1/4 border-r border-gray-100" />
          <div className="w-1/4 border-r border-gray-100" />
          <div className="w-1/4" />
        </BodyCol>
      ))}
    </Row>
  )
}

export function CalendarContainer ({ children }) {
  const { hourColWidth, headColWidth } = useLayoutContext()
  const { hours } = useCalendarContext()
  const innerStyle = useGridStyle({
    width: hours.length * hourColWidth + headColWidth,
  })

  return (
    <div className="overflow-auto">
      <div style={innerStyle}>
        {children}
      </div>
    </div>
  )
}

export function LessonsRow ({ children }) {
  const {
    lessonRowHeight,
    lessonRowsCount,
    hourColWidth
  } =  useLayoutContext()
  const { hours } = useCalendarContext()

  const lessonsRowStyle = useGridStyle({
    height: lessonRowHeight * lessonRowsCount,
    width : hours.length * hourColWidth,
  })
  return (
    <Row style={lessonsRowStyle}>
      <HoursBodyRow />
      <LessonsContainer>
        {children}
      </LessonsContainer>
    </Row>
  )
}
