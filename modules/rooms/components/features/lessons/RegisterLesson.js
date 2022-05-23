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
import { useCreateLessonsMutation } from '@rooms/hooks/lessons'
import { useTeachersQuery } from '@rooms/hooks/teachers'
import { useStudentsQuery } from '@rooms/hooks/students'
import { useSheetsQuery } from '@rooms/hooks/sheets'
import { useInitialValues, useValidationSchema, useValuesToResult } from '@rooms/components/parts/lessons/RegisterLessonFormFields/hooks'
import RegisterLessonFormFields from '@rooms/components/parts/lessons/RegisterLessonFormFields'
import Suspension from '@/components/parts/Suspension'

export default function RegisterLesson () {
  const router = useRouter()
  const { query: { roomId } } = router
  const getRoomPath = useGetRoomPath(roomId)

  const {
    data: subjects,
    isLoading: isGettingSubjects,
    isSuccess: isGotSubjects,
    error: gettingSubjectsError
  } = useSubjectsQuery(roomId)
  const {
    data: students,
    isLoading: isGettingStudents,
    isSuccess: isGotStudents,
    error: gettingStudentsError
  } = useStudentsQuery(roomId)
  const {
    data: teachers,
    isLoading: isGettingTeachers,
    isSuccess: isGotTeachers,
    error: gettingTeachersError
  } = useTeachersQuery(roomId)
  const {
    data: sheets,
    isLoading: isGettingSheets,
    isSuccess: isGotSheets,
    error: gettingSheetsError
  } = useSheetsQuery(roomId)

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
    router.push(getRoomPath('/lessons'))
  }, [getRoomPath, isCreated, router])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業の一括登録</FeatureTitle>
      </FeatureHead>
      <Suspension
        isLoading={isGettingSubjects || isGettingStudents || isGettingTeachers || isGettingSheets}
        isSuccess={isGotSubjects && isGotStudents && isGotTeachers && isGotSheets}
        error={gettingSubjectsError || gettingStudentsError || gettingTeachersError || gettingSheetsError}>
        {() => (
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
      </Suspension>
      <div className="h-72" />
    </Feature>
  )
}
