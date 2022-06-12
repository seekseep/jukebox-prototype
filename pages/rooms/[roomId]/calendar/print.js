import Head from 'next/head'
import PrintLessons from '@rooms/components/features/calendar/PrintLessons'

export default function LessonsPrint () {
  return (
    <>
      <Head>
        <title>授業の印刷</title>
      </Head>
      <PrintLessons />
    </>
  )
}
