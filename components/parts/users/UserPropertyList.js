import List, {
  KeyValueListItem as Item,
  KeyValueListItemKey as ItemKey,
  KeyValueListItemValue as ItemValue
} from '../KeyValueList'

export default function UserPropertyList ({ user }) {
  return (
    <List>
      <Item>
        <ItemKey>氏名</ItemKey>
        <ItemValue>{user.name}</ItemValue>
      </Item>
    </List>
  )
}
