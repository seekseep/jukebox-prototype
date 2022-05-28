import classNames from 'classnames'
import { getDay, getHours, getMinutes } from 'date-fns'
import { useMemo } from 'react'

import DayLabel from '@/components/parts/DayLabel'
import { WithDocRef, WithDocRefs } from '@/components/utilities/withDocRefs'

const NAME_WIDTH = 10
const DAY_WIDTH = 2
const HEAD_WIDTH = NAME_WIDTH + DAY_WIDTH
const HOUR_WIDTH = 10
const HOUR_COUNT = 24
const LESSON_HEIGHT = 2
const DAY_LESSONS_WIDTH = DAY_WIDTH + HOUR_WIDTH * HOUR_COUNT
const CONTAINER_WIDTH = HEAD_WIDTH + DAY_LESSONS_WIDTH

const HOURS = new Array(24).fill(null).map((_, i) => i)

export function Row ({ className, ...props }) {
  return <div className={classNames(className, 'flex')} {...props} />
}

export function Col ({ className, ...props }) {
  return <div className={classNames(className, 'shrink-0 border-r border-b')} {...props} />
}

export function HeadCol ({ className, ...props }) {
  return <Col style={{ width: `${HEAD_WIDTH}rem` }} className={classNames(className)} {...props} />
}

export function NameCol ({ className, ...props }) {
  return <Col style={{ width: `${NAME_WIDTH}rem` }} className={classNames(className, 'bg-white')} {...props} />
}

export function DayCol ({ className, ...props }) {
  return <Col style={{ width: `${DAY_WIDTH}rem` }} className={classNames(className, 'bg-white')} {...props} />
}

export function HourCol ({ className, ...props }) {
  return <Col style={{ width: `${HOUR_WIDTH}rem` }} className={classNames(className)} {...props} />
}

export function DayLessonsRow ({ className, ...props }) {
  return (
    <Row
      style={{
        width : `${DAY_LESSONS_WIDTH}rem`,
        height: `${LESSON_HEIGHT * 3 }rem`,
      }}
      className={classNames(className, 'relative')}
      {...props} />
  )
}

export function Container ({ children }) {
  return (
    <div className="overflow-auto w-full pb-4">
      <div style={{ width: `${CONTAINER_WIDTH}rem` }}>
        {children}
      </div>
    </div>
  )
}

function Lesson ({ lesson, style }) {
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

function DayLessons({ day, dayLessons }) {

  const lessonStyles = useMemo(() => {
    const styles = {}
    const rows = []

    dayLessons.forEach(lesson => {
      const { startedAt, finishedAt } = lesson

      let rowIndex = null
      for (let i = 0; i <= rows.length; i++) {
        rows[i] = rows[i] || []

        const lastLesson = rows[i][rows[i].length - 1]
        const isOverlap = !!lastLesson && lastLesson.finishedAt > startedAt
        if (isOverlap) continue

        rowIndex = i
        rows[i].push(lesson)
        break
      }

      const startTime = getHours(startedAt) + getMinutes(startedAt) / 60
      const finishTime = getHours(finishedAt) + getMinutes(finishedAt) / 60

      styles[lesson.id] = {
        left  : `${startTime * HOUR_WIDTH}rem`,
        width : `${(finishTime - startTime) * HOUR_WIDTH}rem`,
        top   : `${rowIndex * LESSON_HEIGHT}rem`,
        zIndex: 1000 + rowIndex
      }
    })

    return styles
  }, [dayLessons])

  return (
    <Row>
      <DayCol className="text-center sticky left-[10rem] flex items-center justify-center z-[1100]">
        <div className="text-sm"><DayLabel day={day} /></div>
      </DayCol>
      <DayLessonsRow>
        {HOURS.map(hour => <HourCol className="border-gray-200 bg-gray-50" key={hour} />)}
        <div className="w-full h-full absolute z-[1000]">
          {dayLessons.map(lesson => <Lesson key={lesson.id} lesson={lesson} style={lessonStyles[lesson.id]} />)}
        </div>
      </DayLessonsRow>
    </Row>
  )
}

function TeacherLessons ({ teacherLessonSet }) {
  return (
    <Row key={teacherLessonSet.teacher.id}>
      <NameCol className="sticky top-0 left-0 flex items-center justify-center z-[1100]">
        <div className="p-2 sticky top-0">{teacherLessonSet.teacher.name}</div>
      </NameCol>
      <div>
        {teacherLessonSet.lessons.map((dayLessons, day) => (
          <DayLessons key={day} dayLessons={dayLessons} day={day} />
        ))}
      </div>
    </Row>
  )
}

export default function WeeklyLessonsCalendarByTeacher({ lessons, teachers }) {

  const teacherLessonSets = useMemo(() => {
    const lessonSetMap = {}
    teachers.forEach(teacher => {
      lessonSetMap[teacher.id] = {
        teacher: teacher,
        lessons: Array.from({ length: 7 }).fill(null).map(() => [])
      }
    })

    lessons.forEach((lesson) => {
      const day = getDay(lesson.startedAt)
      lesson.teachers.forEach(teacher => {
        lessonSetMap[teacher.id].lessons[day].push(lesson)
      })
    })
    return Object.values(lessonSetMap)
  }, [lessons, teachers])

  return (
    <Container>
      <Row className="sticky top-0">
        <HeadCol className="sticky left-0 bg-white" />
        {HOURS.map(hour => (
          <HourCol key={hour} className="bg-white">
            <div className="text-xs text-gray-500 p-1">{hour}:00</div>
          </HourCol>
        ))}
      </Row>
      {teacherLessonSets.map(teacherLessonSet => (
        <TeacherLessons key={teacherLessonSet.teacher.id} teacherLessonSet={teacherLessonSet} />
      ))}
    </Container>
  )
}
