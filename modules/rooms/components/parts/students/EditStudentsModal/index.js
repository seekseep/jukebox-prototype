import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'

import { Button } from '@/components/parts/buttons'
import Modal, { ModalDialog } from '@/components/parts/Modal'
import { Form, FormActions } from '@/components/parts/forms'
import ErrorAlert from '@/components/parts/ErrorAlert'

import {
  useSchoolNameOptions,
  useSchoolGradeOptions
} from '@rooms/hooks/students'

import StudentsFormFields from '@rooms/components/parts/students/StudentsFormFields'
import {
  useInitialValues,
  useValidationSchema,
  useValuesToResult
} from '@rooms/components/parts/students/StudentsFormFields/hooks'

export default function EditStudentsModal ({
  isOpened, toggle, onSubmit,
  allStudents, students,
  isLoading, isSuccess, error,
}) {
  const schoolNameOptions = useSchoolNameOptions(allStudents)
  const schoolGradeOptions = useSchoolGradeOptions(allStudents)

  const initialValues = useInitialValues(students)
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
                  <StudentsFormFields
                    schoolNameOptions={schoolNameOptions}
                    schoolGradeOptions={schoolGradeOptions} />
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
