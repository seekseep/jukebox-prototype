import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'

import { Button } from '@/components/parts/buttons'
import Modal, { ModalDialog } from '@/components/parts/Modal'
import { Form, FormActions } from '@/components/parts/forms'
import ErrorAlert from '@/components/parts/ErrorAlert'

import TeachersFormFields from '@rooms/components/parts/teachers/TeachersFormFields'
import {
  useInitialValues,
  useValidationSchema,
  useValuesToResult
} from '@rooms/components/parts/teachers/TeachersFormFields/hooks'

export default function EditTeachersModal ({
  isOpened, toggle, onSubmit,
  teachers,
  isLoading, isSuccess, error,
}) {
  const initialValues = useInitialValues(teachers)
  const validationSchema = useValidationSchema()
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback((values) => onSubmit(valuesToResult(values)), [onSubmit, valuesToResult])

  useEffect(() => {
    if(!isSuccess) return
    toggle()
  }, [isSuccess, toggle])

  return (
    <Modal isOpened={isOpened} toggle={toggle}>
      {() => (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isValid }) => (
            <ModalDialog>
              <div className="text-xl p-4 border-b">生徒の一括編集</div>
              <div className="p-4">
                <Form>
                  <TeachersFormFields />
                  <ErrorAlert error={error} />
                  <FormActions>
                    <Button disabled={!isValid || isLoading} type="submit" color="primary" onSubmit={handleSubmit}>保存する</Button>
                    <Button type="button" color="secondary" onClick={toggle}>変更を破棄する</Button>
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
