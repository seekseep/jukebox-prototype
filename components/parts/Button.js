import classNames from 'classnames'
import { createElement } from 'react'

export default function Button ({
  primary = false,
  secondary = false,
  disabled = false,
  link = false,
  type = 'button'
}) {
  return createElement(type, {
    disabled,
    className: classNames('rounded px-2 py-1', {
      [primary]: 'bg-blue-500 text-white',
      [secondary]: 'bg-gray-100 text-gray-900',
      [link]: 'bg-transoarent text-blue-500',
      [disabled]: 'opacity-50'
    })
  })
}
