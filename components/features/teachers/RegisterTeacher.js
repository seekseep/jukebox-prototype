import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import {
  FORM_ERROR_REQUIRED,
} from '../../../messages'

import { useGetRoomPath } from '@/hooks/router'
import { useCreateTeacher } from '@/hooks/teachers'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, Field } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

export default function RegisterTeacher () {
  const router = useRouter()
  const { query: { roomId } } = router

  const getRoomPath = useGetRoomPath(roomId)

  const [create, {
    isSuccess,
    data: createdTeacher,
    error,
  }] = useCreateTeacher(roomId)

  const validationSchema = useMemo(() => Yup.object().shape({
    name: Yup.string().required(FORM_ERROR_REQUIRED).default('')
  }), [])
  const initialValues = useMemo(() => validationSchema.cast({

  }, { stripUnknown: true }), [validationSchema])
  const handleSubmit = useCallback((room) => create(room), [create])

  useEffect(() => {
    if (!isSuccess) return
    toast.success('講師を登録しました')
    router.push(getRoomPath(`/teachers/${createdTeacher?.id}`))
  }, [createdTeacher?.id, getRoomPath, isSuccess, router])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>講師の登録</FeatureTitle>
      </FeatureHead>
      <Card>
        <CardBody>
          <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Field name="name" label="氏名" />
              {error && <ErrorAlert error={error} />}
              <Button type="submit">講師を登録する</Button>
            </Form>
          </Formik>
        </CardBody>
      </Card>
    </Feature>
  )
}
