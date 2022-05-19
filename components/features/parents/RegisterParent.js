import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import {
  FORM_ERROR_REQUIRED,
} from '../../../messages'

import { useGetRoomPath } from '@/hooks/router'
import { useCreateParent } from '@/hooks/parents'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, Field } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

export default function RegisterParent () {
  const router = useRouter()
  const { query: { roomId } } = router

  const getRoomPath = useGetRoomPath(roomId)

  const [create, {
    isSuccess,
    data: createdParent,
    error,
  }] = useCreateParent(roomId)

  const validationSchema = useMemo(() => Yup.object().shape({
    name: Yup.string().required(FORM_ERROR_REQUIRED).default('')
  }), [])
  const initialValues = useMemo(() => validationSchema.cast({

  }, { stripUnknown: true }), [validationSchema])
  const handleSubmit = useCallback((room) => create(room), [create])

  useEffect(() => {
    if (!isSuccess) return
    toast.success('保護者を登録しました')
    router.push(getRoomPath(`/parents/${createdParent?.id}`))
  }, [createdParent?.id, getRoomPath, isSuccess, router])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>保護者の登録</FeatureTitle>
      </FeatureHead>
      <Card>
        <CardBody>
          <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Field name="name" label="氏名" />
              {error && <ErrorAlert error={error} />}
              <div className="flex justify-end">
                <Button type="submit">保護者を登録する</Button>
              </div>
            </Form>
          </Formik>
        </CardBody>
      </Card>
    </Feature>
  )
}
