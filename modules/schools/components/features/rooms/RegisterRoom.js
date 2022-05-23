import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { useCurrentUserId } from '@/hooks/auth'


import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { useGetSchoolPath } from '@schools/hooks/router'
import { useSetUpRoomMutation } from '@schools/hooks/rooms'
import { useInitialValues, useValidationSchema, useValuesToResult } from '@schools/components/parts/rooms/RoomFormFields/hooks'
import RoomFormFields from '@schools/components/parts/rooms/RoomFormFields'

export default function RegisterRoom () {
  const router = useRouter()
  const { query: { schoolId } } = router
  const currentUserId = useCurrentUserId()

  const getSchoolPath = useGetSchoolPath(schoolId)

  const [setUp, {
    isLoading: isSettingUp,
    isSuccess: isSettedUp,
    error: settingUpError,
  }] = useSetUpRoomMutation(currentUserId, schoolId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues()
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback(values => setUp(valuesToResult(values)), [setUp, valuesToResult])

  useEffect(() => {
    if (!isSettedUp) return
    toast.success('教室を登録しました')
    router.push(getSchoolPath('/'))
  }, [getSchoolPath, isSettedUp, router])

  const isReady = !!schoolId && !!currentUserId

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>教室の登録</FeatureTitle>
      </FeatureHead>
      <Card>
        <CardBody>
          {isReady && (
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
              {({ isValid }) => (
                <Form>
                  <RoomFormFields />
                  <ErrorAlert error={settingUpError} />
                  <FormActions>
                    <Button disabled={!isValid || isSettingUp} type="submit">教室を登録する</Button>
                  </FormActions>
                </Form>
              )}
            </Formik>
          )}
        </CardBody>
      </Card>
    </Feature>
  )
}
