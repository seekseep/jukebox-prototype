import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useCreateParentMutation } from '@rooms/hooks/parents'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import ParentFormFields from '@rooms/components/parts/parents/ParentFormFields'
import { useInitialValues, useValidationSchema, useValuesToResult } from '@rooms/components/parts/parents/ParentFormFields/hooks'
import { useStudentsQuery } from '@rooms/hooks/students'
import Suspension from '@/components/parts/Suspension'

export default function RegisterParent () {
  const router = useRouter()
  const { query: { roomId } } = router

  const getRoomPath = useGetRoomPath(roomId)
  const studentsResult = useStudentsQuery(roomId)

  const [create, {
    isSuccess: isCreated,
    isLoading: isCreating,
    error: creatingError,
  }] = useCreateParentMutation(roomId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues({}, { students: studentsResult.data })
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback((values) => create(valuesToResult((values))), [create, valuesToResult])

  useEffect(() => {
    if (!isCreated) return
    toast.success('保護者を登録しました')
    router.push(getRoomPath('/parents'))
  }, [getRoomPath, isCreated, router])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>保護者の登録</FeatureTitle>
      </FeatureHead>
      <Suspension {...studentsResult}>
        {({ data: students }) => (
          <Card>
            <CardBody>
              <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
                {({ isValid }) => (
                  <Form>
                    <ParentFormFields students={students} />
                    <ErrorAlert error={creatingError} />
                    <FormActions>
                      <Button disabled={!isValid || isCreating} type="submit">保護者を登録する</Button>
                    </FormActions>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
