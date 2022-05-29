import classNames from 'classnames'

import { WithDocRef, WithDocRefs } from '@/components/utilities/withDocRefs'

import { useHours } from '../hooks'

import { useHourColStyle, useHeadColStyle, useLessonStyle } from './hooks'

export function PrintPage ({ children }) {
  return (
    <div className="break-before-all" style={{ width: '100vw', height: '100vh' }}>
      <div className="w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  )
}

export function PageHeader ({ title }) {
  return (
    <div className="text-center text-xl h-[2cm] flex w-full items-center justify-center">
      <div className="text-xl">{title}</div>
    </div>
  )
}

export function PageBody ({ children }) {
  return (
    <div className="flex flex-col grow">{children}</div>
  )
}

export function PageSection ({ sectionPerPage = 1, children }) {
  return (
    <div style={{ height: `${100 * 1 / sectionPerPage}%` }}>
      {children}
    </div>
  )
}

export function Row ({ className, ...props }) {
  return <div className={classNames(className, 'flex relative')} {...props} />
}

export function Col ({ className, ...props }) {
  return <div className={classNames(className, 'shrink-0 relative')} {...props} />
}

export function HoursHeadRow () {
  const hours = useHours()
  const headColStyle = useHeadColStyle()
  const hourColStyle = useHourColStyle()
  return (
    <Row>
      <Col className="border-b-2 border-r" style={headColStyle} />
      <Col className="grow">
        <Row>
          {hours.map(hour => (
            <Col className="border-b-2 text-xs px-1 border-r" style={hourColStyle} key={hour}>{hour}:00</Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export function HoursBodyRow () {
  const hours = useHours()
  const hourColStyle = useHourColStyle()
  return (
    <Row className="w-full h-full">
      {hours.map(hour => (
        <Col className="border-r border-b" style={hourColStyle} key={hour} />
      ))}
    </Row>
  )
}

export function LessonsContainer ({ children }) {
  return (
    <div className="w-full h-full absolute">{children}</div>
  )
}

export function Lesson ({ lesson, placement }) {
  const style = useLessonStyle(placement)
  const { isOverflowToBefore, isOverflowToAfter } = placement
  return (
    <div className={classNames('absolute left-0 top-0', {
      'pl-[0.25rem]': !isOverflowToBefore,
      'pr-[0.25rem]': !isOverflowToAfter,
    })} style={style}>
      <div className={classNames('w-full h-full border border-gray-700 bg-white shadow-sm', {
      'rounded-l': !isOverflowToBefore,
      'rounded-r': !isOverflowToAfter,
      })}>
        <div className="flex flex-wrap gap-2 text-xs">
          <WithDocRef docRef={lesson.subject}>
            {({ data: subject }) => (
              <div>{subject.name}</div>
            )}
          </WithDocRef>
          <div className="flex gap-1">
            <WithDocRefs docRefs={lesson.students}>
              {({ data: student }) => (
                <div>{student.name}</div>
              )}
            </WithDocRefs>
          </div>
        </div>
      </div>
    </div>
  )
}
