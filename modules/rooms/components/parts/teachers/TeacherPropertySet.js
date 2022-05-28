import PropertySet, {
  PropertyContents,
  PropertyDateContents,
  PropertyItem, PropertyLabel
} from '@/components/parts/PropertySet'

import GenderLabel from '@rooms/components/parts/accounts/GenderLabel'

export default function TeacherPropertySet ({ teacher }) {
  return (
    <PropertySet>
      <PropertyItem>
        <PropertyLabel>名前</PropertyLabel>
        <PropertyContents>{teacher.name}</PropertyContents>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>生年月日</PropertyLabel>
        <PropertyDateContents value={teacher.bornedAt}/>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>性別</PropertyLabel>
        <PropertyContents>
          <GenderLabel gender={teacher.gender} />
        </PropertyContents>
      </PropertyItem>
    </PropertySet>
  )
}
