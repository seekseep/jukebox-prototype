import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useCreateSheetMutation } from '@rooms/hooks/sheets'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import SheetFormFields from '@rooms/components/parts/sheets/SheetFormFields'
import { useInitialValues, useValidationSchema, useValuesToReult } from '@rooms/components/parts/sheets/SheetFormFields/hooks'

export default function RegisterSheet () {
  const router = useRouter()
  const { query: { roomId } } = router

  const getRoomPath = useGetRoomPath(roomId)

  const [create, {
    isSuccess: isCreated,
    isLoading: isCreating,
    error: creatingError,
  }] = useCreateSheetMutation(roomId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues()
  const valuesToResult = useValuesToReult()
  const handleSubmit = useCallback((values) => create(valuesToResult((values))), [create, valuesToResult])

  useEffect(() => {
    if (!isCreated) return
    toast.success('席を登録しました')
    router.push(getRoomPath('/sheets'))
  }, [getRoomPath, isCreated, router])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>席の登録</FeatureTitle>
      </FeatureHead>
      <Card>
        <CardBody>
          <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isValid }) => (
              <Form>
                <SheetFormFields />
                <ErrorAlert error={creatingError} />
                <FormActions>
                  <Button disabled={!isValid || isCreating} type="submit">席を登録する</Button>
                </FormActions>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </Feature>
  )
}
