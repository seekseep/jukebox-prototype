import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { useGetStudentPath } from '@/hooks/router'
import { useCreateRelation } from '@/hooks/relations'
import { useAccounts } from '@/hooks/accounts'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { useValidationSchema, valuesToRelation } from '@/components/parts/relations/RegisterRelationFormFields/hooks'
import RegisterRelationFormFields from '@/components/parts/relations/RegisterRelationFormFields'
import Loading from '@/components/parts/Loading'

export default function RegisterStudentRelation () {
  const router = useRouter()
  const { query: { roomId, studentId } } = router

  const getStudentPath = useGetStudentPath(roomId, studentId)

  const {
    data: allAccounts,
    isLoading: isGettingAccounts,
    isSuccess: isGotAccounts
  } = useAccounts(roomId)

  const accounts = useMemo(() => allAccounts?.filter(account => account.id !== studentId), [allAccounts, studentId])

  const [create, {
    isSuccess,
    isLoading: isCreating,
    error,
  }] = useCreateRelation(roomId)

  const validationSchema = useValidationSchema()

  const initialValues = useMemo(() => validationSchema.cast({
    departure: studentId
  }, { stripUnknown: true }), [studentId, validationSchema])

  const handleSubmit = useCallback(values => {
    return create(valuesToRelation(roomId, values))
  }, [create, roomId])

  useEffect(() => {
    if (!isSuccess) return
    toast.success('生徒の関係を登録しました')
    router.push(getStudentPath('/relations'))
  }, [getStudentPath, isSuccess, router])

  const isLoading = isGettingAccounts
  const isReady = isGotAccounts

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>生徒の関係の登録</FeatureTitle>
      </FeatureHead>
      {isLoading && <Loading />}
      {isReady && (
        <Card>
          <CardBody>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
              {({ isValid }) =>  (
                <Form>
                  <RegisterRelationFormFields accounts={accounts} />
                  {error && <ErrorAlert error={error} />}
                  <div className="flex justify-end">
                    <Button disabled={!isValid || isCreating} type="submit">関係を登録する</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      )}
    </Feature>
  )
}
