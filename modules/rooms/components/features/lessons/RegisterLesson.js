import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useSubjectsQuery } from '@rooms/hooks/subjects'
import { useTeachersQuery } from '@rooms/hooks/teachers'
import { useStudentsQuery } from '@rooms/hooks/students'
import { useSheetsQuery } from '@rooms/hooks/sheets'
import { useCreateLessonsMutation } from '@rooms/hooks/lessons'
import { useInitialValues, useValidationSchema, useValuesToResult } from '@rooms/components/parts/lessons/RegisterLessonFormFields/hooks'
import RegisterLessonFormFields from '@rooms/components/parts/lessons/RegisterLessonFormFields'
import { MultiSuspension } from '@/components/parts/Suspension'

export default function RegisterLesson () {
  const router = useRouter()
  const { query: { roomId } } = router
  const getRoomPath = useGetRoomPath(roomId)

  const subjectsQueryResult = useSubjectsQuery(roomId)
  const studentsQueryResult = useStudentsQuery(roomId)
  const teachersQueryResult = useTeachersQuery(roomId)
  const sheetsQueryResult = useSheetsQuery(roomId)

  const [create, {
    isLoading: isCreating,
    isSuccess: isCreated,
    error: creatingError,
  }] = useCreateLessonsMutation(roomId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues()
  const valuesToResult = useValuesToResult()

  const handleSubmit = useCallback((values) => create(valuesToResult(values)), [create, valuesToResult])

  useEffect(() => {
    if (!isCreated) return
    toast.success('授業を登録しました')
    router.push(getRoomPath('/lessons/list'))
  }, [getRoomPath, isCreated, router])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業の一括登録</FeatureTitle>
      </FeatureHead>
      <MultiSuspension results={[subjectsQueryResult, studentsQueryResult, teachersQueryResult, sheetsQueryResult]}>
        {({ data: [subjects, students, teachers, sheets] }) => (
            <Card>
              <CardBody>
                <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
                  {({ isValid }) => (
                    <Form>
                      <RegisterLessonFormFields
                        students={students}
                        teachers={teachers}
                        subjects={subjects}
                        sheets={sheets} />
                      <ErrorAlert error={creatingError} />
                      <FormActions>
                        <Button disabled={!isValid || isCreating} type="submit">授業を登録する</Button>
                      </FormActions>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
        )}
      </MultiSuspension>
    </Feature>
  )
}
