import { useRouter } from 'next/router'
import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import { FORM_ERROR_REQUIRED } from '../../../messages'

import { useSchool, useUpdateSchool } from '@/hooks/schools'
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

export default function ManageSchool () {
  const {
    query:{ schoolId }
  } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data:school,
    isLoading,
    error: gettingError,
    isSuccess: isReady,
    mutate
  } = useSchool(schoolId)
  const [update, {
    data: updatedSchool,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateSchool(schoolId)

  const validationSchema = useMemo(() => Yup.object().shape({
    name: Yup.string().required(FORM_ERROR_REQUIRED).default('')
  }), [])
  const initialValues = useMemo(() => validationSchema.cast(school, { stripUnknown: true }), [school, validationSchema])
  const handleSubmit = useCallback((school) => update(school), [update])
  useEffect(() => {
    if (!isUpdated) return
    toast.success('学校を登録しました')
    mutate(updatedSchool)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedSchool])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>学校の基本情報</FeatureTitle>
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
                    <Field name="name" label="名称" />
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
                  <PropertyLabel>名称</PropertyLabel>
                  <PropertyContents>{school.name}</PropertyContents>
                </PropertyItem>
              </PropertySet>
            </>
          )}
        </Card>
      )}
    </Feature>
  )
}
