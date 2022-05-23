import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { FORM_ERROR_REQUIRED } from '@/messages'

import { optionSchema, numberOptionSchema } from '@/schemas/forms'

import { RELATION_SCORE_OPTIONS } from '@rooms/components/parts/relations/RelationScoreSelectField'

export function useValidationSchema () {
  return useMemo(() => Yup.object().shape({
    destination: optionSchema.nullable().required(FORM_ERROR_REQUIRED).default(null),
    score      : numberOptionSchema.default(RELATION_SCORE_OPTIONS[2]),
    comment    : Yup.string().default('')
  }), [])
}

export function useInitialValues() {
  const validationSchema = useValidationSchema()
  return useMemo(() => {
    const initialValues = validationSchema.cast({

    }, {
      stripUnknown: true
    })
    return initialValues
  }, [validationSchema])
}

export function useValuesToResult () {
  return useCallback(({ destination, score, ...values }) => {
    return {
      destination: destination.value,
      score      : score.value,
      ...values,
    }
  }, [])
}
