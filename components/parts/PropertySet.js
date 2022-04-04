import classNames from 'classnames'

export default function PropertySet ({ ...props }) {
  return <dl className="flex flex-col" {...props}/>
}

export function PropertyItem ({ ...props }) {
  return <div className="flex flex-row border-b gap-2 items-start" {...props} />
}

export function PropertyLabel ({ ...props }) {
  return <dt className="w-32 p-2 flex-shrink-0 text-gray-700"  {...props} />
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
