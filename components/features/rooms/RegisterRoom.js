import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import {
  FORM_ERROR_REQUIRED,
} from '../../../messages'

import { useGetSchoolPath } from '@/hooks/router'
import { useCreateRoom } from '@/hooks/rooms'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, Field } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

export default function RegisterRoom () {
  const router = useRouter()
  const { query: { schoolId } } = router

  const getSchoolPath = useGetSchoolPath(schoolId)

  const [create, {
    isSuccess,
    data: createdRoom,
    error,
  }] = useCreateRoom()

  const validationSchema = useMemo(() => Yup.object().shape({
    school: Yup.string().required(FORM_ERROR_REQUIRED).default(''),
    name  : Yup.string().required(FORM_ERROR_REQUIRED).default(''),
  }), [])
  const initialValues = useMemo(() => validationSchema.cast({
    school: schoolId
  }, { stripUnknown: true }), [schoolId, validationSchema])
  const handleSubmit = useCallback((room) => create(room), [create])

  useEffect(() => {
    if (!isSuccess) return
    toast.success('教室を登録しました')
    router.push(`/rooms/${createdRoom?.id}`)
  }, [createdRoom?.id, getSchoolPath, isSuccess, router])

  const isReady = !!schoolId

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>教室の登録</FeatureTitle>
      </FeatureHead>
      <Card>
        <CardBody>
          {isReady && (
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
              <Form>
                <Field name="name" label="名称" />
                {error && <ErrorAlert error={error} />}
                <Button type="submit">教室を登録する</Button>
              </Form>
            </Formik>
          )}
        </CardBody>
      </Card>
    </Feature>
  )
}
