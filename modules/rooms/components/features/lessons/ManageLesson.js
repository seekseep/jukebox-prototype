import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

import { useToggleState } from '@/hooks/ui'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import Card, { CardActions, CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { MultiSuspension } from '@/components/parts/Suspension'

import { useSubjectsQuery } from '@rooms/hooks/subjects'
import { useTeachersQuery } from '@rooms/hooks/teachers'
import { useStudentsQuery } from '@rooms/hooks/students'
import { useSheetsQuery } from '@rooms/hooks/sheets'
import { useLessonQuery, useUpdateLessonMutation } from '@rooms/hooks/lessons'
import { useInitialValues, useValidationSchema, useValuesToResult } from '@rooms/components/parts/lessons/LessonFormFields/hooks'
import LessonFormFields from '@rooms/components/parts/lessons/LessonFormFields'
import LessonPropertySet from '@rooms/components/parts/lessons/LessonPropertySet'

export default function ManageLesson () {
  const { query:{ roomId, lessonId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const subjectsQueryResult = useSubjectsQuery(roomId)
  const teachersQueryResult = useTeachersQuery(roomId)
  const studentsQueryResult = useStudentsQuery(roomId)
  const sheetsQueryResult = useSheetsQuery(roomId)
  const lessonQueryResult = useLessonQuery(roomId, lessonId)

  const { data:subjects } = subjectsQueryResult
  const { data:teachers } = teachersQueryResult
  const { data:students } = studentsQueryResult
  const { data:sheets } = sheetsQueryResult
  const { data:lesson, mutate } = lessonQueryResult

  const [update, {
    data: updatedLesson,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateLessonMutation(roomId, lessonId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues(lesson, { subjects, sheets, teachers, students })
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback(values => update(valuesToResult(values)), [update, valuesToResult])

  useEffect(() => {
    if (!isUpdated) return
    toast.success('????????????????????????????????????')
    mutate(updatedLesson)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedLesson])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>??????</FeatureTitle>
      </FeatureHead>
      <MultiSuspension results={[ subjectsQueryResult, teachersQueryResult, studentsQueryResult, sheetsQueryResult, lessonQueryResult]}>
        {() => (
          <Card>
            {isEditing ? (
              <CardBody>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ isValid }) => (
                    <Form>
                      <LessonFormFields
                        subjects={subjects}
                        teachers={teachers}
                        students={students}
                        sheets={sheets} />
                      <ErrorAlert error={updatingError} />
                      <FormActions>
                        <Button primary type="submit" disabled={!isValid || isUpdating}>????????????</Button>
                        <Button color="secondary" type="button" onClick={toggleEditing}>?????????????????????</Button>
                      </FormActions>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            ) : (
              <>
                <CardActions>
                  <Button color="secondary" size="sm" onClick={toggleEditing}>????????????</Button>
                </CardActions>
                <LessonPropertySet roomId={roomId} lesson={lesson} />
              </>
            )}
          </Card>
        )}
      </MultiSuspension>
    </Feature>
  )
}
