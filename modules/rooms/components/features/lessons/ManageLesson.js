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
import Suspension from '@/components/parts/Suspension'

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

  const {
    data: subjects,
    isLoading: isGettingSubjects,
    isSuccess: isGotSubjects,
    error: gettingSubjectsError
  } = useSubjectsQuery(roomId)

  const {
    data: teachers,
    isLoading: isGettingTeachers,
    isSuccess: isGotTeachers,
    error: gettingTeachersError
  } = useTeachersQuery(roomId)
  const {
    data: students,
    isLoading: isGettingStudents,
    isSuccess: isGotStudents,
    error: gettingStudentsError
  } = useStudentsQuery(roomId)

  const {
    data: sheets,
    isLoading: isGettingSheets,
    isSuccess: isGotSheets,
    error: gettingSheetsError
  } = useSheetsQuery(roomId)

  const {
    data: lesson,
    mutate,
    isLoading: isGettingLesson,
    isSuccess: isGotLesson,
    error: gettingLessonError
  } = useLessonQuery(roomId, lessonId)

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
    toast.success('授業の変更を保存しました')
    mutate(updatedLesson)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedLesson])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業</FeatureTitle>
      </FeatureHead>
      <Suspension
        isLoading={isGettingSubjects || isGettingTeachers || isGettingStudents || isGettingSheets || isGettingLesson}
        isSuccess={isGotSubjects && isGotTeachers && isGotStudents && isGotSheets && isGotLesson}
        error={gettingSubjectsError || gettingTeachersError || gettingStudentsError || gettingSheetsError || gettingLessonError}>
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
                        <Button primary type="submit" disabled={!isValid || isUpdating}>保存する</Button>
                        <Button secondary type="button" onClick={toggleEditing}>変更を破棄する</Button>
                      </FormActions>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            ) : (
              <>
                <CardActions>
                  <Button secondary sm onClick={toggleEditing}>編集する</Button>
                </CardActions>
                <LessonPropertySet roomId={roomId} lesson={lesson} />
              </>
            )}
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
