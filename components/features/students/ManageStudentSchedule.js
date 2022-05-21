import { useRouter } from 'next/router'
import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import { STUDENT_SCHEDULE_TYPE_LABEL } from '@/constatnts'

import { getOption } from '@/services/input'

import { useToggleState } from '@/hooks/ui'
import { useSchedule, useUpdateSchedule } from '@/hooks/schedules'
import { useScheduleValidationSchema, valuesToSchedule } from '@/components/parts/schedules/ScheduleFormFields/hooks'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Form } from '@/components/parts/forms'
import { REPEAT_TYPE_OPTIONS } from '@/components/parts/forms/RepeatTypeSelectField'
import { Button } from '@/components/parts/buttons'
import Loading from '@/components/parts/Loading'
import Card, { CardActions, CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import SchedulePropertySet from '@/components/parts/schedules/SchedulePropertySet'
import ScheduleFormFields from '@/components/parts/schedules/ScheduleFormFields'


export default function ManageStudentSchedule () {
  const { query:{ roomId, scheduleId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: schedule,
    isLoading,
    error: gettingError,
    isSuccess: isReady,
    mutate
  } = useSchedule(roomId, scheduleId)
  const [update, {
    data: updatedSchedule,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateSchedule(roomId, scheduleId)

  const scheduleValidationSchema = useScheduleValidationSchema()
  const validationSchema = useMemo(() => Yup.object().shape({
    ...scheduleValidationSchema.fields
  }), [scheduleValidationSchema.fields])
  const initialValues = useMemo(() => validationSchema.cast({
    ...schedule,
    repeat: getOption(schedule?.repeat, Object.values(REPEAT_TYPE_OPTIONS)),
  }, { stripUnknown: true }), [schedule, validationSchema])
  const handleSubmit = useCallback((values) => update({
    ...valuesToSchedule(values)
  }), [update])

  useEffect(() => {
    if (!isUpdated) return
    toast.success('生徒の予定を保存しました')
    mutate(updatedSchedule)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedSchedule])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>予定の内容</FeatureTitle>
      </FeatureHead>
      {isLoading && <Loading />}
      {gettingError && <ErrorAlert error={gettingError} />}
      {isReady && (
        <Card>
          {isEditing ? (
            <CardBody>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isValid }) => (
                  <Form>
                    <ScheduleFormFields
                      ableableLabel={STUDENT_SCHEDULE_TYPE_LABEL.AVAILABLE}
                      disableableLabel={STUDENT_SCHEDULE_TYPE_LABEL.DISAVAILABLE} />
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
              <SchedulePropertySet schedule={schedule} />
            </>
          )}
        </Card>
      )}
    </Feature>
  )
}
