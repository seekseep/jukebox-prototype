import { WithDocRef } from '@/components/utilities/withDocRefs'

import PropertySet, {
  PropertyContents,
  PropertyItem, PropertyLabel
} from '@/components/parts/PropertySet'

export default function RolePropertySet ({ role }) {
  return (
    <PropertySet>
      <PropertyItem>
        <PropertyLabel>ユーザー名</PropertyLabel>
        <PropertyContents>
          <WithDocRef docRef={role.user}>
            {({ data: user }) => (
              <div>
                {user.name}
              </div>
            )}
          </WithDocRef>
        </PropertyContents>
      </PropertyItem>
    </PropertySet>
  )
}
