import RelationScoreSelectField from '@/components/parts/relations/RelationScoreSelectField'
import { Field } from '@/components/parts/forms'

export default function UpdateRelationFormFields() {
  return (
    <>
      <RelationScoreSelectField
        name="score"
        label="関係性" placeholder="関係性" />
      <Field
        name="comment" type="textarea" rows={10}
        label="コメント" placeholder="コメント" />
    </>
  )
}
