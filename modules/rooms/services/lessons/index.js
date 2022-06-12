import { add, getDay, getDaysInMonth, startOfMonth, getDate, getDaof } from 'date-fns'

// NOTE: 任意の日の 日付 > 生徒 授業の一覧
export function getDateStudentLessonsSet (lessons, { students, date }) {
  // NOTE: 空を作る
  const studentLessonsSets = students.reduce((studentLessonsSets, student) => ({
    ...studentLessonsSets,
    [student.id]: {
      student,
      lessons: []
    }
  }), {})

  // NOTE: 授業を入れる
  lessons.forEach((lesson) => {
    lesson.students.forEach(student => {
      const studentLessonSet = studentLessonsSets[student.id]
      if (!studentLessonSet) return
      studentLessonSet.lessons.push(lesson)
    })
  })

  // NOTE: 整形する
  return {
    date,
    students: Object.values(studentLessonsSets)
  }
}

// NOTE: 任意の日の 日付 > 講師 授業の一覧
export function getDateTeacherLessonsSet (lessons, { teachers, date }) {
  // NOTE: 空を作る
  const teacherLessonsSets = teachers.reduce((teacherLessonsSets, teacher) => ({
    ...teacherLessonsSets,
    [teacher.id]: {
      teacher,
      lessons: []
    }
  }), {})

  // NOTE: 授業を入れる
  lessons.forEach((lesson) => {
    lesson.teachers.forEach(teacher => {
      const teacherLessonSet = teacherLessonsSets[teacher.id]
      if (!teacherLessonSet) return
      teacherLessonSet.lessons.push(lesson)
    })
  })

  // NOTE: 整形する
  return {
    date,
    teachers: Object.values(teacherLessonsSets)
  }
}

// NOTE: 任意の週の 日付 > 講師 授業の一覧
export function getWeekDayTeacherLessonsSets (lessons, { startedAt, teachers, days }) {
  const dayTeacherLessonsSets = days.map((day) => ({
    date    : add(startedAt, { days: day }),
    teachers: teachers.reduce((teacherLessonsSets, teacher) => {
      return {
        ...teacherLessonsSets,
        [teacher.id]: {
          teacher,
          lessons: []
        }
      }
    }, {})
  }))

  lessons.forEach((lesson) => {
    const day = getDay(lesson.startedAt)
    lesson.teachers.forEach(teacher => {
      const teacherLessonsSet = dayTeacherLessonsSets[day]?.teachers[teacher.id]
      if (!teacherLessonsSet) return
      teacherLessonsSet.lessons.push(lesson)
    })
  })

  return Object.values(dayTeacherLessonsSets).map(({ date, teachers: teacherLessonsSets }) => {
    return {
      date,
      teachers: Object.values(teacherLessonsSets)
    }
  })
}

// NOTE: 任意の週の 日付 > 生徒 授業の一覧
export function getWeekDayStudentLessonsSets (lessons, { startedAt, students, days }) {
  const dayStudentLessonsSets = days.map((day) => ({
    date    : add(startedAt, { days: day }),
    students: students.reduce((studentLessonsSets, student) => {
      return {
        ...studentLessonsSets,
        [student.id]: {
          student,
          lessons: []
        }
      }
    }, {})
  }))

  lessons.forEach((lesson) => {
    const day = getDay(lesson.startedAt)
    lesson.students.forEach(student => {
      const studentLessonsSet = dayStudentLessonsSets[day]?.students[student.id]
      if (!studentLessonsSet) return
      studentLessonsSet.lessons.push(lesson)
    })
  })

  return Object.values(dayStudentLessonsSets).map(({ date, students: studentLessonsSets }) => {
    return {
      date,
      students: Object.values(studentLessonsSets)
    }
  })
}

// NOTE: 任意の週の 講師 > 日付 別授業の一覧
export function getTeacherDateLessonsSets(lessons, { teachers, date }) {
  const teacherDateLessonsSets = teachers.reduce((teacherDateLessonsSets, teacher) => ({
    ...teacherDateLessonsSets,
    [teacher.id]: {
      teacher,
      dates: [{
        date,
        lessons: []
      }]
    }
  }), {})

  lessons.forEach((lesson) => {
    lesson.teachers.forEach(teacher => {
      const dateLessonsSet = teacherDateLessonsSets[teacher.id]?.dates[0]
      if (!dateLessonsSet) return
      dateLessonsSet.lessons.push(lesson)
    })
  }, [])

  return Object.values(teacherDateLessonsSets)
}

// NOTE: 任意の週の 生徒 > 日付 別授業の一覧
export function getStudentDateLessonsSets(lessons, { students, date }) {
  const studentDateLessonsSets = students.reduce((studentDateLessonsSets, student) => ({
    ...studentDateLessonsSets,
    [student.id]: {
      student,
      dates: [{
        date,
        lessons: []
      }]
    }
  }), {})

  lessons.forEach((lesson) => {
    lesson.students.forEach(student => {
      const dateLessonsSet = studentDateLessonsSets[student.id]?.dates[0]
      if (!dateLessonsSet) return
      dateLessonsSet.lessons.push(lesson)
    })
  }, [])

  return Object.values(studentDateLessonsSets)
}

