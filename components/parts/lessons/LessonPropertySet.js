import { useGetRoomPath } from '@/hooks/router'

import { WithDocRefs } from '@/components/utilities/withDocRefs'

import PropertySet, {
  PropertyItem,
  PropertyLabel,
  PropertyCollectionContents,
  PropertyDateTimeContents
} from '@/components/parts/PropertySet'
import Collection, {
  CollectionLinkItem
} from '@/components/parts/Collection'

export default function LessonPropertySet ({ roomId, lesson }) {
  const getRoomPath = useGetRoomPath(roomId)
  return (
    <PropertySet>
      <PropertyItem>
        <PropertyLabel>開始日時</PropertyLabel>
        <PropertyDateTimeContents value={lesson.startedAt} />
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>終了日時</PropertyLabel>
        <PropertyDateTimeContents value={lesson.finishedAt} />
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>生徒</PropertyLabel>
        <PropertyCollectionContents>
          <Collection>
            <WithDocRefs docRefs={lesson.students}>
              {({ data: student }) => (
                <CollectionLinkItem href={getRoomPath(`/students/${student.id}`)}>
                  {student.name}
                </CollectionLinkItem>
              )}
            </WithDocRefs>
          </Collection>
        </PropertyCollectionContents>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>講師</PropertyLabel>
        <PropertyCollectionContents>
          <Collection>
            <WithDocRefs docRefs={lesson.teachers}>
              {({ data: teacher }) => (
                <CollectionLinkItem href={getRoomPath(`/teachers/${teacher.id}`)}>
                  {teacher.name}
                </CollectionLinkItem>
              )}
            </WithDocRefs>
          </Collection>
        </PropertyCollectionContents>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>席</PropertyLabel>
        <PropertyCollectionContents>
          <Collection>
            <WithDocRefs docRefs={lesson.sheets}>
              {({ data: sheet }) => (
                <CollectionLinkItem href={getRoomPath(`/sheets/${sheet.id}`)}>
                  {sheet.name}
                </CollectionLinkItem>
              )}
            </WithDocRefs>
          </Collection>
        </PropertyCollectionContents>
      </PropertyItem>
    </PropertySet>
  )
}
