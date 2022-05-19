import { useMemo } from 'react'
import * as Yup from 'yup'

import { numberOptionSchema } from '@/schemas/forms'

import { RELATION_SCORE_OPTIONS } from '@/components/parts/relations/RelationScoreSelectField'
import { getOption } from '@/services/input'

export function useUpdateRelationValidationSchema () {
  return useMemo(() => Yup.object().shape({
    score  : numberOptionSchema.default(RELATION_SCORE_OPTIONS[0]),
    comment: Yup.string().default('')
  }), [])
}

export function useUpdateRelationInitialValues (relation) {
  const validationSchema = useUpdateRelationValidationSchema()
  return useMemo(() => validationSchema.cast({
    score  : getOption(relation?.score, RELATION_SCORE_OPTIONS),
    comment: relation?.comment
  }, { stripUnknown: true }), [relation?.comment, relation?.score, validationSchema])
}

export function updateRelationValuesToRelation ({ score, ...values }) {
  return {
    score: score.value,
    ...values,
  }
}
