import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'
import { useCreateLessonFrame, useLessonFrames, useLessonFrameTags } from '@/hooks/lessonFrames'
import { useInitialValues, useValidationSchema, valuesToLessonFrame } from '@/components/parts/lessonFrames/LessonFrameFormFields/hooks'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import Suspension from '@/components/parts/Suspension'
import { Form } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import LessonFrameFormFields from '@/components/parts/lessonFrames/LessonFrameFormFields'

export default function RegisterLessonFrame () {
  const router = useRouter()
  const { query: { roomId } } = router

  const {
    data: lessonFrames,
    ...result
  } = useLessonFrames(roomId)

  const tags = useLessonFrameTags(lessonFrames)

  const getRoomPath = useGetRoomPath(roomId)

  const [create, {
    isSuccess,
    error,
  }] = useCreateLessonFrame(roomId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues()
  const handleSubmit = useCallback(values => create(valuesToLessonFrame(values)), [create])

  useEffect(() => {
    if (!isSuccess) return
    toast.success('授業枠を登録しました')
    router.push(getRoomPath('/settings/lessonFrames'))
  }, [getRoomPath, isSuccess, router])

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
                <Form>
                  <LessonFrameFormFields tags={tags} />
                  {error && <ErrorAlert error={error} />}
                  <div className="flex justify-end">
                    <Button type="submit">授業枠を登録する</Button>
                  </div>
                </Form>
              </Formik>
            </CardBody>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
