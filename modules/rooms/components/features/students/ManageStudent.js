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

import { useStudentQuery, useUpdateStudentMutation } from '@rooms/hooks/students'
import { useInitialValues, useValidationSchema, useValuesToResult } from '@rooms/components/parts/students/StudentFormFields/hooks'

import StudentFormFields from '@rooms/components/parts/students/StudentFormFields'
import StudentPropertySet from '@rooms/components/parts/students/StudentPropertySet'

export default function ManageStudent () {
  const { query:{ roomId, studentId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: student,
    mutate,
    ...result
  } = useStudentQuery(roomId, studentId)
  const [update, {
    data: updatedStudent,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateStudentMutation(roomId, studentId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues(student)
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback((values) => update(valuesToResult(values)), [update, valuesToResult])

  useEffect(() => {
    if (!isUpdated) return
    toast.success('変更を保存しました')
    mutate(updatedStudent)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedStudent])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>生徒</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            {isEditing ? (
              <CardBody>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ isValid }) => (
                    <Form>
                      <StudentFormFields />
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
                <StudentPropertySet student={student}/>
              </>
            )}
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
