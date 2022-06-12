import { format, getMinutes } from 'date-fns'
import locale from 'date-fns/locale/ja'

import { WithDocRef, WithDocRefs } from '@/components/utilities/withDocRefs'

import { useGridStyle, usePlacedLesssons } from '@rooms/components/parts/calendar/hooks/layout'
import { Row, HeadCol, LessonsRow, Lesson } from '@rooms/components/parts/calendar/horizontal'

export const HEAD_DATE_COL_WIDTH = 8
export const HEAD_STUDENT_COL_WIDTH = 6
export const HEAD_COL_WIDTH = HEAD_DATE_COL_WIDTH + HEAD_STUDENT_COL_WIDTH

function StudentLesson ({ lesson, placement }) {
  return (
    <Lesson lesson={lesson} placement={placement}>
      <div className="flex flex-wrap gap-2 text-xs p-1">
        <div>{getMinutes(lesson.startedAt)}</div>
        <div className="flex gap-1 grow">
          <WithDocRef docRef={lesson.subject}>
            {({ data: subject }) => (
              <div>{subject.name}</div>
            )}
          </WithDocRef>
          <WithDocRefs docRefs={lesson.teachers}>
            {({ data: teacher }) => (
              <div className="flex">
                <div>{teacher.name}</div>
              </div>
            )}
          </WithDocRefs>
        </div>
        <div>{getMinutes(lesson.finishedAt)}</div>
      </div>
    </Lesson>
  )
}

function StudentLessons({ studentLessonsSet: { student, lessons } }) {
  const placedLessons = usePlacedLesssons(lessons)
  const studentHeadColStyle = useGridStyle({
    width: HEAD_STUDENT_COL_WIDTH,
    left : HEAD_DATE_COL_WIDTH,
  })
  return (
    <Row>
      <HeadCol style={studentHeadColStyle} className="flex items-center justify-center sticky">
        <div className="text-sm">{student.name}</div>
      </HeadCol>
      <LessonsRow>
        {placedLessons.map(({ lesson, placement }) =>
          <StudentLesson key={lesson.id} lesson={lesson} placement={placement} />
        )}
      </LessonsRow>
    </Row>
  )
}

export default function DateStudentLessonsRow ({ dateStudentLessonsSet: { date, students } }) {
  const headColStyle = useGridStyle({
    width: HEAD_DATE_COL_WIDTH
  })

  return (
    <Row>
      <HeadCol style={headColStyle} className="sticky top-0 left-0 flex items-center justify-center">
        <div className="p-2 sticky top-0 text-sm">
          {format(date, 'MM月dd日 EE', { locale })}
        </div>
      </HeadCol>
      <div>
        {students.map((studentLessonsSet) => (
          <StudentLessons
            key={studentLessonsSet.student.id}
            studentLessonsSet={studentLessonsSet} />
        ))}
      </div>
    </Row>
  )
}
