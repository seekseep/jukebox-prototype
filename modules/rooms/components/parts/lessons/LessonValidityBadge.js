import classNames from 'classnames'

import { LESSON_VALIDITY } from '@rooms/constants'

export default function LessonValidityBadge ({ validity }) {
  return (
    <div className={classNames(
      'rounded w-24 h-6 leading-6 text-center',
      {
        'bg-green-600 text-white border-green-700'   : validity === LESSON_VALIDITY.VALID,
        'bg-gray-100 text-gray-900 border-orange-600': validity === LESSON_VALIDITY.UNCERTAIN,
        'bg-orange-500 text-white border-orange-600' : validity === LESSON_VALIDITY.INVALID,
      }
    )}>
      {validity === LESSON_VALIDITY.VALID && '問題なし'}
      {validity === LESSON_VALIDITY.UNCERTAIN && '不確実'}
      {validity === LESSON_VALIDITY.INVALID && '問題あり'}
    </div>
  )
}
