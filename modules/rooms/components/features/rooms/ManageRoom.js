import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

import { useToggleState } from '@/hooks/ui'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import Card, { CardActions, CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'

import { useRoomQuery, useUpdateRoomMutation } from '@rooms/hooks/rooms'
import { useInitialValues, useValidationSchema, useValuesToResult } from '@rooms/components/parts/rooms/RoomFormFields/hooks'

import RoomFormFields from '@rooms/components/parts/rooms/RoomFormFields'
import RoomPropertySet from '@rooms/components/parts/rooms/RoomPropertySet'

export default function ManageRoom () {
  const { query:{ roomId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: room,
    mutate,
    ...result
  } = useRoomQuery(roomId)
  const [update, {
    data: updatedRoom,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateRoomMutation(roomId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues(room)
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback((values) => update(valuesToResult(values)), [update, valuesToResult])

  useEffect(() => {
    if (!isUpdated) return
    toast.success('変更を保存しました')
    mutate(updatedRoom)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedRoom])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>教室</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            {isEditing ? (
              <CardBody>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ isValid }) => (
                    <Form>
                      <RoomFormFields />
                      <ErrorAlert error={updatingError} />
                      <FormActions>
                        <Button primary type="submit" disabled={!isValid || isUpdating}>保存する</Button>
                        <Button color="secondary" type="button" onClick={toggleEditing}>変更を破棄する</Button>
                      </FormActions>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            ) : (
              <>
                <CardActions>
                  <Button color="secondary" size="sm" onClick={toggleEditing}>編集する</Button>
                </CardActions>
                <RoomPropertySet room={room}/>
              </>
            )}
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
