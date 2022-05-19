import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { useValidationSchema, useInitialValues, valuesToLessons } from '@/components/parts/lessons/RegisterSubjectLessonFormFields/hooks'
import { useGetSubjectPath } from '@/hooks/router'
import { useCreateLessons } from '@/hooks/lessons'
import { useTeachers } from '@/hooks/teachers'
import { useStudents } from '@/hooks/students'
import { useSheets } from '@/hooks/sheets'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import RegisterSubjectLessonFormFields from '@/components/parts/lessons/RegisterSubjectLessonFormFields'
import Suspension from '@/components/parts/Suspension'

export default function RegisterSubjectLesson () {
  const router = useRouter()
  const { query: { roomId, subjectId } } = router

  const getSubjectPath = useGetSubjectPath(roomId, subjectId)

  const {
    data: students,
    isLoading: isGettingStudents,
    isSuccess: isGotStudents,
    error: gettingStudentsError
  } = useStudents(roomId)
  const {
    data: teachers,
    isLoading: isGettingTeachers,
    isSuccess: isGotTeachers,
    error: gettingTeachersError
  } = useTeachers(roomId)
  const {
    data: sheets,
    isLoading: isGettingSheets,
    isSuccess: isGotSheets,
    error: gettingSheetsError
  } = useSheets(roomId)

  const [create, { isSuccess, error }] = useCreateLessons(roomId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues({ subjectId })
  const handleSubmit = useCallback((values) => create(valuesToLessons(roomId, values)), [create, roomId])

  useEffect(() => {
    if (!isSuccess) return
    toast.success('授業を登録しました')
    router.push(getSubjectPath('/lessons'))
  }, [getSubjectPath, isSuccess, router])

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
                {() => (
                  <Form>
                    <RegisterSubjectLessonFormFields
                      teachers={teachers}
                      students={students}
                      sheets={sheets} />
                    {error && <ErrorAlert error={error} />}
                    <Button type="submit">授業を登録する</Button>
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
