import Authorized from '@/components/features/Authorized'
import RegisterRoom from '@/components/features/rooms/RegisterRoom'
import ViewRegisterRoomNavigation from '@/components/features/rooms/ViewRegisterRoomNavigation'

import SimplePage from '@/components/parts/SimplePage'

export default function NewRoom () {
  return (
    <Authorized>
      <SimplePage size="2xl">
        <ViewRegisterRoomNavigation />
        <RegisterRoom />
      </SimplePage>
    </Authorized>
  )
}
