import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'
import { add, format, startOfHour } from 'date-fns'

import { FORM_ERROR_REQUIRED, FORM_ERROR_REQURIED_ONE_ITEM } from '@/messages'
import { dateSchema } from '@/schemas/forms'

import { REPEAT_TYPE, SCHEDULE_TYPE } from '@rooms/constants'

export function useValidationSchema() {
  return useMemo(() => {
    const validationSchema = Yup.object().shape({
      type  : Yup.string().default(SCHEDULE_TYPE.AVAILABLE),
      repeat: Yup.string().oneOf(Object.values(REPEAT_TYPE)).default(REPEAT_TYPE.WEEKLY),

      // NOTE: 繰り返しなし
      startedAt: dateSchema.when('repeat', {
        is  : (repeat) => repeat === REPEAT_TYPE.NONE,
        then: schema => schema.required(FORM_ERROR_REQUIRED)
      }).default(startOfHour(new Date())),
      finishedAt: dateSchema.when(['repeat', 'isAllDay'], {
        is  : (repeat, isAllDay) => repeat === REPEAT_TYPE.NONE && isAllDay === false,
        then: schema => schema.required(FORM_ERROR_REQUIRED)
      }).default(add(startOfHour(new Date()), { hours: 1 })),
      isAllDay: Yup.boolean().default(false),

      // NOTE: 繰り返しあり
      repeatStartTime: Yup.string().nullable().when('repeat', {
        is  : repeat => repeat !== REPEAT_TYPE.NONE,
        then: schema => schema.required(FORM_ERROR_REQUIRED)
      }).default(format(startOfHour(new Date()), 'HH:mm')).transform(v => v ?? ''),
      repeatFinishTime: Yup.string().nullable().when('repeat', {
        is  : repeat => repeat !== REPEAT_TYPE.NONE,
        then: schema => schema.required(FORM_ERROR_REQUIRED)
      }).default(format(add(startOfHour(new Date()), { hours: 1 }), 'HH:mm')).transform(v => v ?? ''),
      repeatStartDate: dateSchema.when('repeat', {
        is  : repeat => repeat !== REPEAT_TYPE.NONE,
        then: schema => schema.required(FORM_ERROR_REQUIRED)
      }).default(new Date()),
      repeatFinishDate: dateSchema.default(null),
      repeatIndexes   : Yup.array().nullable().when('repeat', {
        is  : repeat => repeat !== REPEAT_TYPE.NONE,
        then: schema => schema.test({
          message: FORM_ERROR_REQURIED_ONE_ITEM,
          test   : repeatIndexes => (repeatIndexes?.length > 0)
        })
      }).default([]).transform(v => v ?? []),
      repeatTermValue: Yup.number().nullable().default(1).min(1).max(999).default(null),

      comment: Yup.string().default('')
    })
    return validationSchema
  }, [])
}

export function useInitialValue(schedule) {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    const initialValues = validationSchema.cast({
      ...schedule
    }, { stripUnknown: true })
    return initialValues
  }, [schedule, validationSchema])
}

export function useValuesToResult () {
  return useCallback(({
    type, repeat, comment,
    startedAt, finishedAt, isAllDay,
    repeatStartTime, repeatFinishTime,
    repeatStartDate, repeatFinishDate,
    repeatIndexes
  }) => {
    const schedule = {
      type, repeat, comment
    }

    switch (repeat) {
      case REPEAT_TYPE.WEEKLY:
      case REPEAT_TYPE.MONTHLY:
        schedule.startedAt = null
        schedule.finishedAt = null
        schedule.isAllDay = false
        schedule.repeatStartTime = repeatStartTime
        schedule.repeatFinishTime = repeatFinishTime
        schedule.repeatStartDate = repeatStartDate
        schedule.repeatFinishDate = repeatFinishDate ?? null
        schedule.repeatIndexes = repeatIndexes
      break
      case REPEAT_TYPE.DAILY:
      case REPEAT_TYPE.YEARLY:
      default:
        schedule.startedAt = startedAt
        schedule.finishedAt = isAllDay ? null : finishedAt
        schedule.isAllDay = isAllDay
        schedule.repeatStartTime = null
        schedule.repeatFinishTime = null
        schedule.repeatStartDate = null
        schedule.repeatFinishDate = null
        schedule.repeatIndexes = []
    }

    return schedule
  }, [])
}
