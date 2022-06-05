import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

import { useSchool, useUpdateSchool } from '@schools/hooks/schools'
import { useToggleState } from '@/hooks/ui'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import Card, { CardActions, CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { SchoolIcon } from '@/components/parts/icons'
import { useInitialValues, useValidationSchema, useValuesToResult } from '@schools/components/parts/schools/SchoolFormFields/hooks'
import SchoolFormFields from '@schools/components/parts/schools/SchoolFormFields'
import SchoolPropertySet from '@schools/components/parts/schools/SchoolPropertySet'

export default function ManageSchool () {
  const { query:{ schoolId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data:school,
    mutate,
    ...result
  } = useSchool(schoolId)
  const [update, {
    data: updatedSchool,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateSchool(schoolId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues(school)
  const valuesToSchool = useValuesToResult()
  const handleSubmit = useCallback((values) => update(valuesToSchool(values)), [update, valuesToSchool])

  useEffect(() => {
    if (!isUpdated) return
    toast.success('変更を保存しました')
    mutate(updatedSchool)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedSchool])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>
          <SchoolIcon />学校
        </FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
      {()=>(
        <Card>
          {isEditing ? (
            <CardBody>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isValid }) => (
                  <Form>
                    <SchoolFormFields />
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
              <SchoolPropertySet school={school} />
            </>
          )}
        </Card>
        )}
      </Suspension>
    </Feature>
  )
}
