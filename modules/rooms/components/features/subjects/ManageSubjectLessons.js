import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toast } from 'react-toastify'

import { useSelectCollection } from '@/hooks/ui'

import Card from '@/components/parts/Card'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Suspension from '@/components/parts/Suspension'
import Collection, { CollectionItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'

import { useGetSubjectPath } from '@rooms/hooks/router'
import { useDeleteLessonsMutation, useSubjectLessonsQuery } from '@rooms/hooks/lessons'
import LessonCollectionItem from '@rooms/components/parts/lessons/LessonCollectionItem'

export default function ManageSubjectLessons () {
  const { query:{ roomId, subjectId } } = useRouter()
  const getSubjectPath = useGetSubjectPath(roomId, subjectId)

  const {
    selectedKeys,
    isAllSelected,
    isSomeSelected,
    setItems,
    setAll,
    getIsSelected,
    setItem,
  } = useSelectCollection()

  const result = useSubjectLessonsQuery(roomId, subjectId)

  const { data: lessons, mutate } = result

  const [deleteLessons, {
    isSuccess: isDeleted,
  }] = useDeleteLessonsMutation(roomId)

  const handleDelete = useCallback(() => deleteLessons(selectedKeys), [deleteLessons, selectedKeys])

  useEffect(() => {
    if (!lessons) return
    setItems(lessons.map(lesson => lesson.id), false)
  }, [lessons, setItems])

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
        {({ data: lessons }) => (
          <Card>
            <Collection
              header={
                <div className="border-b px-2 bg-gray-50 rounded-t-lg flex justify-between items-center">
                  <label className="block p-2">
                    <input type="checkbox" onChange={({ target: { checked } }) => setAll(checked)} checked={isAllSelected} />
                  </label>
                  <div className="p-1">
                    {isSomeSelected && (
                      <Button type="button" onClick={handleDelete} size="sm" color="danger">削除</Button>
                    )}
                  </div>
                </div>
              }>
              {lessons.map(lesson => (
                <CollectionItem key={lesson.id} isActive={getIsSelected(lesson.id)}>
                  <div className="flex gap-2">
                    <label className="p-1 px-2">
                      <input type="checkbox"
                        checked={getIsSelected(lesson.id)}
                        onChange={({ target: { checked } }) => setItem(lesson.id, checked)} />
                    </label>
                    <Link href={getSubjectPath(`/lessons/${lesson.id}`)} passHref>
                      <a className="flex grow">
                        <LessonCollectionItem lesson={lesson} roomId={roomId} />
                      </a>
                    </Link>
                  </div>
                </CollectionItem>
              ))}
            </Collection>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
