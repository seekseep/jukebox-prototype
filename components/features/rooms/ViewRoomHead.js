import Head from 'next/head'
import { useRoom } from '../../../hooks/rooms'

export default function ViewRoomHead ({ roomId }) {
  const room = useRoom(roomId)
  return (
    <Head>
      <title>{room?.name || '読込中'}</title>
    </Head>
  )
}
