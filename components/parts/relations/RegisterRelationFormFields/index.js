import RelationScoreSelectField from '@/components/parts/relations/RelationScoreSelectField'
import { Field, SelectField } from '@/components/parts/forms'

export default function RegisterRelationFormFields({ accounts }) {
  const accountOptions = useAccountOptions(accounts)

  return (
    <>
      <div className="flex gap-2">
        <SelectField
          name="destination" label="アカウント" placeholder="アカウント"
          options={accountOptions} />
        <RelationScoreSelectField
          name="score"
          label="関係性" placeholder="関係性" />
      </div>
      <Field
        name="comment" type="textarea" rows={10}
        label="コメント" placeholder="コメント" />
    </>
  )
}
