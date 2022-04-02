import { createElement  } from 'react'
import classNames from "classnames"

export default function Card ({ type="div", elevation = 1, ...props }) {
  return createElement(
    type,
    {
      className: classNames(
        "block bg-white rounded-lg border overflow-hidden",
        {
          "shadow-sm": elevation === 1,
          "shadow": elevation === 2,
          "shadow-md":elevation === 3,
          "shadow-lg":elevation === 4,
          "shadow-xl":elevation === 5,
          "shadow-2xl": elevation === 6
        }
      ),
      ...props
    }
  )
}

export function CardActions ({ ...props }) {
  return <div className="border-b bg-gray-100 p-3 flex justify-end" {...props} />
}
