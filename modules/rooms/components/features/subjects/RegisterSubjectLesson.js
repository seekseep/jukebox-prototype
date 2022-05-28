import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { MultiSuspension } from '@/components/parts/Suspension'

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

  const studentsQueryResult = useStudentsQuery(roomId)
  const teachersQueryResult = useTeachersQuery(roomId)
  const sheetsQueryResult = useSheetsQuery(roomId)

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
      <MultiSuspension results={[studentsQueryResult, teachersQueryResult, sheetsQueryResult]}>
        {({ data: [students, teachers, sheets] }) => (
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
      </MultiSuspension>
      <div className="h-72" />
    </Feature>
  )
}
