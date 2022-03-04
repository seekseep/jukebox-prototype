import Head from "next/head";
import { useSchool } from '../../../hooks/schools'

export default function ViewSchoolsHead ({ schoolId }) {
  const school = useSchool(schoolId)

  return (
    <Head>
      <title>{school?.name || "読込中"}</title>
    </Head>
  )
}
