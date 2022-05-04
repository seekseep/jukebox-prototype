import Authorized from '../../components/features/Authorized'
import ManageSchools from '../../components/features/schools/ManageSchools'
import ViewSchoolsNavigation from '../../components/features/schools/ViewSchoolsNavigation'

import SimplePage from '../../components/parts/SimplePage'

export default function Schools () {
  return (
    <Authorized>
      <SimplePage size="2xl">
        <ViewSchoolsNavigation />
        <ManageSchools />
      </SimplePage>
    </Authorized>
  )
}
