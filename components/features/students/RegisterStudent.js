import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import {
  FORM_ERROR_REQUIRED,
} from '../../../messages'

import { useGetRoomPath } from '../../../hooks/router'
import { useCreateStudent } from '../../../hooks/students'

import Card, { CardBody } from '../../parts/Card'
import ErrorAlert from '../../parts/ErrorAlert'
import { Form, Field } from '../../parts/forms'
import { Button } from '../../parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '../../parts/feature'

export default function RegisterStudent () {
  const router = useRouter()
  const { query: { schoolId, roomId } } = router

  const getRoomPath = useGetRoomPath(schoolId, roomId)

  const [create, {
    isSuccess,
    data: createdStudent,
    error,
  }] = useCreateStudent(schoolId)

  const validationSchema = useMemo(() => Yup.object().shape({
    name: Yup.string().required(FORM_ERROR_REQUIRED).default('')
  }), [])
  const initialValues = useMemo(() => validationSchema.cast({

  }, { stripUnknown: true }), [validationSchema])
  const handleSubmit = useCallback((room) => create(room), [create])

  useEffect(() => {
    if (!isSuccess) return
    toast.success('生徒を登録しました')
    router.push(getRoomPath(`/students/${createdStudent?.id}`))
  }, [createdStudent?.id, getRoomPath, isSuccess, router])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>生徒の登録</FeatureTitle>
      </FeatureHead>
      <Card>
        <CardBody>
          <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Field name="name" label="氏名" />
              {error && <ErrorAlert error={error} />}
              <Button type="submit">生徒を登録する</Button>
            </Form>
          </Formik>
        </CardBody>
      </Card>
    </Feature>
  )
}