function getEmptyWeekDayLessonsSets (startedAt, days) {
  return days.reduce((dayLessonsSets, day) => {
    const date = add(startedAt, { days: day })
    return {
      ...dayLessonsSets,
      [day]: {
        date,
        lessons: []
      }
    }
  }, {})
}

// NOTE: 任意の週の 講師 > 日付 別授業の一覧
export function getTeacherWeekDayLessonsSets (lessons, { days, startedAt, teachers }) {
  // NOTE: 空を作る
  const teacherDayLessonsSets = teachers.reduce((teacherDayLessonsSets, teacher) => ({
    ...teacherDayLessonsSets,
    [teacher.id]: {
      teacher,
      days: getEmptyWeekDayLessonsSets(startedAt, days)
    }
  }), {})

  // NOTE: 授業を入れる
  lessons.forEach((lesson) => {
    const day = getDay(lesson.startedAt)
    lesson.teachers.forEach(teacher => {
      const dayLessonsSet = teacherDayLessonsSets[teacher.id]?.days[day]
      if (!dayLessonsSet) return
      dayLessonsSet.lessons.push(lesson)
    })
  })

  // NOTE: 整形する
  return Object.values(teacherDayLessonsSets).map(({ teacher, days: dayLessonsSets }) => ({
    teacher,
    dates: Object.values(dayLessonsSets)
  }))
}

// NOTE: 任意の週の 生徒 > 日付 授業の一覧
export function getStudentWeekDayLessonsSets (lessons, { days, startedAt, students }) {
  // NOTE: 空を作る
  const studentDayLessonsSets = students.reduce((studentDayLessonsSets, student) => ({
    ...studentDayLessonsSets,
    [student.id]: {
      student,
      days: getEmptyWeekDayLessonsSets(startedAt, days)
    }
  }), {})

  // NOTE: 授業を入れる
  lessons.forEach((lesson) => {
    const day = getDay(lesson.startedAt)
    lesson.students.forEach(student => {
      const dayLessonsSet = studentDayLessonsSets[student.id]?.days[day]
      if (!dayLessonsSet) return
      dayLessonsSet.lessons.push(lesson)
    })
  })

  // NOTE: 整形する
  return Object.values(studentDayLessonsSets).map(({ student, days: dayLessonsSets }) => ({
    student,
    dates: Object.values(dayLessonsSets)
  }))
}

function getEmptyMontyDayLessonsSets (startedAt) {
  const start = startOfMonth(startedAt)
  return new Array(getDaysInMonth(start)).fill(null).reduce((dayLessonsSets, _, index) => {
    const date = add(start, { days: index })
    return {
      ...dayLessonsSets,
      [index + 1]: {
        date,
        lessons: []
      }
    }
  }, {})
}

// NOTE: 任意の月の 講師 > 日付 授業の一覧
export function getTeacherMonthDateLessonsSets(lessons, { startedAt, teachers }) {
  // NOTE: 空を作る
  const teacherDateLessonsSets = teachers.reduce((teacherDateLessonsSets, teacher) => ({
    ...teacherDateLessonsSets,
    [teacher.id]: {
      teacher,
      dates: getEmptyMontyDayLessonsSets(startedAt)
    }
  }), {})

  // NOTE: 授業を入れる
  lessons.forEach((lesson) => {
    lesson.teachers.forEach(teacher => {
      const dateLessonsSet = teacherDateLessonsSets[teacher.id]?.dates[getDate(lesson.startedAt) - 1]
      if (!dateLessonsSet) return
      dateLessonsSet.lessons.push(lesson)
    })
  })

  // NOTE: 整形する
  return Object.values(teacherDateLessonsSets).map(({ teacher, dates: dateLessonsSets }) => ({
    teacher,
    dates: Object.values(dateLessonsSets)
  }))
}

// NOTE: 任意の月の 生徒 > 日付 授業の一覧
export function getStudentMonthDateLessonsSets(lessons, { startedAt, students }) {
  // NOTE: 空を作る
  const studentDateLessonsSets = students.reduce((studentDateLessonsSets, student) => ({
    ...studentDateLessonsSets,
    [student.id]: {
      student,
      dates: getEmptyMontyDayLessonsSets(startedAt)
    }
  }), {})

  // NOTE: 授業を入れる
  lessons.forEach((lesson) => {
    lesson.students.forEach(student => {
      const dateLessonsSet = studentDateLessonsSets[student.id]?.dates[getDate(lesson.startedAt) - 1]
      if (!dateLessonsSet) return
      dateLessonsSet.lessons.push(lesson)
    })
  })

  // NOTE: 整形する
  return Object.values(studentDateLessonsSets).map(({ student, dates: dateLessonsSets }) => ({
    student,
    dates: Object.values(dateLessonsSets)
  }))
}
