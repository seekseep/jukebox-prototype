import PropertySet, {
  PropertyItem,
  PropertyLabel,
  PropertyContents
} from '@/components/parts/PropertySet'

export default function UserPropertySet ({ user }) {
  return (
    <PropertySet>
      <PropertyItem>
        <PropertyLabel>名前</PropertyLabel>
        <PropertyContents>{user.name}</PropertyContents>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>ID</PropertyLabel>
        <PropertyContents>{user.id}</PropertyContents>
      </PropertyItem>
    </PropertySet>
  )
}
