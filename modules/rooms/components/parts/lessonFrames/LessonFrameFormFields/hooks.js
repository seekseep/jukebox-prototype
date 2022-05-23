import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { getOption } from '@/services/input'

import { optionSchema } from '@/schemas/forms'

import { LESSON_FRAME_REPEAT_OPTIONS } from '@rooms/components/parts/lessonFrames/LessonFrameRepeatTypeSelectField'
import { FORM_ERROR_REQUIRED } from '@/messages'

export function useValidationSchema () {
  return useMemo(() => Yup.object().shape({
    repeat    : optionSchema.default(LESSON_FRAME_REPEAT_OPTIONS.WEEKLY),
    tags      : Yup.array().of(optionSchema),
    dayCount  : Yup.number().default(0).required(FORM_ERROR_REQUIRED),
    startTime : Yup.string().default('').required(FORM_ERROR_REQUIRED),
    finishTime: Yup.string().default('').required(FORM_ERROR_REQUIRED),
  }), [])
}

export function useInitialValues (lessonFrame) {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    return validationSchema.cast({
      repeat    : getOption(lessonFrame?.repeat, Object.values(LESSON_FRAME_REPEAT_OPTIONS), LESSON_FRAME_REPEAT_OPTIONS.WEEKLY),
      tags      : lessonFrame?.tags?.map(tag => ({ value: tag, label: tag })) || [],
      dayCount  : lessonFrame?.dayCount,
      startTime : lessonFrame?.startTime,
      finishTime: lessonFrame?.finishTime,
    })
  }, [lessonFrame?.dayCount, lessonFrame?.finishTime, lessonFrame?.repeat, lessonFrame?.startTime, lessonFrame?.tags, validationSchema])
}

export function useValuesToResult () {
  return useCallback(({ repeat, tags, dayCount, startTime, finishTime }) => {
    return {
      repeat  : repeat.value,
      tags    : tags.map(({ value: tag }) => tag),
      dayCount: +dayCount,
      startTime,
      finishTime
    }
  }, [])
}
