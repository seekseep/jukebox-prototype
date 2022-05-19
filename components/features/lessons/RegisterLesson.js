import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'
import { useSubjects } from '@/hooks/subjects'
import { useCreateLessons } from '@/hooks/lessons'
import { useTeachers } from '@/hooks/teachers'
import { useStudents } from '@/hooks/students'
import { useSheets } from '@/hooks/sheets'
import { useInitialValues, useValidationSchema, valuesToLessons } from '@/components/parts/lessons/RegisterLessonFormFields/hooks'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import RegisterLessonFormFields from '@/components/parts/lessons/RegisterLessonFormFields'

export default function RegisterLesson () {
  const router = useRouter()
  const { query: { roomId } } = router
  const getRoomPath = useGetRoomPath(roomId)

  const { data: subjects } = useSubjects(roomId)
  const { data: students } = useStudents(roomId)
  const { data: teachers } = useTeachers(roomId)
  const { data: sheets } = useSheets(roomId)

  const [create, { isSuccess, error, }] = useCreateLessons(roomId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues()

  const handleSubmit = useCallback((values) => create(valuesToLessons(roomId, values)), [create, roomId])

  useEffect(() => {
    if (!isSuccess) return
    toast.success('授業を登録しました')
    router.push(getRoomPath('/lessons'))
  }, [getRoomPath, isSuccess, router])

  const isReady = !!subjects && !!students && !!teachers && !!sheets

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業の一括登録</FeatureTitle>
      </FeatureHead>
      <Card>
        <CardBody>
          {isReady && (
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
              {() => (
                <Form>
                  <RegisterLessonFormFields
                    students={students}
                    teachers={teachers}
                    subjects={subjects}
                    sheets={sheets} />
                  {error && <ErrorAlert error={error} />}
                  <Button type="submit">授業を登録する</Button>
                </Form>
              )}
            </Formik>
          )}
        </CardBody>
      </Card>
      <div className="h-72" />
    </Feature>
  )
}
