import * as Yup from 'yup'

export const nullableDateSchema = Yup.date().nullable()

export const optionSchema = Yup.object().shape({
  label: Yup.string(),
  value: Yup.string(),
}).default({
  label: '',
  value: ''
})

export const numberOptionSchema = Yup.object().shape({
  label: Yup.string(),
  value: Yup.number(),
})
