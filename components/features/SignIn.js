import { useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

import Card, { CardBody } from '@/components/parts/Card'
import AuthorizeHeader from '@/components/parts/AuthorizeHeader'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'

import { useSignInMutation } from '@/hooks/auth'
import { useValidationSchema, useInitialValues, useValuesToReult } from '@/components/parts/auth/SignInFormFields/hooks'
import SignInFormFields from '@/components/parts/auth/SignInFormFields'

export default function SignIn () {
  const router = useRouter()

  const [signIn, {
    isLoading: isSigningIn,
    isSuccess: isSignedIn,
    error: signingInError
  }] = useSignInMutation()

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues()
  const valuesToResult = useValuesToReult()
  const handleSubmit = useCallback((values) => signIn(valuesToResult(values)), [signIn, valuesToResult])

  useEffect(() => {
    if(!isSignedIn) return
    toast.success('ログインしました')
    router.push('/')
  }, [isSignedIn, router])

  return (
    <>
      <Card>
        <CardBody>
          <AuthorizeHeader icon="🔒" title="ログイン" />
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isValid }) => (
              <Form>
                <SignInFormFields />
                <ErrorAlert error={signingInError} />
                <FormActions>
                  <Button disabled={!isValid || isSigningIn } type="submit">ログインする</Button>
                </FormActions>
              </Form>
            )}
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
