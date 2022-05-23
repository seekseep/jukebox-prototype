import classNames from 'classnames'
import { format } from 'date-fns'

export default function PropertySet ({ ...props }) {
  return <dl className="flex flex-col" {...props}/>
}

export function PropertyItem ({ ...props }) {
  return <div className="flex flex-row border-b gap-2 items-start" {...props} />
}

export function PropertyLabel ({ ...props }) {
  return <dt className="w-40 p-2 flex-shrink-0 text-gray-700"  {...props} />
}

export function PropertyContents ({ noPadding = false, ...props }) {
  return (
    <dd
      className={
        classNames(
          { 'p-2': !noPadding },
          'flex-grow flex flex-col justify-start items-stretch'
        )
      }
      {...props} />
  )
}

export function PropertyDateTimeContents({ value: date }) {
  return <PropertyContents>{date ? format(date, 'yyyy年MM月dd日 HH時mm分') : ''}</PropertyContents>
}

export function PropertyDateContents({ value: date }) {
  return <PropertyContents>{date ? format(date, 'yyyy年MM月dd日') : ''}</PropertyContents>
}

export function PropertyBooleanContents({ value = false, trueLabel = 'はい', falseLabel = 'いいえ' }) {
  return <PropertyContents>{value ? trueLabel : falseLabel}</PropertyContents>
}

export function PropertyCollectionContents({ children }) {
  return <PropertyContents noPadding>{children}</PropertyContents>
}
