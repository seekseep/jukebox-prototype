import Head from 'next/head'
import { useRouter } from 'next/router'

import { useStudent } from '../../../../../hooks/students'

import Card, { CardActions } from '../../../../../components/parts/Card'
import PropertySet, { PropertyItem, PropertyLabel, PropertyContents } from '../../../../../components/parts/PropertySet'
import { Button } from '../../../../../components/parts/buttons'
import RoomDashboard, { RoomDashboardSection } from '../../../../../components/parts/RoomDashboard'
import StudentHeader from '../../../../../components/parts/StudentHeader'

export default function Student () {
  const router = useRouter()
  const { query: { roomId, studentId  } } = router

  const student = useStudent(studentId)

  return (
    <>
      <RoomDashboard roomId={roomId} title="生徒 > 基本情報">
        <StudentHeader roomId={roomId} studentId={studentId} />
        <RoomDashboardSection>
          {student && (
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
                    {student.name}
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
