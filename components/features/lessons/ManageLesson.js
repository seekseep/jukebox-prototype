import { useRouter } from 'next/router'
import { useMemo, useCallback, useEffect } from 'react'
import { format } from 'date-fns'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import { FORM_ERROR_REQUIRED } from '../../../messages'

import { getDatetimeLocalValue } from '@/services/input'

import { useTeachers } from '@/hooks/teachers'
import { useStudents } from '@/hooks/students'
import { useSheets } from '@/hooks/sheets'
import { useLesson, useUpdateLesson } from '@/hooks/lessons'
import { useToggleState } from '@/hooks/ui'
import { useGetRoomPath } from '@/hooks/router'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Form, Field, SelectField } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import Loading from '@/components/parts/Loading'
import Card, { CardActions, CardBody } from '@/components/parts/Card'
import PropertySet, {
  PropertyItem,
  PropertyLabel,
  PropertyContents,
  PropertyDateTimeContents
} from '@/components/parts/PropertySet'
import Collection, {
  CollectionLinkItem
} from '@/components/parts/Collection'
import ErrorAlert from '@/components/parts/ErrorAlert'

export default function ManageLesson () {
  const { query:{ roomId, lessonId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()
  const getRoomPath = useGetRoomPath(roomId)

  const { data: roomStudents } = useStudents(roomId)
  const { data: roomTeachers } = useTeachers(roomId)
  const { data: roomSheets } = useSheets(roomId)

  const {
    data: lesson,
    isLoading,
    error: gettingError,
    isSuccess: isReady,
    mutate
  } = useLesson(roomId, lessonId)
  const [update, {
    data: updatedLesson,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateLesson(roomId, lessonId)

  const studentOptions = useMemo(() => roomStudents?.map(({ id: value, name:label }) => ({ label, value })) || [], [roomStudents])
  const teacherOptions = useMemo(() => roomTeachers?.map(({ id: value, name:label }) => ({ label, value })) || [], [roomTeachers])
  const sheetOptions = useMemo(() => roomSheets?.map(({ id: value, name:label }) => ({ label, value })) || [], [roomSheets])

  const validationSchema = useMemo(() => Yup.object().shape({
    teachers  : Yup.array(Yup.object().shape({ value: Yup.string(), label: Yup.string() })).default([]),
    students  : Yup.array(Yup.object().shape({ value: Yup.string(), label: Yup.string() })).default([]),
    sheets    : Yup.array(Yup.object().shape({ value: Yup.string(), label: Yup.string() })).default([]),
    startedAt : Yup.string().required(FORM_ERROR_REQUIRED).default(''),
    finishedAt: Yup.string().required(FORM_ERROR_REQUIRED).default(''),
  }), [])

  const initialValues = useMemo(() => validationSchema.cast({
    ...lesson,
    startedAt : getDatetimeLocalValue(lesson?.startedAt?.toDate()),
    finishedAt: getDatetimeLocalValue(lesson?.finishedAt?.toDate()),
    teachers  : lesson?.teachers?.map(({ id: value, name: label }) => ({ value, label })) || [],
    students  : lesson?.students?.map(({ id: value, name: label }) => ({ value, label })) || [],
    sheets    : lesson?.sheets?.map(({ id: value, name: label }) => ({ value, label })) || [],
  }, { stripUnknown: true }), [lesson, validationSchema])

  const handleSubmit = useCallback(({ startedAt, finishedAt, students, teachers, sheets, ...lesson }) => update({
    students  : students.map(({ value }) => value) ,
    teachers  : teachers.map(({ value }) => value) ,
    sheets    : sheets.map(({ value }) => value),
    startedAt : new Date(startedAt),
    finishedAt: new Date(finishedAt),
    ...lesson
  }), [update])

  useEffect(() => {
    if (!isUpdated) return
    toast.success('科目の変更を保存しました')
    mutate(updatedLesson)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedLesson])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業の情報</FeatureTitle>
      </FeatureHead>
      {isLoading && <Loading />}
      {gettingError && <ErrorAlert error={gettingError} />}
      {isReady && (
        <Card>
          {isEditing ? (
            <CardBody>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isValid }) => (
                  <Form>
                    <Field name="startedAt" label="開始日時" type="datetime-local" />
                    <Field name="finishedAt" label="終了日時" type="datetime-local" />
                    <SelectField name="students" label="生徒" options={studentOptions} isMulti />
                    <SelectField name="teachers" label="講師" options={teacherOptions} isMulti />
                    <SelectField name="sheets" label="席" options={sheetOptions} isMulti />
                    {updatingError && <ErrorAlert error={updatingError} />}
                    <div className="flex flex-row-reverse justify-between">
                      <Button primary type="submit" disabled={!isValid || isUpdating}>保存する</Button>
                      <Button secondary type="button" onClick={toggleEditing}>変更を破棄する</Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardBody>
          ) : (
            <>
              <CardActions>
                <Button secondary sm onClick={toggleEditing}>編集する</Button>
              </CardActions>
              <PropertySet>
                <PropertyItem>
                  <PropertyLabel>開始日時</PropertyLabel>
                  <PropertyDateTimeContents value={lesson?.startedAt?.toDate()} />
                </PropertyItem>
                <PropertyItem>
                  <PropertyLabel>終了日時</PropertyLabel>
                  <PropertyDateTimeContents value={lesson?.finishedAt?.toDate()} />
                </PropertyItem>
                <PropertyItem>
                  <PropertyLabel>生徒</PropertyLabel>
                  <PropertyContents>
                    {lesson.students && (
                      <Collection>
                        {lesson.students.map(student =>
                          <CollectionLinkItem key={student.id} href={getRoomPath(`/students/${student.id}`)}>
                            {student.name}
                          </CollectionLinkItem>
                        )}
                      </Collection>
                    )}
                  </PropertyContents>
                </PropertyItem>
                <PropertyItem>
                  <PropertyLabel>講師</PropertyLabel>
                  <PropertyContents>
                    {lesson.teachers && (
                      <Collection>
                        {lesson.teachers.map(teacher =>
                          <CollectionLinkItem key={teacher.id} href={getRoomPath(`/teachers/${teacher.id}`)}>
                            {teacher.name}
                          </CollectionLinkItem>
                        )}
                      </Collection>
                    )}
                  </PropertyContents>
                </PropertyItem>
                <PropertyItem>
                  <PropertyLabel>席</PropertyLabel>
                  <PropertyContents>
                    {lesson.sheets && (
                      <Collection>
                        {lesson.sheets.map(sheet =>
                          <CollectionLinkItem key={sheet.id} href={getRoomPath(`/sheets/${sheet.id}`)}>
                            {sheet.name}
                          </CollectionLinkItem>
                        )}
                      </Collection>
                    )}
                  </PropertyContents>
                </PropertyItem>
              </PropertySet>
            </>
          )}
        </Card>
      )}
    </Feature>
  )
}
