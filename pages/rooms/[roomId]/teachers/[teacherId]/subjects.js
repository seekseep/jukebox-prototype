import Head from 'next/head'
import { useRouter } from "next/router";

import { useSubjectGroupsByTeacherId } from '../../../../../hooks/subjectGroups'

import { Button } from '../../../../../components/parts/buttons'
import Card, { CardActions } from "../../../../../components/parts/Card";
import Collection, { CollectionItem, CollectionLinkItem, CollectionPlaceholder } from "../../../../../components/parts/Collection";

import RoomDashboard, { RoomDashboardSection} from "../../../../../components/parts/RoomDashboard";
import TeacherHeader from '../../../../../components/parts/TeacherHeader'
import { useGetRoomLink } from "../../../../../hooks/rooms";
import { useState } from 'react';

export default function Subjects () {
  const router = useRouter()
  const { query: { roomId, teacherId  }} = router

  const getRoomLink = useGetRoomLink(roomId)
  const subjectGroups = useSubjectGroupsByTeacherId(teacherId)
  const [currentSubjectGroup, setCurrentSubjectGroup] = useState(null)

  return (
    <>
      <Head>
        <title>指導可能科目 | 講師</title>
      </Head>
      <RoomDashboard roomId={roomId}>
        <TeacherHeader teacherId={teacherId} />
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
                  {subjectGroups?.length > 0 ? subjectGroups.map(subjectGroup =>
                    <CollectionItem
                      key={subjectGroup.id} onClick={() => setCurrentSubjectGroup(subjectGroup)}
                      isActive={currentSubjectGroup?.id === subjectGroup.id} clickable>
                      {subjectGroup.name}
                    </CollectionItem>
                  ) : (
                    <CollectionPlaceholder>
                      履修科目が登録されていません
                    </CollectionPlaceholder>
                  )}
                </Collection>
              </div>
              <div className="flex-grow">
                {currentSubjectGroup ? (
                  <>
                    <div className="bg-gray-50 border-b px-4 py-2 h-12 flex items-center">
                      <div>{currentSubjectGroup.name}の科目</div>
                    </div>
                    <div className="h-[21rem] overflow-scroll">
                      <Collection>
                        {currentSubjectGroup.subjects && currentSubjectGroup.subjects.length > 0 ? (
                          currentSubjectGroup.subjects.map(subject =>
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
