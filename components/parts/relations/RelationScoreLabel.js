import { useMemo } from 'react'
import { RELATION_SCORE } from '@/constatnts'
import classNames from 'classnames'

export default function RelationScoreLabel ({ score }) {
  const label = useMemo(() => {
    switch (score) {
      case RELATION_SCORE.BEST:
        return 'とても良い'
      case RELATION_SCORE.BETTER:
        return '良い'
      case RELATION_SCORE.NORMAL:
        return '普通'
      case RELATION_SCORE.WORTH:
        return '悪い'
      case RELATION_SCORE.WORST:
        return 'とても悪い'
      default:
        return '不明'
    }
  }, [score])

  return (
    <div className={classNames('rounded px-2 text-sm leading-1 text-center py-1 w-24', {
      'bg-green-600 text-white'  : score === RELATION_SCORE.BEST,
      'bg-green-400 text-white'  : score === RELATION_SCORE.BETTER,
      'bg-gray-100 text-gray-900': score === RELATION_SCORE.NORMAL,
      'bg-orange-400 text-white' : score === RELATION_SCORE.WORTH,
      'bg-orange-600 text-white' : score === RELATION_SCORE.WORST,
    })}>
      {label}
    </div>
  )
}
