import { Field } from '@/components/parts/forms'

import RelationScoreSelectField from '@rooms/components/parts/relations/RelationScoreSelectField'
import RelationLabel from '@rooms/components/parts/relations//RelationLabel'

export default function UpdateRelationFormFields({ relation }) {
  return (
    <>
      {relation && (
        <div className="py-2">
          <RelationLabel relation={relation} />
        </div>
      )}
      <RelationScoreSelectField
        name="score"
        label="関係性" placeholder="関係性" />
      <Field
        name="comment" type="textarea" rows={10}
        label="コメント" placeholder="コメント" />
    </>
  )
}
