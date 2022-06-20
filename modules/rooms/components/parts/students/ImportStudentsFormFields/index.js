import { useMemo, useCallback } from 'react'
import { useField } from 'formik'

import { Field } from '@/components/parts/forms'
import { DownloadButton } from '@/components/parts/buttons'

import { csvToDataUrl } from '@/services/file'
import { parseStudentsCsv } from '@rooms/services/students/csv'

import StudentsSimpleTable from '../StudentsSimpleTable'

import template from './template.csv'

const dataUrl = csvToDataUrl(template)

export default function StudentFormFields () {
  const [field, , helper] = useField('csv')

  const changeFileHandler = useCallback(async (event) => {
    const file = event.target.files[0]
    const csv = await file.text()
    helper.setValue(csv)
  }, [helper])

  const students = useMemo(() => parseStudentsCsv(field.value), [field.value])

  return (
    <>
      <Field
        name="csv" type="textarea" rows={20}
        label="CSV" placeholder={template}/>
      <div className="flex gap-2">
        <input type="file" onChange={changeFileHandler} accept=".csv" />
        <DownloadButton color="secondary" size="sm" dataUrl={dataUrl} fileName="生徒.csv">テンプレートをダウンロード</DownloadButton>
      </div>
      {students &&  (
        <StudentsSimpleTable students={students} />
      )}
    </>
  )
}
