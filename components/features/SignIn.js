import { useCallback, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

import {
  FORM_ERROR_EMAIL,
  FORM_ERROR_REQUIRED,
  FORM_ERROR_TOO_SHORT,
  FORM_ERROR_TOO_LONG
} from '../../messages'

import { useSignIn } from '@/hooks/auth'

import Card, { CardBody } from '@/components/parts/Card'
import AuthorizeHeader from '@/components/parts/AuthorizeHeader'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, Field } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'

export default function SignIn () {
  const router = useRouter()

  const [signIn, {
    data: user,
    isSuccess: isSignedIn,
    error
  }] = useSignIn()

  const validationSchema = useMemo(() => Yup.object().shape({
    email: Yup.string()
      .email(FORM_ERROR_EMAIL)
      .required(FORM_ERROR_REQUIRED)
      .default('admin@jukebox.jp'),
    password: Yup.string()
      .required(FORM_ERROR_REQUIRED)
      .max(8, FORM_ERROR_TOO_SHORT)
      .max(64, FORM_ERROR_TOO_LONG)
      .default('password')
  }), [])

  const initialValues = useMemo(() => validationSchema.cast({

  }, { stripUnknown: true }), [validationSchema])

  const handleSubmit = useCallback(({ email, password }) => {
    signIn(email, password)
  }, [signIn])

  useEffect(() => {
    if(!isSignedIn) return
    toast.success('ログインしました')
    router.push('/')
  }, [isSignedIn, router, user?.id])

  return (
    <>
      <Card>
        <CardBody>
          <AuthorizeHeader icon="🔒" title="ログイン" />
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
              <Field label="メールアドレス" type="text" name="email" />
              <Field label="パスワード" type="password" name="password" />
              {error && <ErrorAlert error={error} />}
              <Button type="submit">ログインする</Button>
            </Form>
          </Formik>
        </CardBody>
      </Card>
      <div className="flex justify-center py-4">
        <Link href="/signup">
          <a className="text-blue-500 underline">アカウントを登録する</a>
        </Link>
      </div>
    </>
  )
}
