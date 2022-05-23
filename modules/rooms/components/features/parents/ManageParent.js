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

import { useParentQuery, useUpdateParentMutation } from '@rooms/hooks/parents'
import { useInitialValues, useValidationSchema, useValuesToReult } from '@rooms/components/parts/parents/ParentFormFields/hooks'

import ParentFormFields from '@rooms/components/parts/parents/ParentFormFields'
import ParentPropertySet from '@rooms/components/parts/parents/ParentPropertySet'

export default function ManageParent () {
  const { query:{ roomId, parentId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: parent,
    mutate,
    ...result
  } = useParentQuery(roomId, parentId)
  const [update, {
    data: updatedParent,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateParentMutation(roomId, parentId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues(parent)
  const valuesToResult = useValuesToReult()
  const handleSubmit = useCallback((values) => update(valuesToResult(values)), [update])

  useEffect(() => {
    if (!isUpdated) return
    toast.success('変更を保存しました')
    mutate(updatedParent)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedParent])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>保護者</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            {isEditing ? (
              <CardBody>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ isValid }) => (
                    <Form>
                      <ParentFormFields />
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
                <ParentPropertySet parent={parent}/>
              </>
            )}
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
