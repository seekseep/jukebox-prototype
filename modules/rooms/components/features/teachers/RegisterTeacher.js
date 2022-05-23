import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useCreateTeacherMutation } from '@rooms/hooks/teachers'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import TeacherFormFields from '@rooms/components/parts/teachers/TeacherFormFields'
import { useInitialValues, useValidationSchema, useValuesToResult } from '@rooms/components/parts/teachers/TeacherFormFields/hooks'

export default function RegisterTeacher () {
  const router = useRouter()
  const { query: { roomId } } = router

  const getRoomPath = useGetRoomPath(roomId)

  const [create, {
    isSuccess: isCreated,
    isLoading: isCreating,
    error: creatingError,
  }] = useCreateTeacherMutation(roomId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues()
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback((values) => create(valuesToResult((values))), [create, valuesToResult])

  useEffect(() => {
    if (!isCreated) return
    toast.success('講師を登録しました')
    router.push(getRoomPath('/teachers'))
  }, [getRoomPath, isCreated, router])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>講師の登録</FeatureTitle>
      </FeatureHead>
      <Card>
        <CardBody>
          <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isValid }) => (
              <Form>
                <TeacherFormFields />
                <ErrorAlert error={creatingError} />
                <FormActions>
                  <Button disabled={!isValid || isCreating} type="submit">講師を登録する</Button>
                </FormActions>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </Feature>
  )
}
