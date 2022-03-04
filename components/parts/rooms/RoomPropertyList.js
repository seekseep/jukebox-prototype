import List, {
  KeyValueListItem as Item,
  KeyValueListItemKey as ItemKey,
  KeyValueListItemValue as ItemValue
} from '../KeyValueList'

export default function RoomPropertyList ({ room }) {
  return (
    <List>
      <Item>
        <ItemKey>教室名</ItemKey>
        <ItemValue>{room.name}</ItemValue>
      </Item>
    </List>
  )
}
