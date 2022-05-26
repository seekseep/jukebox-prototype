import { useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

import { useSelectCollection, useToggleState } from '@/hooks/ui'
import { WithDocRef, WithDocRefs } from '@/components/utilities/withDocRefs'
import Card from '@/components/parts/Card'
import{ Form, FormActions } from '@/components/parts/forms'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Button, LinkButton } from '@/components/parts/buttons'
import ErrorAlert from '@/components/parts/ErrorAlert'
import Suspension from '@/components/parts/Suspension'

import { getLessonDateLabel, getLessonDateTimeLabel } from '@rooms/services/lessons'
import { useGetRoomPath } from '@rooms/hooks/router'
import { useSubjectsQuery } from '@rooms/hooks/subjects'
import { useTeachersQuery } from '@rooms/hooks/teachers'
import { useStudentsQuery } from '@rooms/hooks/students'
import { useSheetsQuery } from '@rooms/hooks/sheets'
import { useDeleteLessonsMutation, useSearchLessonsQuery, useUpdateLessonsMutation } from '@rooms/hooks/lessons'

import SearchLessonsFormFields from '@rooms/components/parts/lessons/SearchLessonsFormFields'
import {
  useInitialValues as useSearchInitilValues,
  useValidationSchema as useSearchValidationSchema,
  useValuesToResult as useSearchValuesToResult
} from '@rooms/components/parts/lessons/SearchLessonsFormFields/hooks'
import UpdateLessonsFormFields from '@rooms/components/parts/lessons/UpdateLessonsFormFields'
import {
  useInitialValues as useUpdateInitilValues,
  useValidationSchema as useUpdateValidationSchema,
  useValuesToResult as useUpdateValuesToResult
} from '@rooms/components/parts/lessons/UpdateLessonsFormFields/hooks'


