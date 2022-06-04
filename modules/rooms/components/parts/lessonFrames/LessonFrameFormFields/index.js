import { useFormikContext } from 'formik'

import { REPEAT_TYPE } from '@rooms/constants'
import { useTagOptions } from '@rooms/hooks/lessonFrames'

import {
  CreatableSelectField,
  Field, FieldGroup, DateField,
} from '@/components/parts/forms'
import RepeatTypeSelectField from '../../RepeatTypeSelectField'
import WeeklyRepeatIndexesField from '../../WeeklyRepeatIndexesField'
import MonthlyRepeatIndexesField from '../../MonthlyRepeatIndexesField'

export default function LessonFrameFormFields ({ tags }) {
  const { values: { repeat } } = useFormikContext()
  const tagOptions = useTagOptions(tags)

  return (
    <>
      <CreatableSelectField
        label="タグ" name="tags" options={tagOptions} isMulti />
      <RepeatTypeSelectField
        label="繰り返し" name="repeat" noYearly  noNone />
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
      <Field label="備考" name="comment" type="textarea" rows={5} />
    </>
  )
}
