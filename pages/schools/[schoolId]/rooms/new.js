import Head from 'next/head'
import { useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { useSchool } from '../../../../hooks/schools'

import { Button } from '../../../../components/parts/buttons'
import { Form, Field } from '../../../../components/parts/forms'
import SchoolNavigation from '../../../../components/parts/SchoolNavigation'
import { db } from '../../../../mocks/db'

export default function CreateRoom () {
  const router = useRouter()
  const { query: { schoolId } } = router
  const school = useSchool(schoolId)

  const validationSchema = useMemo(() => Yup.object().shape({
    name    : Yup.string().required().default(''),
    schoolId: Yup.string().required(),
  }), [])
  const initialValues = useMemo(() => validationSchema.cast({
    schoolId,
  }, { stripUnknown: true }), [schoolId, validationSchema])
  const onSubmit = useCallback(values => {
    const room = db.room.create({ ...values })
    router.replace(`/rooms/${room.id}`)
  }, [router])

  return (
    <>
      <Head>
        <title>教室の作成 | {school?.name}</title>
      </Head>
      <SchoolNavigation schoolId={schoolId} />
      <div className="max-w-2xl mx-auto py-12 px-4 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">教室の作成</h1>
        {schoolId && (
          <Formik {...{validationSchema, initialValues, onSubmit}}>
            {() => (
              <Form>
                <Field name="name" label="教室名" placeholder="教室名" />
                <div className="flex justify-end">
                  <Button type="submit">教室を作成する</Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  )
}
