import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useCreateStudentsMutation } from '@rooms/hooks/students'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import ImportStudentsFormFields from '@rooms/components/parts/students/ImportStudentsFormFields'
import {
  useInitialValues,
  useValidationSchema,
  useValuesToResult
} from '@rooms/components/parts/students/ImportStudentsFormFields/hooks'

export default function ImportStudents () {
  const router = useRouter()
  const { query: { roomId } } = router

  const getRoomPath = useGetRoomPath(roomId)

  const [create, {
    isSuccess: isCreated,
    isLoading: isCreating,
    error: creatingError,
  }] = useCreateStudentsMutation(roomId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues()
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback((values) => create(valuesToResult((values))), [create, valuesToResult])

  useEffect(() => {
    if (!isCreated) return
    toast.success('生徒を登録しました')
    router.push(getRoomPath('/students'))
  }, [getRoomPath, isCreated, router])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>生徒のインポート</FeatureTitle>
      </FeatureHead>
      <Card>
        <CardBody>
          <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isValid, errors }) => (
              <Form>
                <ImportStudentsFormFields />
                <ErrorAlert error={creatingError} />
                {Object.entries(errors).map(([key, value]) => ((
                  <ErrorAlert key={key} error={{ message: value }} />
                )))}
                <FormActions>
                  <Button disabled={!isValid || isCreating} type="submit">生徒を登録する</Button>
                </FormActions>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </Feature>
  )
}
