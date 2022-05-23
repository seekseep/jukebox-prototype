import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { useSetUpSchoolMutation } from '@schools/hooks/schools'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { useInitialValues, useValidationSchema, useValuesToResult } from '@schools/components/parts/schools/SchoolFormFields/hooks'
import { useCurrentUserId } from '@/hooks/auth'
import SchoolFormFields from '@schools/components/parts/schools/SchoolFormFields'

export default function RegisterSchool () {
  const router = useRouter()

  const currentUserId = useCurrentUserId()

  const [setUp, {
    isLoading: isSettingUp,
    isSuccess: isSettedUp,
    error: settingUpError,
  }] = useSetUpSchoolMutation(currentUserId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues()
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback((values) => {
    setUp(valuesToResult(values))
  }, [setUp, valuesToResult])
  useEffect(() => {
    if (!isSettedUp) return
    toast.success('学校を登録しました')
    router.push('/schools')
  }, [isSettedUp, router])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>学校の登録</FeatureTitle>
      </FeatureHead>
      <Card>
        <CardBody>
          <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isValid }) => (
              <Form>
                <SchoolFormFields />
                <ErrorAlert error={settingUpError} />
                <FormActions>
                  <Button disabled={!isValid || isSettingUp} type="submit">学校を登録する</Button>
                </FormActions>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </Feature>
  )
}
