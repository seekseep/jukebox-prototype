import List, {
  KeyValueListItem as Item,
  KeyValueListItemKey as ItemKey,
  KeyValueListItemValue as ItemValue
} from '../KeyValueList'

export default function TeacherPropertyList ({ teacher }) {
  return (
    <List>
      <Item>
        <ItemKey>氏名</ItemKey>
        <ItemValue>{teacher.name}</ItemValue>
      </Item>
    </List>
  )
}
