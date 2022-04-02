import Link from 'next/link'
import { useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { db } from '../../../../mocks/db'

import { useGetRoomLink } from '../../../../hooks/rooms'
import { useStudentsByRoomId } from '../../../../hooks/students'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from '../../../../components/parts/Breadcrumbs'
import RoomDashboard from '../../../../components/parts/RoomDashboard'
import { Form, Field } from '../../../../components/parts/forms'
import { Button } from '../../../../components/parts/buttons'


export default function Students () {
  const router = useRouter()
  const { query: { roomId }} = router

  const getRoomLink = useGetRoomLink(roomId)

  const validationSchema = useMemo(() => Yup.object().shape({
    name  : Yup.string().required().default(''),
    roomId: Yup.string().required(),
  }), [])
  const initialValues = useMemo(() => validationSchema.cast({
    roomId,
  }, { stripUnknown: true }), [roomId, validationSchema])
  const onSubmit = useCallback(values => {
    const student = db.student.create({ ...values })
    router.replace(getRoomLink(`/students/${student.id}`))
  }, [getRoomLink, router])

  return (
    <RoomDashboard roomId={roomId}>
      <Breadcrumbs>
        <BLink href={getRoomLink('/')}>ホーム</BLink>
        <BLink href={getRoomLink('/students')}>生徒の一覧</BLink>
        <BCurrent>生徒の登録</BCurrent>
      </Breadcrumbs>
      <section className="px-4 flex flex-col gap-4">
        <h1 className="text-3xl py-2 text-gray-700">生徒の登録</h1>
        <div className="bg-white rounded border shadow-lg p-4">
          {roomId && (
            <Formik {...{ initialValues, validationSchema, onSubmit }}>
              {() => (
                <Form>
                  <Field name="name" label="氏名" placeholder="生徒の名前" />
                  <div className="flex justify-end">
                    <Button type="submit">生徒を登録する</Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </section>
    </RoomDashboard>
  )
}
