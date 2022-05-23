import PropertySet, {
  PropertyItem,
  PropertyLabel,
  PropertyContents
} from '@/components/parts/PropertySet'

export default function SchoolPropertySet ({ school }) {
  return (
    <PropertySet>
      <PropertyItem>
        <PropertyLabel>名称</PropertyLabel>
        <PropertyContents>{school.name}</PropertyContents>
      </PropertyItem>
    </PropertySet>
  )
}
