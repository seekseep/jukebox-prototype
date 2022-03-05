import List, {
  KeyValueListItem as Item,
  KeyValueListItemKey as ItemKey,
  KeyValueListItemValue as ItemValue
} from '../KeyValueList'

export default function LessonPropertyList ({ lesson }) {
  return (
    <List>
      <Item>
        <ItemKey>授業名</ItemKey>
        <ItemValue>{lesson.name}</ItemValue>
      </Item>
    </List>
  )
}
