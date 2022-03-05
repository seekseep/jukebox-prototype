import Head from 'next/head'
import { useTeacher } from '../../../hooks/teachers'

export default function ViewTeacherHead ({ teacherId }) {
  const teacher = useTeacher(teacherId)
  return (
    <Head>
      <title>{teacher?.name || '読込中'}</title>
    </Head>
  )
}
