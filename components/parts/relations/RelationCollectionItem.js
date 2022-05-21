import { WithDocRef } from '@/components/utilities/withDocRefs'
import RelationScoreLabel from '@/components/parts/relations/RelationScoreLabel'

export default function RelationCollectionItem ({
  relation,
}) {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex-grow">
        <WithDocRef docRef={relation.destination}>
          {({ data: account }) => (
            <div>{account.name}</div>
          )}
        </WithDocRef>
      </div>
      {relation.comment && (
        <div className="w-8 text-center" title={relation.comment}>💬</div>
      )}
      <RelationScoreLabel score={relation.score} />
    </div>
  )
}
