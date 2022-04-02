import Head from 'next/head'
import { useRouter } from 'next/router'

import { useTeacher } from '../../../../../hooks/teachers'

import Card, { CardActions } from '../../../../../components/parts/Card'
import PropertySet, { PropertyItem, PropertyLabel, PropertyContents } from '../../../../../components/parts/PropertySet'
import { Button } from '../../../../../components/parts/buttons'
import RoomDashboard, { RoomDashboardSection } from '../../../../../components/parts/RoomDashboard'
import TeacherHeader from '../../../../../components/parts/TeacherHeader'

export default function Teacher () {
  const router = useRouter()
  const { query: { roomId, teacherId  }} = router

  const teacher = useTeacher(teacherId)

  return (
    <>
      <Head>
        <title>基本情報 | 生徒</title>
      </Head>
      <RoomDashboard roomId={roomId}>
        <TeacherHeader teacherId={teacherId} />
        <RoomDashboardSection>
          {teacher && (
            <Card>
              <CardActions>
                <Button sm secondary>編集する</Button>
              </CardActions>
              <PropertySet>
                <PropertyItem>
                  <PropertyLabel>
                    氏名
                  </PropertyLabel>
                  <PropertyContents>
                    {teacher.name}
                  </PropertyContents>
                </PropertyItem>
              </PropertySet>
            </Card>
          )}
        </RoomDashboardSection>
      </RoomDashboard>
    </>
  )
}
