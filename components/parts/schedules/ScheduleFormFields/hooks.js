import { useMemo } from 'react'
import * as Yup from 'yup'
import { add, startOfHour } from 'date-fns'

import { REPEAT_TYPE, SCHEDULE_TYPE } from '@/constatnts'
import { FORM_ERROR_REQUIRED } from '@/messages'

import { optionSchema } from '@/schemas/forms'

import { REPEAT_TYPE_OPTIONS } from '@/components/parts/forms/RepeatTypeSelectField'

export function useScheduleValidationSchema() {
  return useMemo(() => {
    return Yup.object().shape({
      startedAt       : Yup.date().nullable().required(FORM_ERROR_REQUIRED).default(startOfHour(new Date())),
      finishedAt      : Yup.date().nullable().required(FORM_ERROR_REQUIRED).default(add(startOfHour(new Date()), { hours: 1 })),
      isAllDay        : Yup.boolean().default(false),
      type            : Yup.string().default(SCHEDULE_TYPE.AVAILABLE),
      repeatFinishedAt: Yup.date().nullable().default(null),
      repeat          : optionSchema.required(FORM_ERROR_REQUIRED).default(REPEAT_TYPE_OPTIONS.NONE),
    })
  }, [])
}

export function valuesToSchedule ({ repeat, repeatFinishedAt, ...values }) {
  return {
    ...values,
    repeat          : repeat.value,
    repeatFinishedAt: repeat.value === REPEAT_TYPE.NONE ? null : repeatFinishedAt,
  }
}
