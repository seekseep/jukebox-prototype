import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Suspension from '@/components/parts/Suspension'

import { useGetStudentPath } from '@rooms/hooks/router'
import { useCreateStudentRelationMutation } from '@rooms/hooks/relations'
import { useAccountsQuery } from '@rooms/hooks/accounts'
import { useValidationSchema, useInitialValues, useValuesToResult } from '@rooms/components/parts/relations/RegisterRelationFormFields/hooks'
import RegisterRelationFormFields from '@rooms/components/parts/relations/RegisterRelationFormFields'

export default function RegisterStudentRelation () {
  const router = useRouter()
  const { query: { roomId, studentId } } = router

  const getStudentPath = useGetStudentPath(roomId, studentId)

  const {
    data: allAccounts,
    isLoading: isGettingAccounts,
    isSuccess: isGotAccounts,
    error: gettingAccountsError
  } = useAccountsQuery(roomId)

  const accounts = useMemo(() => allAccounts?.filter(account => account.id !== studentId), [allAccounts, studentId])

  const [create, {
    isSuccess: isCreated,
    isLoading: isCreating,
    error: creatingError,
  }] = useCreateStudentRelationMutation(roomId, studentId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues()
  const valuesToResult = useValuesToResult()

  const handleSubmit = useCallback(values => create(valuesToResult(values)), [create, valuesToResult])

  useEffect(() => {
    if (!isCreated) return
    toast.success('生徒の関係を登録しました')
    router.push(getStudentPath('/relations'))
  }, [getStudentPath, isCreated, router])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>生徒の関係の登録</FeatureTitle>
      </FeatureHead>
      <Suspension
        isLoading={!roomId || !studentId || isGettingAccounts}
        error={gettingAccountsError}
        isSuccess={roomId && studentId && isGotAccounts}>
          {() => (
            <Card>
              <CardBody>
                <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
                  {({ isValid }) =>  (
                    <Form>
                      <RegisterRelationFormFields accounts={accounts} />
                      <ErrorAlert error={creatingError} />
                      <FormActions>
                        <Button disabled={!isValid || isCreating} type="submit">関係を登録する</Button>
                      </FormActions>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          )}
      </Suspension>
    </Feature>
  )
}
