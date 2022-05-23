import { Field } from '@/components/parts/forms'

export default function SignUpFormFields () {
  return (
    <>
      <Field label="名前" type="text" name="name" />
      <Field label="メールアドレス" type="text" name="email" />
      <Field label="パスワード" type="password" name="password" />
    </>
  )
}
