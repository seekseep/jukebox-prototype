import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

import { useToggleState } from '@/hooks/ui'


import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Form } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import Card, { CardActions, CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'

import { useLessonFrameQuery, useLessonFramesQuery, useUpdateLessonFrameMutation, useLessonFrameTags } from '@rooms/hooks/lessonFrames'
import { useInitialValues, useValidationSchema, useValuesToResult } from '@rooms/components/parts/lessonFrames/LessonFrameFormFields/hooks'
import LessonFrameFormFields from '@rooms/components/parts/lessonFrames/LessonFrameFormFields'
import LessonFramePropertySet from '@rooms/components/parts/lessonFrames/LessonFramePropertySet'

export default function ManageLessonFrame () {
  const { query:{ roomId, lessonFrameId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: lessonFrames,
    isLoading: isGettingLessonFrames,
    isSuccess: isGotLessonFrames,
    error: gettingLessonFramesError
  } = useLessonFramesQuery(roomId)

  const {
    data: lessonFrame,
    isLoading: isGettingLessonFrame,
    isSuccess: isGotLessonFrame,
    error: gettingLessonFrameError,
    mutate
  } = useLessonFrameQuery(roomId, lessonFrameId)

  const [update, {
    data: updatedLessonFrame,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateLessonFrameMutation(roomId, lessonFrameId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues(lessonFrame)
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback((values) => update(valuesToResult(values)), [update, valuesToResult])

  const tags = useLessonFrameTags(lessonFrames)

  useEffect(() => {
    if (!isUpdated) return
    toast.success('???????????????????????????????????????')
    mutate(updatedLessonFrame)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedLessonFrame])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>?????????</FeatureTitle>
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
                      <Button color="primary" type="submit" disabled={!isValid || isUpdating}>????????????</Button>
                      <Button color="secondary" type="button" onClick={toggleEditing}>?????????????????????</Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardBody>
          ) : (
            <>
              <CardActions>
                <Button color="secondary" size="sm" onClick={toggleEditing}>????????????</Button>
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
