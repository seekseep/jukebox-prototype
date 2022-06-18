import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'

import { Button } from '@/components/parts/buttons'
import Modal, { ModalDialog } from '@/components/parts/Modal'
import { Form, FormActions } from '@/components/parts/forms'
import ErrorAlert from '@/components/parts/ErrorAlert'

import DownloadStudentCalendarFormFields from '@rooms/components/parts/students/DownloadStudentCalendarFormFields'
import {
  useInitialValues,
  useValidationSchema,
  useValuesToResult
} from '@rooms/components/parts/students/DownloadStudentCalendarFormFields/hooks'
import { toast } from 'react-toastify'

export default function DownloadStudentCalendarModal ({
  isOpened, toggle, onSubmit,
  studentId,
  isLoading, isSuccess, error,
}) {
  const initialValues = useInitialValues(studentId)
  const validationSchema = useValidationSchema()
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback((values) => onSubmit(valuesToResult(values)), [onSubmit, valuesToResult])

  useEffect(() => {
    if(!isSuccess) return
    toggle()
  }, [isSuccess, toggle])

  useEffect(() => {
    if (isLoading) toast.success('ダウンロードを開始しました')
  }, [isLoading])

  return (
    <Modal isOpened={isOpened} toggle={toggle}>
      {() => (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isValid }) => (
            <ModalDialog>
              <div className="text-xl p-4 border-b">生徒のカレンダーのダウンロード</div>
              <div className="p-4">
                <Form>
                  <DownloadStudentCalendarFormFields />
                  <ErrorAlert error={error} />
                  <FormActions>
                    <Button disabled={!isValid || isLoading} type="submit" color="primary" onSubmit={handleSubmit}>ダウンロードする</Button>
                    <Button type="button" color="secondary" onClick={toggle}>やめる</Button>
                  </FormActions>
                </Form>
              </div>
            </ModalDialog>
          )}
        </Formik>
      )}
    </Modal>
  )
}
