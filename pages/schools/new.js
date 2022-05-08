import SimplePage from '@/components/parts/SimplePage'

import Authorized from '@/components/features/Authorized'
import RegisterSchool from '@/components/features/schools/RegisterSchool'
import ViewRegisterSchoolNavigation from '@/components/features/schools/ViewRegisterSchoolNavigation'

export default function NewSchool () {
  return (
    <Authorized>
      <SimplePage size="2xl">
        <ViewRegisterSchoolNavigation />
        <RegisterSchool />
      </SimplePage>
    </Authorized>
  )
}
