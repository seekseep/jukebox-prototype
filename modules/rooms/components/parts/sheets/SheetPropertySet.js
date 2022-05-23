import PropertySet, {
  PropertyContents,
  PropertyItem, PropertyLabel
} from '@/components/parts/PropertySet'

export default function SheetPropertySet ({ sheet }) {
  return (
    <PropertySet>
      <PropertyItem>
        <PropertyLabel>名称</PropertyLabel>
        <PropertyContents>{sheet.name}</PropertyContents>
      </PropertyItem>
    </PropertySet>
  )
}
