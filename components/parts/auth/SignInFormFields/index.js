import { Field } from '@/components/parts/forms'

export default function SignInFormFields () {
  return (
    <>
      <Field label="メールアドレス" type="text" name="email" />
      <Field label="パスワード" type="password" name="password" />
    </>
  )
}
