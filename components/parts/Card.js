import { forwardRef, createElement } from 'react'
import classNames from 'classnames'

const Card = forwardRef(function Card ({ type = 'div', elevation = 1, ...props }, ref) {
  return createElement(
    type,
    {
      className: classNames(
        'block bg-white rounded-lg border text-black w-full overflow-auto',
        {
          'shadow-sm' : elevation === 1,
          'shadow'    : elevation === 2,
          'shadow-md' : elevation === 3,
          'shadow-lg' : elevation === 4,
          'shadow-xl' : elevation === 5,
          'shadow-2xl': elevation === 6
        }
      ),
      ref,
      ...props
    }
  )
})

export default Card

export function CardActions ({ ...props }) {
  return <div className="border-b bg-gray-100 p-3 flex justify-end gap-3" {...props} />
}

export function CardBody ({ className, ...props }) {
  return <div className={classNames('m-2 p-2', className)} {...props} />
}

export function CardSection({ ...props }) {
  return <CardBody className="bg-gray-50 rounded" {...props} />
}
