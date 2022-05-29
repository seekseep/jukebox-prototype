import { format } from 'date-fns'
import { useMemo } from 'react'
import locale from 'date-fns/locale/ja'

import { getTeacherDayLessonsSets } from '@rooms/services/lessons'

import { CalendarProvider, useCalendarContext, useGridStyle, usePlacedLesssons } from '@rooms/components/parts/calendar/hooks'
import { PrintPage, HoursHeadRow, HoursBodyRow, Row, Col, LessonsContainer, Lesson, PageHeader, PageSection, PageBody } from '@rooms/components/parts/calendar/print'

const TEACHER_PER_PAGE = 2
const TEACHER_NAME_COL_WIDTH = 5
const DAY_NAME_COL_WIDTH = 1.5
const HEAD_COL_WIDTH = TEACHER_NAME_COL_WIDTH + DAY_NAME_COL_WIDTH

function DayLessons({ dayLessons: { date, lessons } }) {
  const placedLessons = usePlacedLesssons(lessons)

  const dayColStyle = useGridStyle({
    width: DAY_NAME_COL_WIDTH,
    left : TEACHER_NAME_COL_WIDTH,
  })

  return (
    <Row>
      <Col style={dayColStyle} className="text-center sticky flex items-center justify-center border-b border-r">
        <div className="text-xs">
          {format(date, 'EEE', { locale })}
        </div>
      </Col>
      <Col className="grow">
        <HoursBodyRow />
        <LessonsContainer>
          {placedLessons.map(({ lesson, placement }) =>
            <Lesson key={lesson.id} lesson={lesson} placement={placement} />
          )}
        </LessonsContainer>
      </Col>
    </Row>
  )
}

function TeacherDayLessons ({ teacherDayLessonsSet: { teacher, days: dayLessonsSets } }) {
  const headColStyle = useGridStyle({
    width: TEACHER_NAME_COL_WIDTH
  })
  return (
    <Row className="grow w-full h-full items-stretch">
      <Col style={headColStyle} className="flex flex-col items-center justify-center border-r border-b">
        <div className="text-sm">{teacher.name}</div>
      </Col>
      <div className="grow grid grid-cols-1">
        {dayLessonsSets.map((dayLessonsSet) => (
            <DayLessons dayLessons={dayLessonsSet} key={dayLessonsSet.date} />
        ))}
      </div>
    </Row>
  )
}

export function Calendar ({ startedAt, lessons, teachers, }) {
  const { days } = useCalendarContext()
  const teacherPerPage = TEACHER_PER_PAGE
  const teacherDayLessonsSets = useMemo(() => getTeacherDayLessonsSets (lessons, { days, startedAt, teachers }), [days, lessons, startedAt, teachers])

  const teacherDayLessonsSetsPages = useMemo(() => {
    const pageCount = Math.ceil(teacherDayLessonsSets.length / teacherPerPage)
    const teacherDayLessonsSetsPages = new Array(pageCount).fill(null).map((_, pageIndex) => {
      return {
        teacherDayLessonsSets: new Array(teacherPerPage).fill(null).map((_, lessonSetIndex) => {
          return teacherDayLessonsSets[pageIndex * teacherPerPage + lessonSetIndex]
        }).filter(Boolean)
      }
    })

    return teacherDayLessonsSetsPages
  }, [teacherDayLessonsSets, teacherPerPage])

  return teacherDayLessonsSetsPages.map(({ teacherDayLessonsSets }, pageIndex) => (
    <PrintPage key={pageIndex}>
      <PageHeader title="印刷タイトル" />
      <HoursHeadRow />
      <PageBody>
        {teacherDayLessonsSets.map(teacherDayLessonsSet => (
          <PageSection key={teacherDayLessonsSet.teacher.id} sectionPerPage={teacherPerPage}>
            <TeacherDayLessons
              teacherDayLessonsSet={teacherDayLessonsSet} />
          </PageSection>
        ))}
      </PageBody>
    </PrintPage>
  ))
}

export default function WeeklyLessonsCalendarByTeacher({ startedAt, lessons, teachers, startHour, endHour, days }) {
  return (
    <CalendarProvider startHour={startHour} endHour={endHour} days={days} headColWidth={HEAD_COL_WIDTH}>
      <Calendar startedAt={startedAt} lessons={lessons} teachers={teachers} />
    </CalendarProvider>
  )
}
