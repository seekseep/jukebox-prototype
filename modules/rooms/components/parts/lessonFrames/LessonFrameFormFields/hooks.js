import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'
import { format, startOfHour, add } from 'date-fns'

import { FORM_ERROR_REQUIRED, FORM_ERROR_REQURIED_ONE_ITEM } from '@/messages'
import { REPEAT_TYPE } from '@rooms/constants'

export function useValidationSchema () {
  return useMemo(() => Yup.object().shape({
    repeat         : Yup.string().oneOf(Object.values(REPEAT_TYPE)).default(REPEAT_TYPE.WEEKLY),
    repeatStartTime: Yup.string().nullable().when('repeat', {
      is  : repeat => repeat !== REPEAT_TYPE.NONE,
      then: schema => schema.required(FORM_ERROR_REQUIRED)
    }).default(format(startOfHour(new Date()), 'HH:mm')).transform(v => v ?? ''),
    repeatFinishTime: Yup.string().nullable().when('repeat', {
      is  : repeat => repeat !== REPEAT_TYPE.NONE,
      then: schema => schema.required(FORM_ERROR_REQUIRED)
    }).default(format(add(startOfHour(new Date()), { hours: 1 }), 'HH:mm')).transform(v => v ?? ''),
    repeatIndexes: Yup.array().nullable().when('repeat', {
      is  : repeat => repeat !== REPEAT_TYPE.NONE,
      then: schema => schema.test({
        message: FORM_ERROR_REQURIED_ONE_ITEM,
        test   : repeatIndexes => (repeatIndexes?.length > 0)
      })
    }).default([]).transform(v => v ?? []),
    repeatTermValue: Yup.number().nullable().default(1).min(1).max(999).default(null),
    comment        : Yup.string().default('')
  }), [])
}

export function useInitialValues (lessonFrame = {}) {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    return validationSchema.cast({
      ...lessonFrame,
      tags: lessonFrame?.tags?.map(tag => ({ value: tag, label: tag })) || [],
    })
  }, [lessonFrame, validationSchema])
}

export function useValuesToResult () {
  return useCallback(({ tags, repeat, repeatStartTime, repeatFinishTime, repeatIndexes, comment }) => {
    return {
      tags: tags.map(({ value: tag }) => tag),
      repeat,
      repeatStartTime,
      repeatFinishTime,
      repeatIndexes,
      comment
    }
  }, [])
}
