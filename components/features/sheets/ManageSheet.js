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
import { useSheet, useUpdateSheet } from '@/hooks/sheets'

export default function ManageSheet () {
  const { query:{ roomId, sheetId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: sheet,
    isLoading,
    error: gettingError,
    isSuccess: isReady,
    mutate
  } = useSheet(roomId, sheetId)
  const [update, {
    data: updatedSheet,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateSheet(roomId, sheetId)

  const validationSchema = useMemo(() => Yup.object().shape({
    name: Yup.string().required(FORM_ERROR_REQUIRED).default('')
  }), [])
  const initialValues = useMemo(() => validationSchema.cast(sheet, { stripUnknown: true }), [sheet, validationSchema])
  const handleSubmit = useCallback((sheet) => update(sheet), [update])
  useEffect(() => {
    if (!isUpdated) return
    toast.success('席の変更を保存しました')
    mutate(updatedSheet)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedSheet])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>席の情報</FeatureTitle>
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
                  <PropertyContents>{sheet.name}</PropertyContents>
                </PropertyItem>
              </PropertySet>
            </>
          )}
        </Card>
      )}
    </Feature>
  )
}
