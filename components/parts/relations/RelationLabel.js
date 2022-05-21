import { WithDocRef } from '@/components/utilities/withDocRefs'
export default function RelationLabel ({ relation }) {
  return (
    <div className="flex gap-2">
      <WithDocRef docRef={relation.departure}>
        {({ data: departureAccount }) => (<div>{departureAccount.name}</div>)}
      </WithDocRef>
      <div>👉</div>
      <WithDocRef docRef={relation.destination}>
        {({ data: destinationAccount }) => (<div>{destinationAccount.name}</div>)}
      </WithDocRef>
    </div>
  )
}
