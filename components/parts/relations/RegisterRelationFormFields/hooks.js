import { useMemo } from 'react'
import * as Yup from 'yup'

import { FORM_ERROR_REQUIRED } from '@/messages'

import { optionSchema, numberOptionSchema } from '@/schemas/forms'

import { getAccountRef } from '@/services/api/accounts'

import { RELATION_SCORE_OPTIONS } from '@/components/parts/relations/RelationScoreSelectField'

export function useValidationSchema () {
  return useMemo(() => Yup.object().shape({
    departure  : Yup.string().required(FORM_ERROR_REQUIRED).default(''),
    destination: optionSchema.required(FORM_ERROR_REQUIRED).default({
      label: '',
      value: ''
    }),
    score  : numberOptionSchema.default(RELATION_SCORE_OPTIONS[2]),
    comment: Yup.string().default('')
  }), [])
}

export function valuesToRelation (roomId, { departure, destination, score, ...values }) {
  return {
    departure  : getAccountRef(roomId, departure),
    destination: getAccountRef(roomId, destination.value),
    score      : score.value,
    ...values,
  }
}
