import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'
import { add, startOfHour } from 'date-fns'

import { REPEAT_TYPE, SCHEDULE_TYPE } from '@/constants'
import { FORM_ERROR_REQUIRED } from '@/messages'
import { dateSchema, optionSchema } from '@/schemas/forms'

import { REPEAT_TYPE_OPTIONS } from '@rooms/components/parts/RepeatTypeSelectField'
import { getOption } from '@/services/input'

export function useValidationSchema() {
  return useMemo(() => {
    const validationSchema = Yup.object().shape({
      startedAt       : dateSchema.required(FORM_ERROR_REQUIRED).default(startOfHour(new Date())),
      finishedAt      : dateSchema.required(FORM_ERROR_REQUIRED).default(add(startOfHour(new Date()), { hours: 1 })),
      isAllDay        : Yup.boolean().default(false),
      type            : Yup.string().default(SCHEDULE_TYPE.AVAILABLE),
      repeatFinishedAt: dateSchema.default(null),
      repeat          : optionSchema.required(FORM_ERROR_REQUIRED).default(REPEAT_TYPE_OPTIONS.NONE),
    })
    return validationSchema
  }, [])
}

export function useInitialValue(schedule) {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    const initialValues = validationSchema.cast({
      ...schedule,
      repeat: getOption(schedule?.repeat, Object.values(REPEAT_TYPE_OPTIONS))
    }, { stripUnknown: true })
    return initialValues
  }, [schedule, validationSchema])
}

export function useValuesToResult () {
  return useCallback(({ repeat, repeatFinishedAt, ...values }) => ({
    repeat          : repeat.value,
    repeatFinishedAt: repeat.value === REPEAT_TYPE.NONE ? null : repeatFinishedAt,
    ...values,
  }), [])
}
