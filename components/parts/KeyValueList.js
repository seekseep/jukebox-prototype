import classNames from 'classnames'

import List from './List'

export default function KeyValueList ({ children }) {
  return <List>{children}</List>
}

export function KeyValueListItem ({ className = '', ...props }) {
  return <div className={classNames(className, 'flex flex-row border-b items-start')} {...props} />
}

export function KeyValueListItemKey ({ className, children }) {
  return (
    <div className={classNames(className, 'p-2 w-2/5')}>{children}</div>
  )
}

export function KeyValueListItemValue ({ className, children }) {
  return (
    <div className={classNames(className, 'p-2 w-3/5')}>{children}</div>
  )
}
