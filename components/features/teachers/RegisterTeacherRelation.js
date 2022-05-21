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
import RelationFormFields from '@/components/parts/relations/RegisterRelationFormFields'
import Suspension from '@/components/parts/Suspension'

export default function RegisterStudentRelation () {
  const router = useRouter()
  const { query: { roomId, teacherId } } = router

  const getStudentPath = useGetStudentPath(roomId, teacherId)

  const {
    data: allAccounts,
    ...result
  } = useAccounts(roomId)

  const accounts = useMemo(() => allAccounts?.filter(account => {
    return account.id !== teacherId
  }), [allAccounts, teacherId])

  const [create, {
    isSuccess,
    isLoading: isCreating,
    error,
  }] = useCreateRelation(roomId)

  const validationSchema = useValidationSchema()

  const initialValues = useMemo(() => validationSchema.cast({
    departure: teacherId
  }, { stripUnknown: true }), [teacherId, validationSchema])

  const handleSubmit = useCallback(values => create(valuesToRelation(roomId, values)), [create, roomId])

  useEffect(() => {
    if (!isSuccess) return
    toast.success('講師の関係を登録しました')
    router.push(getStudentPath('/relations'))
  }, [getStudentPath, isSuccess, router])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>関係の登録</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            <CardBody>
              <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
                {({ isValid }) => (
                  <Form>
                    <RelationFormFields accounts={accounts} />
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
      </Suspension>
    </Feature>
  )
}
