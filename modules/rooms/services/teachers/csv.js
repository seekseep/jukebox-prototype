import { GENDER_TYPE } from '@/constants'
import { parse } from 'csv-parse/sync'
import { isValid } from 'date-fns'

const teacherColumnDefinition = {
  name: {
    keys     : ['name', '氏名'],
    transform: String
  },
  nameKana: {
    keys     : ['nameKana', '氏名フリガナ'],
    transform: String
  },
  gender: {
    keys     : ['gender', '性別'],
    transform: (value) => {
      switch(value) {
        case '男':
          return GENDER_TYPE.MALE
        case '女':
          return GENDER_TYPE.FEMALE
        case 'その他':
          return GENDER_TYPE.OTHER
        default:
          return ''
      }
    }
  },
  bornedAt: {
    keys     : ['bornedAt', '生年月日'],
    transform: (value) => {
      const date = new Date(value)
      if (!isValid(date)) {
        return ''
      }
      return date
    }
  }
}

function parseRow (row) {
  const teacher = {}

  for (let key in teacherColumnDefinition) {
    const column = teacherColumnDefinition[key]
    for (let columnKey of column.keys) {
      const value = row[columnKey]
      if (value) {
        teacher[key] = column.transform ? column.transform(value) : value
        break
      }
    }
  }

  return teacher
}

export function parseTeachersCsv (teacherCsvString) {
  const data = parse(teacherCsvString, {
    columns         : true,
    skip_empty_lines: true
  })

  const teachers = []

  data.forEach(row => {
    const teacher = parseRow(row)
    teachers.push(teacher)
  })

  return teachers
}
