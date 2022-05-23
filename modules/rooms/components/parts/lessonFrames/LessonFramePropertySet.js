import PropertySet, {
  PropertyItem,
  PropertyLabel,
  PropertyContents
} from '@/components/parts/PropertySet'
import { getDayCountLabel } from '@/services/lessonFrames'

export default function RelationPropertySet ({ lessonFrame }) {
  return (
    <PropertySet>
      <PropertyItem>
        <PropertyLabel>タグ</PropertyLabel>
        <PropertyContents>
          {lessonFrame.tags.join(',')}
        </PropertyContents>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>開始時刻</PropertyLabel>
        <PropertyContents>
          {lessonFrame.startTime}
        </PropertyContents>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>終了時刻</PropertyLabel>
        <PropertyContents>
          {lessonFrame.finishTime}
        </PropertyContents>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>繰り返し</PropertyLabel>
        <PropertyContents>
          {getDayCountLabel(lessonFrame.dayCount, lessonFrame.repeat)}
        </PropertyContents>
      </PropertyItem>

    </PropertySet>
  )
}
