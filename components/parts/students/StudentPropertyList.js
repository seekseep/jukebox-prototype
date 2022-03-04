import List, {
  KeyValueListItem as Item,
  KeyValueListItemKey as ItemKey,
  KeyValueListItemValue as ItemValue
} from '../KeyValueList'

export default function StudentBasicPropertyList ({ student }) {
  return (
    <List>
      <Item>
        <ItemKey>氏名</ItemKey>
        <ItemValue>{`${student.lastName} ${student.firstName}`}</ItemValue>
      </Item>
      <Item>
        <ItemKey>氏名（カナ）</ItemKey>
        <ItemValue>{`${student.lastNameKana} ${student.firstNameKana}`}</ItemValue>
      </Item>
      <Item>
        <ItemKey>所属学校</ItemKey>
        <ItemValue>{student.school}</ItemValue>
      </Item>
      <Item>
        <ItemKey>生年月日</ItemKey>
        <ItemValue>{student.bithday}</ItemValue>
      </Item>
    </List>
  )
}
