import PropertySet, {
  PropertyItem,
  PropertyLabel,
  PropertyContents
} from '@/components/parts/PropertySet'
import RelationScoreLabel from '@/components/parts/relations/RelationScoreLabel'
import RelationLabel from '@/components/parts/relations/RelationLabel'

export default function RelationPropertySet ({ relation }) {
  return (
    <PropertySet>
      <PropertyItem>
        <PropertyLabel>関係</PropertyLabel>
        <PropertyContents>
          <RelationLabel relation={relation} />
        </PropertyContents>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>関係性</PropertyLabel>
        <PropertyContents>
          <RelationScoreLabel score={relation.score} />
        </PropertyContents>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>コメント</PropertyLabel>
        <PropertyContents>{relation.comment}</PropertyContents>
      </PropertyItem>
    </PropertySet>
  )
}
