import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useCreateSubjectMutation } from '@rooms/hooks/subjects'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import SubjectFormFields from '@rooms/components/parts/subjects/SubjectFormFields'
import { useInitialValues, useValidationSchema, useValuesToReult } from '@rooms/components/parts/subjects/SubjectFormFields/hooks'

export default function RegisterSubject () {
  const router = useRouter()
  const { query: { roomId } } = router

  const getRoomPath = useGetRoomPath(roomId)

  const [create, {
    isSuccess: isCreated,
    isLoading: isCreating,
    error: creatingError,
  }] = useCreateSubjectMutation(roomId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues()
  const valuesToResult = useValuesToReult()
  const handleSubmit = useCallback((values) => create(valuesToResult((values))), [create, valuesToResult])

  useEffect(() => {
    if (!isCreated) return
    toast.success('科目を登録しました')
    router.push(getRoomPath('/subjects'))
  }, [getRoomPath, isCreated, router])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>科目の登録</FeatureTitle>
      </FeatureHead>
      <Card>
        <CardBody>
          <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isValid }) => (
              <Form>
                <SubjectFormFields />
                <ErrorAlert error={creatingError} />
                <FormActions>
                  <Button disabled={!isValid || isCreating} type="submit">科目を登録する</Button>
                </FormActions>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </Feature>
  )
}
