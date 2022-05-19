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
import Suspension from '@/components/parts/Suspension'
import Card, { CardActions, CardBody } from '@/components/parts/Card'
import PropertySet, {
  PropertyItem,
  PropertyLabel,
  PropertyContents
} from '@/components/parts/PropertySet'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { useParent, useUpdateParent } from '@/hooks/parents'

export default function ManageParent () {
  const { query:{ roomId, parentId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: parent,
    mutate,
    ...result
  } = useParent(roomId, parentId)
  const [update, {
    data: updatedParent,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateParent(roomId, parentId)

  const validationSchema = useMemo(() => Yup.object().shape({
    name: Yup.string().required(FORM_ERROR_REQUIRED).default('')
  }), [])
  const initialValues = useMemo(() => validationSchema.cast(parent, { stripUnknown: true }), [parent, validationSchema])
  const handleSubmit = useCallback((parent) => update(parent), [update])
  useEffect(() => {
    if (!isUpdated) return
    toast.success('保護者の変更を保存しました')
    mutate(updatedParent)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedParent])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>保護者</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
      {()=>(
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
                  <PropertyContents>{parent.name}</PropertyContents>
                </PropertyItem>
              </PropertySet>
            </>
          )}
        </Card>
        )}
      </Suspension>
    </Feature>
  )
}
