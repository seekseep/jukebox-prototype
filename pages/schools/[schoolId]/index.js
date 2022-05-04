import Authorized from '../../../components/features/Authorized'
import ManageSchool from '../../../components/features/schools/ManageSchool'
import ManageRooms from '../../../components/features/rooms/ManageRooms'
import ViewSchoolNavigation from '../../../components/features/schools/ViewSchoolNavigation'

import SimplePage from '../../../components/parts/SimplePage'

export default function School () {
  return (
    <Authorized>
      <SimplePage size="2xl">
        <ViewSchoolNavigation />
        <ManageSchool />
        <ManageRooms />
      </SimplePage>
    </Authorized>
  )
}
