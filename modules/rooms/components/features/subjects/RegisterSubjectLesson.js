import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Suspension from '@/components/parts/Suspension'

import { useGetSubjectPath } from '@rooms/hooks/router'
import { useCreateSubjectLessonsMutation } from '@rooms/hooks/lessons'
import { useTeachersQuery } from '@rooms/hooks/teachers'
import { useStudentsQuery } from '@rooms/hooks/students'
import { useSheetsQuery } from '@rooms/hooks/sheets'
import { useValidationSchema, useInitialValues, useValuesToResult } from '@rooms/components/parts/lessons/RegisterSubjectLessonFormFields/hooks'
import RegisterSubjectLessonFormFields from '@rooms/components/parts/lessons/RegisterSubjectLessonFormFields'

export default function RegisterSubjectLesson () {
  const router = useRouter()
  const { query: { roomId, subjectId } } = router

  const getSubjectPath = useGetSubjectPath(roomId, subjectId)

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

  console.log(roomId, subjectId)
  const [create, {
    isLoading: isCreating,
    isSuccess: isCreated,
    error: creatingError,
  }] = useCreateSubjectLessonsMutation(roomId, subjectId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues()
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback((values) => create(valuesToResult(values)), [create, valuesToResult])

  useEffect(() => {
    if (!isCreated) return
    toast.success('授業を登録しました')
    router.push(getSubjectPath('/lessons'))
  }, [getSubjectPath, isCreated, router])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業の登録</FeatureTitle>
      </FeatureHead>
      <Suspension
        isLoading={isGettingStudents || isGettingTeachers || isGettingSheets}
        isSuccess={isGotStudents && isGotTeachers && isGotSheets}
        error={gettingStudentsError || gettingTeachersError || gettingSheetsError}>
        {() => (
          <Card>
            <CardBody>
              <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
                {({ isValid }) => (
                  <Form>
                    <RegisterSubjectLessonFormFields
                      teachers={teachers}
                      students={students}
                      sheets={sheets} />
                    <ErrorAlert error={creatingError} />
                    <FormActions>
                      <Button disabled={!isValid || isCreating } type="submit">授業を登録する</Button>
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
