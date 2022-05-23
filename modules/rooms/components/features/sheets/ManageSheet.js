import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

import { useToggleState } from '@/hooks/ui'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import Card, { CardActions, CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'

import { useSheetQuery, useUpdateSheetMutation } from '@rooms/hooks/sheets'
import { useInitialValues, useValidationSchema, useValuesToReult } from '@rooms/components/parts/sheets/SheetFormFields/hooks'

import SheetFormFields from '@rooms/components/parts/sheets/SheetFormFields'
import SheetPropertySet from '@rooms/components/parts/sheets/SheetPropertySet'

export default function ManageSheet () {
  const { query:{ roomId, sheetId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: sheet,
    mutate,
    ...result
  } = useSheetQuery(roomId, sheetId)
  const [update, {
    data: updatedSheet,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateSheetMutation(roomId, sheetId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues(sheet)
  const valuesToResult = useValuesToReult()
  const handleSubmit = useCallback((values) => update(valuesToResult(values)), [update])

  useEffect(() => {
    if (!isUpdated) return
    toast.success('変更を保存しました')
    mutate(updatedSheet)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedSheet])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>席</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            {isEditing ? (
              <CardBody>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ isValid }) => (
                    <Form>
                      <SheetFormFields />
                      <ErrorAlert error={updatingError} />
                      <FormActions>
                        <Button primary type="submit" disabled={!isValid || isUpdating}>保存する</Button>
                        <Button secondary type="button" onClick={toggleEditing}>変更を破棄する</Button>
                      </FormActions>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            ) : (
              <>
                <CardActions>
                  <Button secondary sm onClick={toggleEditing}>編集する</Button>
                </CardActions>
                <SheetPropertySet sheet={sheet}/>
              </>
            )}
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
