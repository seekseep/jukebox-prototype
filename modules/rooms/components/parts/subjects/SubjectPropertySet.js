import PropertySet, {
  PropertyContents,
  PropertyItem, PropertyLabel
} from '@/components/parts/PropertySet'

export default function SubjectPropertySet ({ subject }) {
  return (
    <PropertySet>
      <PropertyItem>
        <PropertyLabel>名称</PropertyLabel>
        <PropertyContents>{subject.name}</PropertyContents>
      </PropertyItem>
    </PropertySet>
  )
}