export default function ManageLessons () {
  const { query:{ roomId, ...query }, push, reload } = useRouter()
  const getRoomPath = useGetRoomPath(roomId, query)
  const [isSearchOpend, toggleSearch] = useToggleState(false)
  const [isUpdateOpend, toggleUpdate] = useToggleState(false)

  const {
    selectedItems,
    getIsSelected,
    setItem,
    setSelection,
    isAllSelected
  } = useSelectCollection()

  const lessonRefsResult = useSearchLessonsQuery(roomId, query)
  const [deleteLessons, {
    isSuccess: isDeleted,
    isLoading: isDeleting,
    error: deletingError
  }] = useDeleteLessonsMutation(roomId)
  const [updateLessons, {
    isSuccess: isUpdated,
    isLoading: isUpdating,
    error: updatingError
  }] = useUpdateLessonsMutation(roomId)

  const {
    data: subjects,
    isLoading: isGettingSubjects,
    isSuccess: isGotSubjects,
    error: gettingSubjectsError
  } = useSubjectsQuery(roomId)
  const {
    data: students,
    isLoading: isGettingStudents,
    isSuccess: isGotStudents,
    error: gettingStudentsError
  } = useStudentsQuery(roomId)
  const {
    data: teachers,
    isLoading: isGettingTeachers,
    isSuccess: isGotTeachers,
    error: gettingTeachersError
  } = useTeachersQuery(roomId)
  const {
    data: sheets,
    isLoading: isGettingSheets,
    isSuccess: isGotSheets,
    error: gettingSheetsError
  } = useSheetsQuery(roomId)

  const searchValidationSchema = useSearchValidationSchema()
  const searchInitialValues = useSearchInitilValues(query, { subjects, students, teachers, sheets })
  const searchValuesToResult = useSearchValuesToResult()
  const handleSearch = useCallback((values) => {
    const result = searchValuesToResult(values)
    push(getRoomPath(`/lessons?${result}`))
  }, [getRoomPath, push, searchValuesToResult])

  const updateValidationSchema = useUpdateValidationSchema()
  const updateInitialValues = useUpdateInitilValues()
  const updateValuesToResult = useUpdateValuesToResult()
  const handleUpdate = useCallback((values) => {
    const result = updateValuesToResult(values)
    console.log(selectedItems.map(lessonRef => ({
      id: lessonRef.id,
      ...result
    })))

    updateLessons(selectedItems.map(lessonRef => ({
      id: lessonRef.id,
      ...result
    })))
  }, [selectedItems, updateLessons, updateValuesToResult])

  const handleDelete = useCallback(() => {
    const lessonIds = selectedItems.map(lessonRef => lessonRef.id)
    if (!confirm(`${lessonIds.length}件の授業を削除しますか？`)) return
    deleteLessons(lessonIds)
    setSelection({})
  }, [deleteLessons, selectedItems, setSelection])

  useEffect(() => {
    if (!isDeleted) return
    toast.success('授業を削除しました')
    reload()
  }, [isDeleted, reload])

  useEffect(() => {
    if (!isUpdated) return
    toast.success('授業を変更しました')
    reload()
  }, [isUpdated, reload])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/lessons/new')}>授業を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Card>
        <Suspension
          isLoading={isGettingSubjects || isGettingStudents || isGettingTeachers || isGettingSheets}
          isSuccess={isGotSubjects && isGotStudents && isGotTeachers && isGotSheets}
          error={gettingSubjectsError || gettingStudentsError || gettingTeachersError || gettingSheetsError}>
          <div className="m-2 px-4 py-2 bg-gray-50 rounded flex flex-col gap-2">
            <div className="py-2 flex justify-between cursor-pointer" onClick={toggleSearch}>
              <div>絞り込む</div>
              <div className="w-8 text-center">
                {isSearchOpend ? '🔼' : '🔽'}
              </div>
            </div>
            {isSearchOpend && (
              <Formik validationSchema={searchValidationSchema} initialValues={searchInitialValues} onSubmit={handleSearch}>
                {({ isValid }) => (
                  <Form>
                    <SearchLessonsFormFields
                      students={students}
                      teachers={teachers}
                      sheets={sheets}
                      subjects={subjects} />
                    <FormActions>
                      <Button type="submit" disabled={!isValid}>絞り込む</Button>
                    </FormActions>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </Suspension>
        <Suspension {...lessonRefsResult}>
          {({ data: lessonRefs }) => (
            <>
              <div className="flex w-full border-b-2">
                <label className="py-2 px-1 w-10 cursor-pointer border-b border-b-transparent text-center hover:bg-gray-50 active:bg-gray-50">
                  <input checked={isAllSelected} type="checkbox" onChange={({ target: { checked } }) => {
                    setSelection(lessonRefs.reduce((selection, lessonRef) => ({
                      ...selection,
                      [lessonRef.id]: checked ? lessonRef : null
                    }), {}))
                  }} />
                </label>
                <div className="flex flex-grow gap-2">
                  <div className="text-center py-2 px-1 shrink-0 grow-0 w-32">科目</div>
                  <div className="text-center py-2 px-1 shrink-0 grow-0 w-32">生徒</div>
                  <div className="text-center py-2 px-1 shrink-0 grow-0 w-32">講師</div>
                  <div className="text-center py-2 px-1 shrink-0 flex-grow">授業時間</div>
                  <div className="text-center py-2 px-1 shrink-0 grow-0 w-32">席</div>
                </div>
              </div>
              <WithDocRefs docRefs={lessonRefs}>
                {({ data: lesson, ref: lessonRef }) => (
                <div className="flex w-full">
                  <label className="py-2 px-1 w-10 cursor-pointer border-b border-b-transparent text-center hover:bg-gray-50 active:bg-gray-50">
                    <input className="cursor-pointer" type="checkbox" checked={getIsSelected(lesson.id)} onChange={({ target: { checked } }) => setItem(lesson.id, checked ? lessonRef : null )} />
                  </label>
                  <Link href={getRoomPath(`/lessons/${lesson.id}`)}>
                    <a className="flex gap-2 flex-grow border-b">
                      <div className="py-2 px-1 w-32 text-center">
                        {lesson.subject ? (
                          <WithDocRef docRef={lesson.subject}>
                            {({ data: subject }) => subject.name}
                          </WithDocRef>
                        ) : ''}
                      </div>
                      <div className="py-2 px-1 w-32">
                        {lesson.students ? (
                          <div className="flex gap-1 flex-wrap">
                            <WithDocRefs docRefs={lesson.students}>
                              {({ data: student }) => (
                                <div>{student.name}</div>
                              )}
                            </WithDocRefs>
                          </div>
                        ) : ''}
                      </div>
                      <div className="py-2 px-1 w-32">
                        {lesson.teachers ? (
                          <div className="flex gap-1 flex-wrap">
                            <WithDocRefs docRefs={lesson.teachers}>
                              {({ data: teacher }) => (
                                <div>{teacher.name}</div>
                              )}
                            </WithDocRefs>
                          </div>
                        ) : ''}
                      </div>
                      <div className="py-2 px-1 flex-grow">
                        {getLessonDateTimeLabel(lesson)}
                      </div>
                      <div className="py-2 px-1 w-32">
                        {lesson.sheets ? (
                          <div className="flex gap-1 flex-wrap">
                            <WithDocRefs docRefs={lesson.sheets}>
                              {({ data: sheet }) => (
                                <div>{sheet.name}</div>
                              )}
                            </WithDocRefs>
                          </div>
                        ) : ''}
                      </div>
                    </a>
                  </Link>
                </div>
              )}
              </WithDocRefs>
            </>
          )}
        </Suspension>
        {selectedItems.length > 0 && (
          <div className="flex flex-col m-2 bg-gray-50 rounded">
            <div className="flex flex-wrap gap-2 p-2">
              <WithDocRefs docRefs={selectedItems}>
                {({ data: lesson }) => (
                  <div className="bg-white shadow border rounded flex text-sm">
                    <div className="flex gap-1 leading-8 px-2">
                      <WithDocRef docRef={lesson.subject}>
                        {({ data: subject }) => <div>{subject.name}</div>}
                      </WithDocRef>
                      <div>{getLessonDateLabel(lesson)}</div>
                    </div>
                    <button onClick={() => setItem(lesson.id, null)} className="w-8 h-8 text-center leading-8 text-xs">❌</button>
                  </div>
                )}
              </WithDocRefs>
            </div>
            <div className="border-t flex flex-col gap-2">
              <ErrorAlert error={deletingError} />
              {isUpdateOpend ? (
                <>
                  <div className="p-4 py-3">
                    <Formik validationSchema={updateValidationSchema} initialValues={updateInitialValues} onSubmit={handleUpdate}>
                      {({ isValid }) => (
                        <Form>
                          <UpdateLessonsFormFields
                            students={students}
                            teachers={teachers}
                            sheets={sheets}
                            subjects={subjects} />
                          <ErrorAlert error={updatingError} />
                          <FormActions>
                            <Button primary type="submit" disabled={!isValid || isUpdating}>保存する</Button>
                            <Button secondary type="button" onClick={toggleUpdate}>変更を破棄する</Button>
                          </FormActions>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </>
              ) : (
                <div className="p-2">
                  <FormActions>
                    <Button secondary type="button" onClick={toggleUpdate}>編集する</Button>
                    <Button disabled={isDeleting} type="button" danger onClick={handleDelete}>削除する</Button>
                  </FormActions>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </Feature>
  )
}
