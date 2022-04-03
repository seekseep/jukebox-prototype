import { Provider } from './hooks'

import Navigation from './Navigation'
import Board from './Board'
import Deck from './Deck'

export default function ScheduleEditor ({ roomId, scheduleId }) {
  return (
    <Provider roomId={roomId} scheduleId={scheduleId}>
      <Navigation />
      <Board />
      <Deck />
    </Provider>
  )
}
