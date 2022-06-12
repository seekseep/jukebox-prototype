import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

import { useToggleState } from '@/hooks/ui'

import { MultiSuspension } from '@/components/parts/Suspension'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import Card, { CardActions, CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { useParentQuery, useUpdateParentMutation } from '@rooms/hooks/parents'
import { useInitialValues, useValidationSchema, useValuesToResult } from '@rooms/components/parts/parents/ParentFormFields/hooks'

import ParentFormFields from '@rooms/components/parts/parents/ParentFormFields'
import ParentPropertySet from '@rooms/components/parts/parents/ParentPropertySet'
import { useStudentsQuery } from '@rooms/hooks/students'

export default function ManageParent () {
  const { query:{ roomId, parentId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const studentsResult = useStudentsQuery(roomId)
  const parentResult = useParentQuery(roomId, parentId)

  const { data: students } = studentsResult
  const { data: parent, mutate } = parentResult

  const [update, {
    data: updatedParent,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateParentMutation(roomId, parentId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues(parent, { students })
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback((values) => update(valuesToResult(values)), [update, valuesToResult])

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
      <MultiSuspension results={[ parentResult, studentsResult ]}>
        {({ data: [ parent, students ] }) => (
          <Card>
            {isEditing ? (
              <CardBody>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ isValid }) => (
                    <Form>
                      <ParentFormFields students={students} />
                      <ErrorAlert error={updatingError} />
                      <FormActions>
                        <Button primary type="submit" disabled={!isValid || isUpdating}>保存する</Button>
                        <Button color="secondary" type="button" onClick={toggleEditing}>変更を破棄する</Button>
                      </FormActions>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            ) : (
              <>
                <CardActions>
                  <Button color="secondary" size="sm" onClick={toggleEditing}>編集する</Button>
                </CardActions>
                <ParentPropertySet
                  roomId={roomId}
                  parent={parent}/>
              </>
            )}
          </Card>
        )}
      </MultiSuspension>
    </Feature>
  )
}
