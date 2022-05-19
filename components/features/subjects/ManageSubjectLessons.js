import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toast } from 'react-toastify'

import { useSelectCollection } from '@/hooks/ui'
import { useGetSubjectPath } from '@/hooks/router'
import { useSubjectLessonRefs, useDeleteLessons } from '@/hooks/lessons'

import { WithDocRefs } from '@/components/utilities/withDocRefs'

import Card from '@/components/parts/Card'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Suspension from '@/components/parts/Suspension'
import Collection, { CollectionItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import LessonCollectionItem from '@/components/parts/lessons/LessonCollectionItem'

export default function ManageSubjectLessons () {
  const { query:{ roomId, subjectId } } = useRouter()
  const getSubjectPath = useGetSubjectPath(roomId, subjectId)

  const {
    selectedKeys,
    isAllSelected,
    isSomeSelected,
    setKeys,
    setAll,
    getIsSelected,
    setItem,
  } = useSelectCollection()

  const {
    data: lessonDocRefs,
    mutate,
    ...result
  } = useSubjectLessonRefs(roomId, subjectId)

  const [deleteLessons, {
    isSuccess: isDeleted,
  }] = useDeleteLessons(roomId)

  const handleDelete = useCallback(() => deleteLessons(selectedKeys), [deleteLessons, selectedKeys])

  useEffect(() => {
    if (!lessonDocRefs) return
    setKeys(lessonDocRefs.map(doc => doc.id), false)
  }, [lessonDocRefs, setKeys])

  useEffect(() => {
    if(!isDeleted) return
    toast.success('授業を削除しました')
    mutate()
  }, [isDeleted, mutate])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業の一覧</FeatureTitle>
        <div>
          <LinkButton href={getSubjectPath('/lessons/new')}>授業を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            <Collection header={
              <div className="border-b px-2 bg-gray-50 rounded-t-lg flex justify-between items-center">
                <label className="block p-2">
                  <input type="checkbox" onChange={({ target: { checked } }) => setAll(checked)} checked={isAllSelected} />
                </label>
                <div className="p-1">
                  {isSomeSelected && <Button type="button" onClick={handleDelete} sm danger>削除</Button>}
                </div>
              </div>
            }>
              {lessonDocRefs.length > 0 && (
                <WithDocRefs docRefs={lessonDocRefs}>
                  {({ data: lesson }) => (
                    <CollectionItem isActive={getIsSelected(lesson.id)}>
                      <div className="flex gap-2">
                        <label className="p-1 px-2">
                          <input type="checkbox"
                            checked={getIsSelected(lesson.id)}
                            onChange={({ target: { checked } }) => setItem(lesson.id, checked)} />
                        </label>
                        <Link href={getSubjectPath(`/lessons/${lesson.id}`)} passHref>
                          <a className="flex flex-grow">
                            <LessonCollectionItem lesson={lesson} />
                          </a>
                        </Link>
                      </div>
                    </CollectionItem>
                  )}
                </WithDocRefs>
              )}
          </Collection>
        </Card>
        )}
      </Suspension>
    </Feature>
  )
}
