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

import { useSubjectQuery, useUpdateSubjectMutation } from '@rooms/hooks/subjects'
import { useInitialValues, useValidationSchema, useValuesToResult } from '@rooms/components/parts/subjects/SubjectFormFields/hooks'

import SubjectFormFields from '@rooms/components/parts/subjects/SubjectFormFields'
import SubjectPropertySet from '@rooms/components/parts/subjects/SubjectPropertySet'

export default function ManageSubject () {
  const { query:{ roomId, subjectId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: subject,
    mutate,
    ...result
  } = useSubjectQuery(roomId, subjectId)
  const [update, {
    data: updatedSubject,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateSubjectMutation(roomId, subjectId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues(subject)
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback((values) => update(valuesToResult(values)), [update, valuesToResult])

  useEffect(() => {
    if (!isUpdated) return
    toast.success('変更を保存しました')
    mutate(updatedSubject)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedSubject])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>科目</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            {isEditing ? (
              <CardBody>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ isValid }) => (
                    <Form>
                      <SubjectFormFields />
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
                <SubjectPropertySet subject={subject}/>
              </>
            )}
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
