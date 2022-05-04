import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { add, format } from 'date-fns'
import locale from 'date-fns/locale/ja'

import { useGetFamilyPath } from '../../../../hooks/families'
import { useStudent } from '../../../../hooks/students'

import FamilyDashboard, {
  FamilyDashboardTitle,
  FamilyDashboardSection,
  FamilyDashboardSectionTitle,
} from '../../../../components/parts/FamilyDashboard'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from '../../../../components/parts/Breadcrumbs'
import Card from '../../../../components/parts/Card'
import { Select } from '../../../../components/parts/forms'
import Collection, {
  CollectionItem,
  CollectionPlaceholder
} from '../../../../components/parts/Collection'

const LESSON_FILTER_TYPE = Object.freeze({
  ALL         : 'ALL',
  NOT_COMPLETD: 'NOT_COMPLETED'
})

const subjects =[]

export default function Student () {
  const { query: { familyId, studentId } } = useRouter()
  const getFamilyPath = useGetFamilyPath(familyId)
  const { data: student } = useStudent(studentId)

  const [filter, setFilter] = useState(LESSON_FILTER_TYPE.NOT_COMPLETD)

  const allLessons = useMemo(() => {
    return []
    // const lessons = []
    // if (!subjects) return lessons

    // const startedAt = new Date(2022, 3, 4, 16)
    // subjects.forEach((subject, s) => {
    //   const subjectStartedAt = add(startedAt, { days: s })
    //   subject.lessons.forEach((lesson, l) => {
    //     const lessonStartedAt = add(subjectStartedAt, { weeks: l })
    //     const lessonFinishedAt = add(lessonStartedAt, { minutes: 55 })
    //     lessons.push({
    //       name      : lesson.name,
    //       startedAt : lessonStartedAt,
    //       finishedAt: lessonFinishedAt,
    //       teachers  : [{
    //         id  : '1',
    //         name: '若松貴文'
    //       }]
    //     })
    //   })
    // }, [])

    // return lessons.sort(((a,b) => a.startedAt > b.startedAt ? 1 : -1))
  }, [])

  const lessons = useMemo(() => {
    if (filter === LESSON_FILTER_TYPE.ALL) return allLessons
    return allLessons.filter(lesson => lesson.startedAt > new Date())
  }, [allLessons, filter])

  return (
    <FamilyDashboard title={student?.name} familyId={familyId}>
      <Breadcrumbs>
        <BLink href={getFamilyPath('/')}>ホーム</BLink>
        <BLink href={getFamilyPath('/students')}>生徒の一覧</BLink>
        {student && <BCurrent>{student.name}</BCurrent>}
      </Breadcrumbs>
      <FamilyDashboardSection>
        <FamilyDashboardTitle>{student?.name}</FamilyDashboardTitle>
      </FamilyDashboardSection>
      <FamilyDashboardSection>
        <FamilyDashboardSectionTitle>予定</FamilyDashboardSectionTitle>
        <Card>
          <div className="p-3 border-b-2 flex gap-2 items-center">
            <div className="flex-grow">
              <Select value={filter} onChange={({ target: { value: filter } }) => setFilter(filter)}>
                <option value={LESSON_FILTER_TYPE.NOT_COMPLETD}>開始前</option>
                <option value={LESSON_FILTER_TYPE.ALL}>すべて</option>
              </Select>
            </div>
            <div className="text-gray-700">2022年4月1日 ~ 2022年4月30日</div>
          </div>
          <Collection>
            {lessons.map((lesson, index) => (
              <CollectionItem key={index}>
                <div className="py-2 flex flex-col gap-1">
                  <div className="flex gap-2 items-start">
                    <div className="flex-grow text-sm">{lesson.name}</div>
                    <div className="flex-shrink-0 w-32 text-xs">講師: {lesson.teachers[0].name}</div>
                  </div>
                  <div className="flex gap-1">
                    <div>{format(lesson.startedAt, 'MM月dd日(EE)', { locale })}</div>
                    <div>{format(lesson.startedAt, 'HH:mm')}</div>
                    <div>~</div>
                    <div>{format(lesson.finishedAt, 'HH:mm')}</div>
                  </div>
                </div>
              </CollectionItem>
            ))}
          </Collection>
        </Card>
      </FamilyDashboardSection>
      <FamilyDashboardSection>
        <FamilyDashboardSectionTitle>履修科目</FamilyDashboardSectionTitle>
        <Card>
          {subjects && (
            <Collection>
            {subjects.length > 0 ? (
              subjects.map(subject => (
                <CollectionItem key={subject.id}>
                  {subject.name}
                </CollectionItem>
              ))
            ): (
              <CollectionPlaceholder>
                履修科目はありません
              </CollectionPlaceholder>
            )}
            </Collection>
          )}
        </Card>
      </FamilyDashboardSection>
    </FamilyDashboard>
  )
}
