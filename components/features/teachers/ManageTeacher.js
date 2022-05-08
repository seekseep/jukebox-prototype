import { useRouter } from 'next/router'
import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import { FORM_ERROR_REQUIRED } from '../../../messages'

import { useToggleState } from '@/hooks/ui'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Form, Field } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import Loading from '@/components/parts/Loading'
import Card, { CardActions, CardBody } from '@/components/parts/Card'
import PropertySet, {
  PropertyItem,
  PropertyLabel,
  PropertyContents
} from '@/components/parts/PropertySet'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { useTeacher, useUpdateTeacher } from '@/hooks/teachers'

export default function ManageTeacher () {
  const { query:{ roomId, teacherId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: teacher,
    isLoading,
    error: gettingError,
    isSuccess: isReady,
    mutate
  } = useTeacher(roomId, teacherId)
  const [update, {
    data: updatedTeacher,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateTeacher(roomId, teacherId)

  const validationSchema = useMemo(() => Yup.object().shape({
    name: Yup.string().required(FORM_ERROR_REQUIRED).default('')
  }), [])
  const initialValues = useMemo(() => validationSchema.cast(teacher, { stripUnknown: true }), [teacher, validationSchema])
  const handleSubmit = useCallback((teacher) => update(teacher), [update])
  useEffect(() => {
    if (!isUpdated) return
    toast.success('講師の変更を保存しました')
    mutate(updatedTeacher)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedTeacher])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>講師の情報</FeatureTitle>
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
                  <PropertyContents>{teacher.name}</PropertyContents>
                </PropertyItem>
              </PropertySet>
            </>
          )}
        </Card>
      )}
    </Feature>
  )
}
