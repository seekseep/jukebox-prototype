import { useRouter } from 'next/router'
import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import { FORM_ERROR_REQUIRED } from '../../../messages'

import { useToggleState } from '../../../hooks/ui'
import { useStudent, useUpdateStudent } from '../../../hooks/students'

import { Feature, FeatureHead, FeatureTitle } from '../../parts/feature'
import { Form, Field } from '../../parts/forms'
import { Button } from '../../parts/buttons'
import Loading from '../../parts/Loading'
import Card, { CardActions, CardBody } from '../../parts/Card'
import PropertySet, {
  PropertyItem,
  PropertyLabel,
  PropertyContents
} from '../../parts/PropertySet'
import ErrorAlert from '../../parts/ErrorAlert'

export default function ManageStudent () {
  const { query:{ schoolId, roomId, studentId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: student,
    isLoading,
    error: gettingError,
    isSuccess: isReady,
    mutate
  } = useStudent(schoolId, roomId, studentId)
  const [update, {
    data: updatedStudent,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateStudent(schoolId, roomId, studentId)

  const validationSchema = useMemo(() => Yup.object().shape({
    name: Yup.string().required(FORM_ERROR_REQUIRED).default('')
  }), [])
  const initialValues = useMemo(() => validationSchema.cast(student, { stripUnknown: true }), [student, validationSchema])
  const handleSubmit = useCallback((student) => update(student), [update])
  useEffect(() => {
    if (!isUpdated) return
    toast.success('生徒の変更を保存しました')
    mutate(updatedStudent)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedStudent])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>生徒の情報</FeatureTitle>
      </FeatureHead>
      {isLoading && <Loading />}
      {gettingError && <ErrorAlert error={gettingError} />}
      {isReady && (
        <Card>
          {isEditing ? (
            <CardBody>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isValid }) => (
                  <Form>
                    <Field name="name" label="氏名" />
                    {updatingError && <ErrorAlert error={updatingError} />}
                    <div className="flex flex-row-reverse justify-between">
                      <Button primary type="submit" disabled={!isValid || isUpdating}>保存する</Button>
                      <Button secondary type="button" onClick={toggleEditing}>変更を破棄する</Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardBody>
          ) : (
            <>
              <CardActions>
                <Button secondary sm onClick={toggleEditing}>編集する</Button>
              </CardActions>
              <PropertySet>
                <PropertyItem>
                  <PropertyLabel>氏名</PropertyLabel>
                  <PropertyContents>{student.name}</PropertyContents>
                </PropertyItem>
              </PropertySet>
            </>
          )}
        </Card>
      )}
    </Feature>
  )
}
