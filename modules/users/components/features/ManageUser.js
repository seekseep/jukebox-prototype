import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

import { useToggleState } from '@/hooks/ui'
import { useUpdateUserMutation, useUserQuery } from '@users/hooks/users'

import Suspension from '@/components/parts/Suspension'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import Card, { CardActions, CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'

import UserPropertySet from '@users/components/parts/users/UserPropertySet'
import UserFormFields from '@users/components/parts/users/UserFormFields'
import { useInitialValues, useValidationSchema, useValuesToReult } from '@users/components/parts/users/UserFormFields/hooks'

export default function ManageUser () {
  const { query:{ userId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: user,
    mutate,
    ...result
  } = useUserQuery(userId)
  const [update, {
    data: updatedUser,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateUserMutation(userId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues(user)
  const valuesToReult = useValuesToReult()
  const handleSubmit = useCallback((values) => update(valuesToReult(values)), [update, valuesToReult])

  useEffect(() => {
    if (!isUpdated) return
    toast.success('変更を保存しました')
    mutate(updatedUser)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedUser])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>ユーザー</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
      {()=>(
        <Card>
          {isEditing ? (
            <CardBody>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isValid }) => (
                  <Form>
                    <UserFormFields />
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
              <UserPropertySet user={user} />
            </>
          )}
        </Card>
        )}
      </Suspension>
    </Feature>
  )
}
