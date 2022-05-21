import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

import { useToggleState } from '@/hooks/ui'
import { useLessonFrame, useLessonFrames, useUpdateLessonFrame, useLessonFrameTags } from '@/hooks/lessonFrames'
import { useInitialValues, useValidationSchema, valuesToLessonFrame } from '@/components/parts/lessonFrames/LessonFrameFormFields/hooks'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Form } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import Card, { CardActions, CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import LessonFrameFormFields from '@/components/parts/lessonFrames/LessonFrameFormFields'
import LessonFramePropertySet from '@/components/parts/lessonFrames/LessonFramePropertySet'

export default function ManageLessonFrame () {
  const { query:{ roomId, lessonFrameId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: lessonFrames,
    isLoading: isGettingLessonFrames,
    isSuccess: isGotLessonFrames,
    error: gettingLessonFramesError
  } = useLessonFrames(roomId)

  const tags = useLessonFrameTags(lessonFrames)

  const {
    data: lessonFrame,
    isLoading: isGettingLessonFrame,
    isSuccess: isGotLessonFrame,
    error: gettingLessonFrameError,
    mutate
  } = useLessonFrame(roomId, lessonFrameId)

  const [update, {
    data: updatedLessonFrame,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateLessonFrame(roomId, lessonFrameId)


  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues(lessonFrame)
  const handleSubmit = useCallback((values) => update(valuesToLessonFrame(values)), [update])

  useEffect(() => {
    if (!isUpdated) return
    toast.success('授業枠の変更を保存しました')
    mutate(updatedLessonFrame)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedLessonFrame])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業枠</FeatureTitle>
      </FeatureHead>
      <Suspension
        isLoading={isGettingLessonFrame || isGettingLessonFrames}
        isSuccess={isGotLessonFrame && isGotLessonFrames}
        error={gettingLessonFrameError || gettingLessonFramesError}>
      {() => (
        <Card>
          {isEditing ? (
            <CardBody>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isValid }) => (
                  <Form>
                    <LessonFrameFormFields tags={tags} />
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
              <LessonFramePropertySet lessonFrame={lessonFrame} />
            </>
          )}
        </Card>
        )}
      </Suspension>
    </Feature>
  )
}
