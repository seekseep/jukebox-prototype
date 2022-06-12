import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Formik } from 'formik'

import { useDeleteRoleMutation } from '@/hooks/roles'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Button } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, FormActions } from '@/components/parts/forms'

import { useRoleQuery, useCreateRoleMutation } from '@rooms/hooks/roles'

import RolePropertySet from '@rooms/components/parts/roles/RolePropertySet'
import RoleFormFields from '@rooms/components/parts/roles/RoleFormFields'
import { useValidationSchema, useInitialValues, useValuesToResult } from '@rooms/components/parts/roles/RoleFormFields/hooks'

export default function ManagedUserLinkedStudent () {
  const { query:{ roomId, studentId } } = useRouter()

  const {
    mutate,
    ...result
  } = useRoleQuery(roomId, studentId)

  const [createRole, {
    data: createdRole,
    isSuccess: isCreated,
    isLoading: isCreating,
    error: creatingError
  }] = useCreateRoleMutation(roomId, studentId)

  const [deleteRole, {
    isLoading: isDeleting,
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteRoleMutation(result?.data?.id)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues()
  const valuesToResult = useValuesToResult()

  const handleCreate = useCallback((values) => createRole(valuesToResult(values)), [createRole, valuesToResult])
  const handleDelete = useCallback(() => {
    if (!confirm('紐付けを解除しますか')) return
    deleteRole()
  }, [deleteRole])

  useEffect(() => {
    if (isDeleted) {
      toast.success('ユーザーの紐付けを解除しました')
      mutate(null)
    }
    if (isCreated) {
      toast.success('ユーザーと紐付けました')
      mutate(createdRole)
    }
  }, [createdRole, isCreated, isDeleted, mutate])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>ユーザー</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: role }) => (
          <Card>
            {role ? (
              <>
                <RolePropertySet role={role} />
                <CardBody>
                  <ErrorAlert error={deletingError} />
                  <FormActions>
                    <Button disabled={isDeleting} color="danger" type="button" onClick={handleDelete}>紐付けを解除する</Button>
                  </FormActions>
                </CardBody>
              </>
            ) : (
              <CardBody>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleCreate}>
                  {({ isValid }) => (
                    <Form>
                      <RoleFormFields />
                      <ErrorAlert error={creatingError} />
                      <FormActions>
                        <Button disabled={isCreating || !isValid}>ユーザーを紐付ける</Button>
                      </FormActions>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            )}
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
