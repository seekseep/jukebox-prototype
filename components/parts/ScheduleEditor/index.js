import { Provider } from './hooks'

import Navigation from './Navigation'
import Board from './Board'
import Deck from './Deck'

export default function ScheduleEditor ({
  schoolId,
  roomId,
  scheduleId
}) {
  return (
    <Provider schoolId={schoolId} roomId={roomId} scheduleId={scheduleId}>
      <Navigation />
      <Board />
      <Deck />
    </Provider>
  )
}
