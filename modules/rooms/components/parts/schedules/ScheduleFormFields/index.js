import { useFormikContext } from 'formik'

import {
  FieldGroup,
  Field,
  DateField
} from '@/components/parts/forms'
import EventDatesFields from '@/components/parts/forms/EventDatesField'

import { SCHEDULE_TYPE, REPEAT_TYPE } from '@rooms/constants'
import RepeatTypeSelectField from '@rooms/components/parts/RepeatTypeSelectField'
import WeeklyRepeatIndexesField from '@rooms/components/parts/WeeklyRepeatIndexesField'
import MonthlyRepeatIndexesField from '@rooms/components/parts/MonthlyRepeatIndexesField'

export default function ScheduleFormFields ({
  ableableLabel = '利用可能',
  disableableLabel = '利用不可能',
}) {
  const { values } = useFormikContext()
  const { repeat } = values

  return (
    <>
      <FieldGroup>
        <Field type="select" name="type" label="予定の種類">
          <option value={SCHEDULE_TYPE.AVAILABLE}>{ableableLabel}</option>
          <option value={SCHEDULE_TYPE.DISAVAILABLE}>{disableableLabel}</option>
        </Field>
        <RepeatTypeSelectField name="repeat" label="繰り返し" noYearly />
      </FieldGroup>
      {/* NOTE: 繰り返しなし */}
      {repeat === REPEAT_TYPE.NONE && (
        <EventDatesFields label="日時" isEnabnledIsAllDay />
      )}
      {repeat === REPEAT_TYPE.WEEKLY && (
        <WeeklyRepeatIndexesField
          label="曜日"
          name="repeatIndexes" />
      )}
      {repeat === REPEAT_TYPE.MONTHLY && (
        <MonthlyRepeatIndexesField
          label="日付"
          name="repeatIndexes" />
      )}
      {repeat !== REPEAT_TYPE.NONE && (
        <>
          <FieldGroup>
            <DateField
              label="繰り返し開始日"
              type="date"
              name="repeatStartDate" />
            <DateField
              label="繰り返し終了日"
              type="date"
              name="repeatFinishDate" />
          </FieldGroup>
          <FieldGroup>
            <Field
              type="time"
              name="repeatStartTime"
              label="開始時刻" />
            <Field
              type="time"
              name="repeatFinishTime"
              label="終了時刻" />
          </FieldGroup>
        </>
      )}
      <Field label="備考" name="comment" type="textarea" rows={5} />
    </>
  )
}
