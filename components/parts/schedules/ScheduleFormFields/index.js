import { useFormikContext } from 'formik'

import { SCHEDULE_TYPE } from '@/constatnts'

import { getRepeatLabel } from '@/services/schedule'

import { CheckBoxField, DateField, Field } from '@/components/parts/forms'
import RepeatTypeSelectField from '@/components/parts/forms/RepeatTypeSelectField'

export default function ScheduleFormFields ({
  ableableLabel = '利用可能',
  disableableLabel = '利用不可能',
}) {
  const { values: { startedAt, finishedAt, repeat, isAllDay,  } } = useFormikContext()
  return (
    <>
      <Field type="select" name="isAvalibale" label="予定の種類">
        <option value={SCHEDULE_TYPE.AVAILABLE}>{ableableLabel}</option>
        <option value={SCHEDULE_TYPE.DISAVAILABLE}>{disableableLabel}</option>
      </Field>
      <div className="flex gap-2">
        {isAllDay ? (
          <>
            <DateField type="date" name="startedAt" label="開始日" placeholder="開始日" />
            <div className="w-full"></div>
          </>
        ) : (
          <>
            <DateField type="datetime-local" name="startedAt" label="開始日時" placeholder="開始日時" />
            <DateField type="datetime-local" name="finishedAt" label="終了日時" placeholder="終了日時" />
          </>
        )}
      </div>
      <div className="flex gap-2">
        <CheckBoxField name="isAllDay" label="終日" />
      </div>
      <div className="flex gap-2">
        <RepeatTypeSelectField
          name="repeat" placeholder="繰り返し"
          label="繰り返し"
          helper={getRepeatLabel({
            startedAt, finishedAt, repeat: repeat?.value
          })} />
      </div>
    </>
  )
}
