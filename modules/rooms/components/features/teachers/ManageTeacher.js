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

import { useTeacherQuery, useUpdateTeacherMutation } from '@rooms/hooks/teachers'
import { useInitialValues, useValidationSchema, useValuesToReult } from '@rooms/components/parts/teachers/TeacherFormFields/hooks'

import TeacherFormFields from '@rooms/components/parts/teachers/TeacherFormFields'
import TeacherPropertySet from '@rooms/components/parts/teachers/TeacherPropertySet'

export default function ManageTeacher () {
  const { query:{ roomId, teacherId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: teacher,
    mutate,
    ...result
  } = useTeacherQuery(roomId, teacherId)
  const [update, {
    data: updatedTeacher,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateTeacherMutation(roomId, teacherId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues(teacher)
  const valuesToResult = useValuesToReult()
  const handleSubmit = useCallback((values) => update(valuesToResult(values)), [update, valuesToResult])

  useEffect(() => {
    if (!isUpdated) return
    toast.success('変更を保存しました')
    mutate(updatedTeacher)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedTeacher])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>講師</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            {isEditing ? (
              <CardBody>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ isValid }) => (
                    <Form>
                      <TeacherFormFields />
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
                <TeacherPropertySet teacher={teacher}/>
              </>
            )}
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
