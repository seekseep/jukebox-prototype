import SimplePage from '@/components/parts/SimplePage'

import Authorized from '@/components/features/Authorized'
import ManageSchool from '@/components/features/schools/ManageSchool'
import ManageSchoolRooms from '@/components/features/schools/ManageSchoolRooms'
import ViewSchoolNavigation from '@/components/features/schools/ViewSchoolNavigation'

export default function School () {
  return (
    <Authorized>
      <SimplePage size="2xl">
        <ViewSchoolNavigation />
        <ManageSchool />
        <ManageSchoolRooms />
      </SimplePage>
    </Authorized>
  )
}
