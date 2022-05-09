import { useRouter } from 'next/router'
import { format } from 'date-fns'
import Link from 'next/link'

import { useGetSubjectPath } from '@/hooks/router'
import { useSubjectLessons } from '@/hooks/subjects'
import { useDeleteLessons } from '@/hooks/lessons'

import Card from '@/components/parts/Card'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Loading from '@/components/parts/Loading'
import Collection, { CollectionItem, CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

export default function ManageSubjectLessons () {
  const { query:{ roomId, subjectId } } = useRouter()

  const [selections, setSelections] = useState({})

  const getSubjectPath = useGetSubjectPath(roomId, subjectId)

  const {
    data: lessons,
    isSuccess,
    isLoading,
    error,
    mutate
  } = useSubjectLessons(roomId, subjectId)

  const [deleteLessons, {
    isSuccess: isDeleted,
  }] = useDeleteLessons(roomId)

  const sortedLessons = useMemo(() => {
    if (!lessons) return lessons

    return lessons.sort((a, b) => {
      const c = a.startedAt.toDate()
      const d = b.startedAt.toDate()
      if (c === d) return 0
      return c > d ? 1 : -1
    })
  }, [lessons])

  const isSomeChecked = useMemo(() => {
    return Object.values(selections).some(selected => selected)
  }, [selections])

  const isAllChecked = useMemo(() => {
    return Object.values(selections).every(selected => selected)
  }, [selections])

  const handleChangeAllCheckbox = useCallback(({ target: { checked } }) => {
    setSelections(lessons.reduce((selections,lesson) => ({
      ...selections,
      [lesson.id]: checked
    }), {}))
  }, [lessons])

  const handleDelete = useCallback(() => {
    deleteLessons(Object.keys(selections))
  }, [deleteLessons, selections])

  useEffect(() => {
    if (!lessons) return
    setSelections(lessons.reduce((selections,lesson) => ({
      ...selections,
      [lesson.id]: false
    }), {}))
  }, [lessons])

  useEffect(() => {
    if(!isDeleted) return
    toast.success('授業を削除しました')
    mutate([])
  }, [isDeleted, mutate])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業の一覧</FeatureTitle>
        <div>
          <LinkButton href={getSubjectPath('/lessons/new')}>授業を登録する</LinkButton>
        </div>
      </FeatureHead>
      {error && <ErrorAlert error={error} />}
      <Card>
        {isLoading && <Loading />}
        {isSuccess && (
          <Collection header={
            <div className="border-b px-2 bg-gray-50 rounded-t-lg flex justify-between items-center">
              <label className="block p-2">
                <input type="checkbox" onChange={handleChangeAllCheckbox} checked={isAllChecked} />
              </label>
              <div className="p-1">
                {isSomeChecked && <Button type="button" onClick={handleDelete} sm danger>削除</Button>}
              </div>
            </div>
          }>
            {sortedLessons.map(lesson => {
                const isChecked = !!selections[lesson.id]
                const handleChange = ({ target: { checked } }) => {
                  setSelections((s) => ({
                    ...s,
                    [lesson.id]: !s[lesson.id]
                  }))
                }

                return (
                  <CollectionItem key={lesson.id} isActive={isChecked}>
                    <div className="flex gap-2">
                      <label className="p-1 px-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleChange} />
                      </label>
                      <Link href={getSubjectPath(`/lessons/${lesson.id}`)}>
                        <a className="flex flex-grow items-center gap-2">
                          <div>{format(lesson.startedAt.toDate(), 'yyyy/MM/dd HH:mm')}</div>
                          <div>~</div>
                          <div>{format(lesson.finishedAt.toDate(), 'yyyy/MM/dd HH:mm')}</div>
                        </a>
                      </Link>

                    </div>
                  </CollectionItem>
                )
              }
            )}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
