import Head from 'next/head'
import { useRouter } from 'next/router'

import { Button } from '../../../../../components/parts/buttons'
import Card, { CardActions } from '../../../../../components/parts/Card'
import Collection, { CollectionItem, CollectionLinkItem, CollectionPlaceholder } from '../../../../../components/parts/Collection'

import RoomDashboard, { RoomDashboardSection } from '../../../../../components/parts/RoomDashboard'
import TeacherHeader from '../../../../../components/parts/TeacherHeader'
import { useGetRoomLink } from '../../../../../hooks/rooms'
import { useState } from 'react'
import { useTeacher } from '../../../../../hooks/teachers'
import { useSubjectsByRoomIdAndSubjectTagName } from '../../../../../hooks/subjects'

export default function Subjects () {
  const router = useRouter()
  const { query: { roomId, teacherId  } } = router

  const getRoomLink = useGetRoomLink(roomId)

  const teacher = useTeacher(teacherId)
  const [currentTagName, setCurrentTagName] = useState(null)
  const subjects = useSubjectsByRoomIdAndSubjectTagName(roomId, currentTagName)

  return (
    <>
      <Head>
        <title>指導可能科目 | 講師</title>
      </Head>
      <RoomDashboard roomId={roomId}>
        <TeacherHeader roomId={roomId} teacherId={teacherId} />
        <RoomDashboardSection>
          <Card>
            <CardActions>
              <Button sm>指導可能科目分類を登録する</Button>
            </CardActions>
            <div className="flex">
              <div className="w-48 flex-shrink-0 border-r-2">
                <div className="bg-gray-50 border-b px-4 py-2 h-12 flex items-center">
                  <div>科目分類</div>
                </div>
                <Collection>
                  {(teacher && teacher.subjectTags.length > 0) ? teacher.subjectTags.map(tagName =>
                    <CollectionItem
                      key={tagName} onClick={() => setCurrentTagName(tagName)}
                      isActive={tagName === currentTagName} clickable>
                      {tagName}
                    </CollectionItem>
                  ) : (
                    <CollectionPlaceholder>
                      履修科目が登録されていません
                    </CollectionPlaceholder>
                  )}
                </Collection>
              </div>
              <div className="flex-grow">
                {currentTagName ? (
                  <>
                    <div className="bg-gray-50 border-b px-4 py-2 h-12 flex items-center">
                      <div>{currentTagName}の科目</div>
                    </div>
                    <div className="h-[21rem] overflow-scroll">
                      <Collection>
                        {subjects && subjects.length > 0 ? (
                          subjects.map(subject =>
                            <CollectionLinkItem key={subject.id} href={getRoomLink(`/subjects/${subject.id}`)}>
                              {subject.name}
                            </CollectionLinkItem>
                          )
                        ) : (
                          <CollectionPlaceholder>
                            科目が存在しません
                          </CollectionPlaceholder>
                        )}
                      </Collection>
                    </div>
                  </>
                ) : (
                  <div className="h-96 flex flex-col items-center justify-center">
                    <div className="text-gray-500">科目分類を選択してください</div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </RoomDashboardSection>
      </RoomDashboard>
    </>
  )
}
