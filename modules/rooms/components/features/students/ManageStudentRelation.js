import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

import { useToggleState } from '@/hooks/ui'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Form } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import Card, { CardActions, CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'

import { useRelationQuery, useUpdateRelationMutation } from '@rooms/hooks/relations'
import { useValidationSchema, useInitialValues, useValuesToResult } from '@rooms/components/parts/relations/UpdateRelationFormFields/hooks'
import UpdateRelationFormFields from '@rooms/components/parts/relations/UpdateRelationFormFields'
import RelationPropertySet from '@rooms/components/parts/relations/RelationPropertySet'

export default function ManageStudentRelation () {
  const { query:{ roomId, relationId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: relation,
    mutate,
    ...result
  } = useRelationQuery(roomId, relationId)
  const [update, {
    data: updatedRelation,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateRelationMutation(roomId, relationId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValues(relation)
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback((values) => update(valuesToResult(values)), [update, valuesToResult])

  useEffect(() => {
    if (!isUpdated) return
    toast.success('関係性の変更を保存しました')
    mutate(updatedRelation)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedRelation])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>生徒の関係性</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            {isEditing ? (
              <CardBody>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ isValid }) => (
                    <Form>
                      <UpdateRelationFormFields relation={relation} />
                      <ErrorAlert error={updatingError} />
                      <div className="flex flex-row-reverse justify-between">
                        <Button primary type="submit" disabled={!isValid || isUpdating}>保存する</Button>
                        <Button color="secondary" type="button" onClick={toggleEditing}>変更を破棄する</Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            ) : (
              <>
                <CardActions>
                  <Button color="secondary" size="sm" onClick={toggleEditing}>編集する</Button>
                </CardActions>
                <RelationPropertySet relation={relation} />
              </>
            )}
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
