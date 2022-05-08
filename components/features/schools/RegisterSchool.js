import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import {
  FORM_ERROR_REQUIRED,
} from '../../../messages'

import { useCreateSchool } from '@/hooks/schools'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, Field } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

export default function RegisterSchool () {
  const router = useRouter()

  const [create, {
    isSuccess,
    error,
  }] = useCreateSchool()

  const validationSchema = useMemo(() => Yup.object().shape({
    name: Yup.string().required(FORM_ERROR_REQUIRED).default('')
  }), [])
  const initialValues = useMemo(() => validationSchema.cast({

  }, { stripUnknown: true }), [validationSchema])
  const handleSubmit = useCallback((school) => {
    create(school)
  }, [create])
  useEffect(() => {
    if (!isSuccess) return
    toast.success('学校を登録しました')
    router.push('/schools')
  }, [isSuccess, router])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>学校の登録</FeatureTitle>
      </FeatureHead>
      <Card>
        <CardBody>
          <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Field name="name" label="名称" />
              {error && <ErrorAlert error={error} />}
              <Button type="submit">学校を登録する</Button>
            </Form>
          </Formik>
        </CardBody>
      </Card>
    </Feature>
  )
}
