import { WithDocRefs } from '@/components/utilities/withDocRefs'

import Collection, {
  CollectionLinkItem
} from '@/components/parts/Collection'

import PropertySet, {
  PropertyContents,
  PropertyItem, PropertyLabel,
  PropertyCollectionContents
} from '@/components/parts/PropertySet'
import { useGetRoomPath } from '@rooms/hooks/router'

export default function ParentPropertySet ({ roomId, parent }) {
  const getRoomPath = useGetRoomPath(roomId)
  return (
    <PropertySet>
      <PropertyItem>
        <PropertyLabel>εε</PropertyLabel>
        <PropertyContents>{parent.name}</PropertyContents>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>ηεΎ</PropertyLabel>
        <PropertyCollectionContents>
          <Collection>
            <WithDocRefs docRefs={parent.students}>
              {({ data: student }) => (
                <CollectionLinkItem href={getRoomPath(`/students/${student.id}`)}>
                  {student.name}
                </CollectionLinkItem>
              )}
            </WithDocRefs>
          </Collection>
        </PropertyCollectionContents>
      </PropertyItem>
    </PropertySet>
  )
}
