import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

import { useSubjects } from '@/hooks/subjects'
import { useTeachers } from '@/hooks/teachers'
import { useStudents } from '@/hooks/students'
import { useSheets } from '@/hooks/sheets'
import { useLesson, useUpdateLesson } from '@/hooks/lessons'
import { useToggleState } from '@/hooks/ui'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Form } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import Card, { CardActions, CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import Suspension from '@/components/parts/Suspension'
import LessonFormFields from '@/components/parts/lessons/LessonFormFields'
import { useInitialValues, useValidationSchema, valuesToLesson } from '@/components/parts/lessons/LessonFormFields/hooks'
import LessonPropertySet from '@/components/parts/lessons/LessonPropertySet'

export default function ManageLesson () {
  const { query:{ roomId, lessonId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: subjects,
    isLoading: isGettingSubjects,
    isSuccess: isGotSubjects,
    error: gettingSubjectsError
  } = useSubjects(roomId)

  const {
    data: teachers,
    isLoading: isGettingTeachers,
    isSuccess: isGotTeachers,
    error: gettingTeachersError
  } = useTeachers(roomId)
  const {
    data: students,
    isLoading: isGettingStudents,
    isSuccess: isGotStudents,
    error: gettingStudentsError
  } = useStudents(roomId)

  const {
    data: sheets,
    isLoading: isGettingSheets,
    isSuccess: isGotSheets,
    error: gettingSheetsError
  } = useSheets(roomId)

  const {
    data: lesson,
    mutate,
    isLoading: isGettingLesson,
    isSuccess: isGotLesson,
    error: gettingLessonError
  } = useLesson(roomId, lessonId)

  const [update, {
    data: updatedLesson,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateLesson(roomId, lessonId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues(lesson, { subjects, sheets, teachers, students })
  const handleSubmit = useCallback(values => update(valuesToLesson(roomId, values)), [roomId, update])

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
                      {updatingError && <ErrorAlert error={updatingError} />}
                      <div className="flex flex-row-reverse justify-between">
                        <Button primary type="submit" disabled={!isValid || isUpdating}>保存する</Button>
                        <Button secondary type="button" onClick={toggleEditing}>変更を破棄する</Button>
                      </div>
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
