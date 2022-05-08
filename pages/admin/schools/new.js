import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useMemo, useCallback, useEffect } from 'react'

import { useGetAdminPath } from '@/hooks/admin'
import { useSchoolSchema, useCreateSchool } from '@/hooks/schools'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from '../../../components/parts/Breadcrumbs'
import Card from '../../../components/parts/Card'
import ErrorAlert from '../../../components/parts/ErrorAlert'
import { Button } from '../../../components/parts/buttons'
import { Form, Field } from '../../../components/parts/forms'

import AdminDashboard, { AdminDashboardSection,  AdminDashboardTitle } from '../../../components/parts/AdminDashboard'

export default function Schools () {
  const router = useRouter()
  const getAdminPath = useGetAdminPath()

  const [createSchool,{
    isSuccess: isCreated,
    error: creatingError,
  }] = useCreateSchool()

  const validationSchema = useSchoolSchema()
  const initialValues = useMemo(() => validationSchema.cast({}), [validationSchema])
  const handleSubmit = useCallback(school => createSchool(school), [createSchool])

  useEffect(() => {
    if (!isCreated) return
    toast.success('学校を登録しました')
    router.push(getAdminPath('/schools'))
  }, [getAdminPath, isCreated, router])

  return (
    <AdminDashboard title="学校の登録">
      <Breadcrumbs>
        <BLink href={getAdminPath('/')}>ホーム</BLink>
        <BLink href={getAdminPath('/schools')}>学校の一覧</BLink>
        <BCurrent>学校の登録</BCurrent>
      </Breadcrumbs>
      <AdminDashboardSection>
        <AdminDashboardTitle>学校の登録</AdminDashboardTitle>
        <Card>
          <div className="p-4">
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
              <Form>
                <Field name="name" label="学校名" placeholder="学校名" />
                {creatingError && <ErrorAlert error={creatingError} />}
                <div className="flex justify-end">
                  <Button type="submit">学校を登録する</Button>
                </div>
              </Form>
            </Formik>
          </div>
        </Card>
      </AdminDashboardSection>
    </AdminDashboard>
  )
}
