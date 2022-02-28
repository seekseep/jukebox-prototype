import { useCurrentRoomId } from "../hooks/rooms"

import Dashboard, { DashboardMain } from "./Dashboard"
import MenuItem from "./MenuItem"

export default function OwnerDashboard ({ children }) {
  const roomId = useCurrentRoomId()

  return (
    <Dashboard>
      <div className="w-56 border-r flex-shrink-0 flex flex-col">
        <div className="flex-grow pt-16">
          <MenuItem href={`/rooms/${roomId}`}>
            教室
          </MenuItem>
          <MenuItem href={`/rooms/${roomId}/students`}>
            生徒
          </MenuItem>
          <MenuItem href={`/rooms/${roomId}/teachers`}>
            講師
          </MenuItem>
          <MenuItem href={`/rooms/${roomId}/lessons`}>
            授業
          </MenuItem>
          <MenuItem href={`/rooms/${roomId}/interviews`}>
            面談
          </MenuItem>
        </div>
        <div>
          <MenuItem href={`/`}>
            教室一覧
          </MenuItem>
        </div>
      </div>
      <DashboardMain>
        {children}
      </DashboardMain>
    </Dashboard>
  )
}
