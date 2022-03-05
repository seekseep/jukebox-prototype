import { format } from 'date-fns'
import List, {
  KeyValueListItem as Item,
  KeyValueListItemKey as ItemKey,
  KeyValueListItemValue as ItemValue
} from '../KeyValueList'

export default function StudentPropertyList ({ student }) {
  return (
    <List>
      <Item>
        <ItemKey>氏名</ItemKey>
        <ItemValue>{student.name}</ItemValue>
      </Item>
      <Item>
        <ItemKey>生年月日</ItemKey>
        <ItemValue>
          {format(new Date(student.birthday), 'yyyy/MM/dd')}
        </ItemValue>
      </Item>
    </List>
  )
}
