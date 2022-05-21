import Link from 'next/link'
import classNames from 'classnames'

export default function Collection ({ children, header, placeholder = '項目が存在しません' }) {
  if (!children || children.length < 1) {
    return (
      <CollectionPlaceholder>{placeholder}</CollectionPlaceholder>
    )
  }

  const body = <ul className="flex flex-col py-2">{children}</ul>

  if (header)  {
    return (
      <div>
        {header}
        {body}
      </div>
    )
  }

  return body
}

export function CollectionItemContainer ({ isClickable = false, isActive = false, children, ...props }) {
  return (
    <li
      className={
        classNames(
          'border-b flex-row px-2 py-1',
          {
            'cursor-pointer hover:bg-gray-50 active:bg-gray-50': isClickable,
            'bg-white text-black'                              : !isActive,
            'bg-blue-50 text-blue-500'                         : isActive
          }
        )
      }
      {...props}>
        {children}
    </li>
  )
}

export function CollectionItem ({ isClickable = false, isActive = false, children, ...props }) {
  return (
    <CollectionItemContainer isClickable={isClickable} isActive={isActive} {...props}>
      {children}
    </CollectionItemContainer>
  )
}

export function CollectionLinkItem ({ href, ...props }) {
  return (
    <li className="border-b flex-row bg-white">
      <Link href={href} passHref>
        <a className="p-2 block hover:bg-gray-50 active:bg-gray-50" {...props} />
      </Link>
    </li>
  )
}

export function CollectionPlaceholder ({ ...props }) {
  return (
    <div className="py-12 px-4 text-gray-600 text-center" {...props} />
  )
}
