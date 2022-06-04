import PropertySet, {
  PropertyItem,
  PropertyLabel,
  PropertyContents
} from '@/components/parts/PropertySet'
import RepeatTypeLabel from '../RepeatTypeLabel'
import { getDayLabel } from '@rooms/services/lessons'
import { REPEAT_TYPE } from '@rooms/constants'

export default function RelationPropertySet ({ lessonFrame }) {
  const { repeat } = lessonFrame
  return (
    <PropertySet>
      <PropertyItem>
        <PropertyLabel>タグ</PropertyLabel>
        <PropertyContents>
          {lessonFrame.tags.join(',')}
        </PropertyContents>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>繰り返し</PropertyLabel>
        <PropertyContents>
          <RepeatTypeLabel repeat={lessonFrame.repeat}/>
        </PropertyContents>
      </PropertyItem>
      {repeat === REPEAT_TYPE.WEEKLY && (
        <PropertyItem>
          <PropertyLabel>曜日</PropertyLabel>
          <PropertyContents>
            <div className="flex gap-1">
              {lessonFrame.repeatIndexes.map(day => (
                <div key={day}>{getDayLabel(day)}</div>
              ))}
            </div>
          </PropertyContents>
        </PropertyItem>
      )}
      {repeat === REPEAT_TYPE.MONTHLY && (
        <PropertyItem>
          <PropertyLabel>日付</PropertyLabel>
          <PropertyContents>
            {`毎月 ${lessonFrame.repeatIndexes[0] + 1} 日`}
          </PropertyContents>
        </PropertyItem>
      )}
      <PropertyItem>
        <PropertyLabel>時間</PropertyLabel>
        <PropertyContents>
          {lessonFrame.repeatStartTime} ~ {lessonFrame.repeatFinishTime}
        </PropertyContents>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>備考</PropertyLabel>
        <PropertyContents>{lessonFrame.comment}</PropertyContents>
      </PropertyItem>
    </PropertySet>
  )
}
