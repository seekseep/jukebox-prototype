import List, {
  KeyValueListItem as Item,
  KeyValueListItemKey as Key,
  KeyValueListItemValue as Value
} from '../KeyValueList'

export default function SchoolPropertyList ({ school }) {
  return (
    <List>
      <Item>
        <Key>ID</Key>
        <Value>{school.id}</Value>
      </Item>
      <Item>
        <Key>名前</Key>
        <Value>{school.name}</Value>
      </Item>
    </List>
  )
}
