import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import Suspension from '@/components/parts/Suspension'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useCreateLessonFrameMutation, useLessonFramesQuery, useLessonFrameTags } from '@rooms/hooks/lessonFrames'

import { useValidationSchema, useValuesToResult, useInitialValues } from '@rooms/components/parts/lessonFrames/LessonFrameFormFields/hooks'
import LessonFrameFormFields from '@rooms/components/parts/lessonFrames/LessonFrameFormFields'

export default function RegisterLessonFrame () {
  const router = useRouter()
  const { query: { roomId } } = router

  const getRoomPath = useGetRoomPath(roomId)

  const {
    data: lessonFrames,
    ...result
  } = useLessonFramesQuery(roomId)

  const [create, {
    isLoading: isCreating,
    isSuccess: isCreated,
    error: creatingError,
  }] = useCreateLessonFrameMutation(roomId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues()
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback(values => create(valuesToResult(values)), [create, valuesToResult])

  const tags = useLessonFrameTags(lessonFrames)

  useEffect(() => {
    if (!isCreated) return
    toast.success('授業枠を登録しました')
    router.push(getRoomPath('/settings/lessonFrames'))
  }, [getRoomPath, isCreated, router])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業枠のの登録</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            <CardBody>
              <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
                {({ isValid }) => (
                <Form>
                  <LessonFrameFormFields tags={tags} />
                  <ErrorAlert error={creatingError} />
                  <FormActions>
                    <Button disabled={!isValid || isCreating} type="submit">授業枠を登録する</Button>
                  </FormActions>
                </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
