import { useFormikContext } from 'formik'

import { useTagOptions } from '@/hooks/lessonFrames'

import { CreatableSelectField, Field } from '@/components/parts/forms'
import LessonFrameRepeatSelectField from '@/components/parts/lessonFrames/LessonFrameRepeatTypeSelectField'
import LessonFrameDayCountField from '@/components/parts/lessonFrames/LessonFrameDayCountField'

export default function LessonFrameFormFields ({ tags }) {
  const { values: { repeat } } = useFormikContext()
  const tagOptions = useTagOptions(tags)

  return (
    <>
      <CreatableSelectField
        label="タグ" name="tags" options={tagOptions} isMulti />
      <div className="flex gap-3">
        <Field name="startTime" label="開始時刻" type="time" />
        <Field name="finishTime" label="終了時刻" type="time" />
      </div>
      <div className="flex gap-3">
        <LessonFrameRepeatSelectField
          name="repeat" label="繰り返し期間" />
        <LessonFrameDayCountField
          name="dayCount" label="日" repeat={repeat.value} />
      </div>
    </>
  )
}
