import Head from 'next/head'
import PrintCalendar from '@rooms/components/features/calendar/PrintCalendar'

export default function LessonsPrint () {
  return (
    <>
      <Head>
        <title>授業の印刷</title>
      </Head>
      <PrintCalendar />
    </>
  )
}
