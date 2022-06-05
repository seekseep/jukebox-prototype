import Link from 'next/link'
import { useGetRoomPath } from '@rooms/hooks/router'

import { WithDocRef, WithDocRefs } from '@/components/utilities/withDocRefs'

import PropertySet, {
  PropertyItem,
  PropertyContents,
  PropertyLabel,
  PropertyCollectionContents,
  PropertyDateTimeContents
} from '@/components/parts/PropertySet'
import Collection, {
  CollectionLinkItem
} from '@/components/parts/Collection'
import { useLessonValidity } from '@rooms/hooks/lessons/validity'
import LessonValidityBadge from './LessonValidityBadge'

export default function LessonPropertySet ({ roomId, lesson }) {
  const getRoomPath = useGetRoomPath(roomId)

  const { validity, messages } = useLessonValidity(roomId, lesson.id)

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
        <PropertyLabel>科目</PropertyLabel>
        <PropertyContents>
          {lesson.subject && (
            <WithDocRef docRef={lesson.subject}>
              {({ data: subject }) => (
                <Link href={getRoomPath(`/subjects/${subject.id}`)}>
                  {subject.name}
                </Link>
              )}
            </WithDocRef>
          )}
        </PropertyContents>
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
      <PropertyItem>
        <PropertyLabel>妥当性</PropertyLabel>
        <PropertyContents>
          <div className="flex flex-col gap-2">
            <LessonValidityBadge validity={validity} />
            {messages.length > 0 && (
              <div className="py-2 bg-gray-50 rounded-sm">
                {messages.map((message, index) => (
                  <div key={index} className="border-b p-2">
                    {message}
                  </div>
                ))}
              </div>
            )}
          </div>
        </PropertyContents>
      </PropertyItem>
    </PropertySet>
  )
}
