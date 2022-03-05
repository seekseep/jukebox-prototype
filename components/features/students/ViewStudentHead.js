import Head from 'next/head'
import { useStudent } from '../../../hooks/students'

export default function ViewStudentHead ({ studentId }) {
  const student = useStudent(studentId)
  return (
    <Head>
      <title>{student?.name || '読込中'}</title>
    </Head>
  )
}
