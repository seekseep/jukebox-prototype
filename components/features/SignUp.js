import { useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

import { ICON } from '@/constatnts'

import Card, { CardBody } from '@/components/parts/Card'
import AuthorizeHeader from '@/components/parts/AuthorizeHeader'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'

import { useSignUpMutation } from '@/hooks/auth'
import { useValidationSchema, useInitialValues, useValuesToReult } from '@/components/parts/auth/SignUpFormFields/hooks'
import SignUpFormFields from '@/components/parts/auth/SignUpFormFields'

export default function SignIn () {
  const router = useRouter()

  const [signUp, {
    isLoading: isSigningUp,
    isSuccess: isSignedUp,
    error: signingUpError
  }] = useSignUpMutation()

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues()
  const valuesToResult = useValuesToReult()
  const handleSubmit = useCallback((values) => signUp(valuesToResult(values)), [signUp, valuesToResult])

  useEffect(() => {
    if(!isSignedUp) return
    toast.success('アカウントを作成しました')
    router.push('/')
  }, [isSignedUp, router])

  return (
    <>
      <Card>
        <CardBody>
          <AuthorizeHeader icon={ICON.USER} title="アカウント作成" />
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isValid }) => (
              <Form>
                <SignUpFormFields />
                <ErrorAlert error={signingUpError} />
                <FormActions>
                  <Button disabled={!isValid || isSigningUp } type="submit">アカウントを作成する</Button>
                </FormActions>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
      <div className="flex justify-center py-4">
        <Link href="/signin">
          <a className="text-blue-500 underline">ログインする</a>
        </Link>
      </div>
    </>
  )
}
