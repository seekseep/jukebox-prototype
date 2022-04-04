import Head from 'next/head'
import { useMemo, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { db } from '../../mocks/db'

import Card from '../../components/parts/Card'
import { Button } from '../../components/parts/buttons'
import { Field, Form } from '../../components/parts/forms'

export default function Schools () {
  const router = useRouter()

  const validationSchema = useMemo(() => Yup.object().shape({
    id      : Yup.string().required().default(''),
    password: Yup.string().required(),
  }), [])
  const initialValues = useMemo(() => validationSchema.cast({
    id      : 'jukeeee',
    password: 'password'
  }, { stripUnknown: true }), [validationSchema])
  const onSubmit = useCallback(() => {
    router.replace(`/schools/${db.school.getAll()[0].id}`)
  }, [router])

  return (
    <>
      <Head>
        <title>学校用ログイン | JUKEBOX</title>
      </Head>
      <div className="w-full min-h-screen bg-gray-50">
        <div className="max-w-sm py-32 px-1 mx-auto flex flex-col gap-4">
          <Card>
            <div className="flex flex-col px-3 py-4 gap-4">
              <div className="flex flex-col justify-center gap-5 items-center">
                <div className="text-5xl leading-none">🏫</div>
                <div className="text-lg font-bold leading-none">学校用ログイン</div>
              </div>
              <Formik {...{ initialValues, validationSchema, onSubmit }}>
              {() => (
                  <Form>
                    <Field name="id" label="講師ID" placeholder="講師ID" />
                    <Field name="password" label="パスワード" placeholder="パスワード" type="password" />
                    <Button type="submit">ログイン</Button>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
          <div className="flex justify-center py-4">
            <Link href="/families">
              <a className="text-blue-500 underline">保護者の方はこちら</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
