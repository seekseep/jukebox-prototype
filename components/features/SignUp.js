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

import { useSignUp } from '../../hooks/auth'

import Card, { CardBody } from '../parts/Card'
import AuthorizeHeader from '../parts/AuthorizeHeader'
import ErrorAlert from '../parts/ErrorAlert'
import { Form, Field } from '../parts/forms'
import { Button } from '../parts/buttons'

export default function SignUp () {
  const router = useRouter()

  const [signUp, {
    data: user,
    isSuccess: isSignedUp,
    error
  }] = useSignUp()

  const validationSchema = useMemo(() => Yup.object().shape({
    email: Yup.string()
      .email(FORM_ERROR_EMAIL)
      .required(FORM_ERROR_REQUIRED)
      .default(''),
    name: Yup.string()
      .required(FORM_ERROR_REQUIRED)
      .max(64, FORM_ERROR_TOO_LONG)
      .default(''),
    password: Yup.string()
      .required(FORM_ERROR_REQUIRED)
      .max(8, FORM_ERROR_TOO_SHORT)
      .max(64, FORM_ERROR_TOO_LONG)
      .default(''),
  }), [])

  const initialValues = useMemo(() => validationSchema.cast({

  }, { stripUnknown: true }), [validationSchema])

  const handleSubmit = useCallback(({ email, password, name }) => {
    signUp(email, password, name)
  }, [signUp])

  useEffect(() => {
    if(!isSignedUp) return
    toast.success('アカウントを作成しました')
    router.push('/')
  }, [isSignedUp, router, user?.id])

  return (
    <>
      <Card>
        <CardBody>
          <AuthorizeHeader icon="👤" title="アカウント登録" />
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
              <Field label="名前" type="text" name="name" />
              <Field label="メールアドレス" type="text" name="email" />
              <Field label="パスワード" type="password" name="password" />
              {error && <ErrorAlert error={error} />}
              <Button type="submit">アカウントを登録する</Button>
            </Form>
          </Formik>
        </CardBody>
      </Card>
      <div className="flex justify-center py-4">
        <Link href="/">
          <a className="text-blue-500 underline">ログインする</a>
        </Link>
      </div>
    </>
  )
}
