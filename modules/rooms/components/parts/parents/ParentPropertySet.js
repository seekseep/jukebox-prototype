import PropertySet, {
  PropertyContents,
  PropertyItem, PropertyLabel
} from '@/components/parts/PropertySet'

export default function ParentPropertySet ({ parent }) {
  return (
    <PropertySet>
      <PropertyItem>
        <PropertyLabel>名称</PropertyLabel>
        <PropertyContents>{parent.name}</PropertyContents>
      </PropertyItem>
    </PropertySet>
  )
}
