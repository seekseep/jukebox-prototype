import { useRouter } from 'next/router'
import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import { FORM_ERROR_REQUIRED } from '../../../messages'

import { useSubject, useUpdateSubject } from '../../../hooks/subjects'
import { useToggleState } from '../../../hooks/ui'

import { Feature, FeatureHead, FeatureTitle } from '../../parts/feature'
import { Form, Field } from '../../parts/forms'
import { Button } from '../../parts/buttons'
import Loading from '../../parts/Loading'
import ErrorAlert from '../../parts/ErrorAlert'
import Card, { CardActions, CardBody } from '../../parts/Card'
import PropertySet, {
  PropertyItem,
  PropertyLabel,
  PropertyContents
} from '../../parts/PropertySet'

export default function ManageSubject () {
  const { query:{ schoolId, roomId, subjectId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: subject,
    isLoading,
    error: gettingError,
    isSuccess: isReady,
    mutate
  } = useSubject(schoolId, roomId, subjectId)
  const [update, {
    data: updatedTeacher,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateSubject(schoolId, roomId, subjectId)

  const validationSchema = useMemo(() => Yup.object().shape({
    name: Yup.string().required(FORM_ERROR_REQUIRED).default('')
  }), [])
  const initialValues = useMemo(() => validationSchema.cast(subject, { stripUnknown: true }), [subject, validationSchema])
  const handleSubmit = useCallback((subject) => update(subject), [update])
  useEffect(() => {
    if (!isUpdated) return
    toast.success('科目の変更を保存しました')
    mutate(updatedTeacher)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedTeacher])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>科目の情報</FeatureTitle>
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
                  <PropertyContents>{subject.name}</PropertyContents>
                </PropertyItem>
              </PropertySet>
            </>
          )}
        </Card>
      )}
    </Feature>
  )
}
