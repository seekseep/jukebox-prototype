import { RELATION_SCORE } from '@/constatnts'
import { SelectField } from '../forms'

export const RELATION_SCORE_OPTIONS = [{
  value: RELATION_SCORE.BEST,
  label: 'とても良い'
}, {
  value: RELATION_SCORE.BETTER,
  label: '良い'
}, {
  value: RELATION_SCORE.NORMAL,
  label: '普通'
}, {
  value: RELATION_SCORE.WORSE,
  label: '悪い'
}, {
  value: RELATION_SCORE.WORST,
  label: 'とても悪い'
}]

export default function RelationScoreSelectField (props) {
  return <SelectField options={RELATION_SCORE_OPTIONS} {...props} />
}
