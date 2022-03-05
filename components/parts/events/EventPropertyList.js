import { format } from 'date-fns'
import List, {
  KeyValueListItem as Item,
  KeyValueListItemKey as ItemKey,
  KeyValueListItemValue as ItemValue
} from '../KeyValueList'

export default function EventPropertyList ({ event }) {
  return (
    <List>
      <Item>
        <ItemKey>授業名</ItemKey>
        <ItemValue>{event.name}</ItemValue>
      </Item>
      <Item>
        <ItemKey>状態</ItemKey>
        <ItemValue>{event.status}</ItemValue>
      </Item>
      <Item>
        <ItemKey>開始日時</ItemKey>
        <ItemValue>
          {format(new Date(event.startedAt), 'yyyy/MM/dd HH:mm')}
        </ItemValue>
      </Item>
      <Item>
        <ItemKey>終了日時</ItemKey>
        <ItemValue>
          {format(new Date(event.finishedAt), 'yyyy/MM/dd HH:mm')}
        </ItemValue>
      </Item>
    </List>
  )
}
