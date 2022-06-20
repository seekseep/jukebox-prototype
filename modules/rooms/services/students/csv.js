import { GENDER_TYPE } from '@/constants'
import { parse } from 'csv-parse/sync'
import { isValid } from 'date-fns'

const studentColumnDefinition = {
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
  },
  schoolName: {
    keys     : ['schoolName', '学校'],
    transform: String
  },
  schoolGrade: {
    keys     : ['schoolGrade', '学年'],
    transform: String
  },
  enteredAt: {
    keys     : ['enteredAt', '入塾日'],
    transform: (value) => {
      const date = new Date(value)
      if (!isValid(date)) {
        return ''
      }
      return date
    }
  },
}

function parseRow (row) {
  const student = {}

  for (let key in studentColumnDefinition) {
    const column = studentColumnDefinition[key]
    for (let columnKey of column.keys) {
      const value = row[columnKey]
      if (value) {
        student[key] = column.transform ? column.transform(value) : value
        break
      }
    }
  }

  return student
}

export function parseStudentsCsv (studentCsvString) {
  const data = parse(studentCsvString, {
    columns         : true,
    skip_empty_lines: true
  })

  const students = []

  data.forEach(row => {
    const student = parseRow(row)
    students.push(student)
  })

  return students
}
