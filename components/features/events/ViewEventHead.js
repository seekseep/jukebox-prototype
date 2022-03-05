import Head from 'next/head'
import { useEvent } from '../../../hooks/events'

export default function ViewEventHead ({ eventId }) {
  const event = useEvent(eventId)
  return (
    <Head>
      <title>{event?.name || '読込中'}</title>
    </Head>
  )
}
