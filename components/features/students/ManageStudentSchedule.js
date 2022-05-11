import { useRouter } from 'next/router'
import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import { FORM_ERROR_REQUIRED } from '../../../messages'

import { useToggleState } from '@/hooks/ui'
import { useStudentSchedule, useUpdateStudentSchedule } from '@/hooks/students'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Form, Field, SelectField } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import Loading from '@/components/parts/Loading'
import Card, { CardActions, CardBody } from '@/components/parts/Card'
import PropertySet, {
  PropertyItem,
  PropertyLabel,
  PropertyDateTimeContents,
  PropertyContents
} from '@/components/parts/PropertySet'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { getDatetimeLocalValue } from '@/services/input'

export default function ManageStudentSchedule () {
  const { query:{ roomId, studentId, scheduleId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: schedule,
    isLoading,
    error: gettingError,
    isSuccess: isReady,
    mutate
  } = useStudentSchedule(roomId, studentId, scheduleId)
  const [update, {
    data: updatedSchedule,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateStudentSchedule(roomId, studentId, scheduleId)

  const validationSchema = useMemo(() => Yup.object().shape({
    startedAt : Yup.string().required(FORM_ERROR_REQUIRED),
    finishedAt: Yup.string().required(FORM_ERROR_REQUIRED),
    type      : Yup.object().shape({ label: Yup.string(), value: Yup.string() }).required(FORM_ERROR_REQUIRED).default({
      label: '休み',
      value: 'DISABLED'
    }),
  }), [])
  const initialValues = useMemo(() => validationSchema.cast({
    startedAt : getDatetimeLocalValue(schedule?.startedAt.toDate()),
    finishedAt: getDatetimeLocalValue(schedule?.finishedAt.toDate()),
    type      : {
      label: '休み',
      value: 'DISABLED'
    }
  }, { stripUnknown: true }), [schedule?.finishedAt, schedule?.startedAt, validationSchema])
  const handleSubmit = useCallback((student) => update(student), [update])
  useEffect(() => {
    if (!isUpdated) return
    toast.success('生徒の予定を保存しました')
    mutate(updatedSchedule)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedSchedule])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>生徒の情報</FeatureTitle>
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
                    <Field name="startedAt" label="開始日時" type="datetime-local" />
                    <Field name="finishedAt" label="終了日時" type="datetime-local" />
                    <SelectField name="type" label="種別" options={[
                      {
                        label: '登校可能',
                        value: 'ENABLED'
                      },{
                        label: '休み',
                        value: 'DISABLED'
                      },
                    ]} />
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
              <PropertySet>
                <PropertyItem>
                  <PropertyLabel>開始日時</PropertyLabel>
                  <PropertyDateTimeContents value={schedule?.finishedAt?.toDate()} />
                </PropertyItem>
                <PropertyItem>
                  <PropertyLabel>終了日時</PropertyLabel>
                  <PropertyDateTimeContents value={schedule?.finishedAt?.toDate()} />
                </PropertyItem>
                <PropertyItem>
                  <PropertyLabel>終了日時</PropertyLabel>
                  <PropertyContents>
                    {schedule.type === 'DISABLED' ? '休み': '登校可能'}
                  </PropertyContents>
                </PropertyItem>
              </PropertySet>
            </>
          )}
        </Card>
      )}
    </Feature>
  )
}
