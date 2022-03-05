import Head from 'next/head'
import { useLesson } from '../../../hooks/lessons'

export default function ViewLessonHead ({ lessonId }) {
  const lesson = useLesson(lessonId)

  return (
    <Head>
      <title>{lesson?.name || '読込中'}</title>
    </Head>
  )
}
