import PropertySet, {
  PropertyContents,
  PropertyItem, PropertyLabel
} from '@/components/parts/PropertySet'

export default function RoomPropertySet ({ room }) {
  return (
    <PropertySet>
      <PropertyItem>
        <PropertyLabel>名称</PropertyLabel>
        <PropertyContents>{room.name}</PropertyContents>
      </PropertyItem>
    </PropertySet>
  )
}
