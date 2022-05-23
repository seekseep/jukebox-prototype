import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { numberOptionSchema } from '@/schemas/forms'
import { getOption } from '@/services/input'

import { RELATION_SCORE_OPTIONS } from '@rooms/components/parts/relations/RelationScoreSelectField'

export function useValidationSchema () {
  return useMemo(() => Yup.object().shape({
    score  : numberOptionSchema.default(RELATION_SCORE_OPTIONS[0]),
    comment: Yup.string().default('')
  }), [])
}

export function useInitialValues (relation) {
  const validationSchema = useValidationSchema()
  return useMemo(() => {
    const initialValues = validationSchema.cast({
      score  : getOption(relation?.score, RELATION_SCORE_OPTIONS),
      comment: relation?.comment
    }, { stripUnknown: true })
    return initialValues
  }, [
    validationSchema,
    relation?.comment,
    relation?.score
  ])
}

export function useValuesToResult () {
  return useCallback(({ score, ...values }) => ({
    score: score.value,
    ...values,
  }), [])
}
