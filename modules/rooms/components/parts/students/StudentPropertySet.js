import PropertySet, {
  PropertyContents,
  PropertyDateContents,
  PropertyItem, PropertyLabel
} from '@/components/parts/PropertySet'

import GenderLabel from '@rooms/components/parts/accounts/GenderLabel'

export default function StudentPropertySet ({ student }) {
  return (
    <PropertySet>
      <PropertyItem>
        <PropertyLabel>氏名</PropertyLabel>
        <PropertyContents>{student.name}</PropertyContents>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>生年月日</PropertyLabel>
        <PropertyDateContents value={student.bornedAt}/>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>性別</PropertyLabel>
        <PropertyContents>
          <GenderLabel gender={student.gender} />
        </PropertyContents>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>学校名</PropertyLabel>
        <PropertyContents>{student.schoolName}</PropertyContents>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>学年</PropertyLabel>
        <PropertyContents>{student.schoolGrade}</PropertyContents>
      </PropertyItem>
    </PropertySet>
  )
}
