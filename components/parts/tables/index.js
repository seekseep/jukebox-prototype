import classNames from 'classnames'

export function Table ({ className, ...props }) {
  return <table className={classNames(className, 'w-full text-sm')} {...props} />
}

export function Thead ({ className, ...props }) {
  return <thead className={classNames(className, '')} {...props} />
}

export function Tbody ({ className, ...props }) {
  return <tbody className={classNames(className, '')} {...props} />
}

export function Tfoot ({ className, ...props }) {
  return <tfoot className={classNames(className, '')} {...props} />
}

export function Tr ({ className, isClickable = false, ...props }) {
  return (
    <tr
      className={
        classNames(
          className,
          'border-b',
          {
            'hover:bg-gray-50 cursor-pointer': isClickable
          }
        )
      }
      {...props} />
  )
}

export function Th ({ className, ...props }) {
  return <th className={classNames(className, 'p-2')} {...props} />
}

export function Td ({ className, ...props }) {
  return <td className={classNames(className, 'p-2')} {...props} />
}
