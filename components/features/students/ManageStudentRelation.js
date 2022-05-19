import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

import { useToggleState } from '@/hooks/ui'
import { useRelation, useUpdateRelation } from '@/hooks/relations'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Form } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import Card, { CardActions, CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { updateRelationValuesToRelation, useUpdateRelationInitialValues, useUpdateRelationValidationSchema } from '@/components/parts/relations/UpdateRelationFormFields/hooks'
import UpdateRelationFormFields from '@/components/parts/relations/UpdateRelationFormFields'
import RelationPropertySet from '@/components/parts/relations/RelationPropertySet'
import RelationLabel from '@/components/parts/relations/RelationLabel'

export default function ManageStudentRelation () {
  const { query:{ roomId, relationId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: relation,
    mutate,
    ...result
  } = useRelation(roomId, relationId)
  const [update, {
    data: updatedRelation,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateRelation(roomId, relationId)

  const validationSchema = useUpdateRelationValidationSchema()
  const initialValues = useUpdateRelationInitialValues(relation)
  const handleSubmit = useCallback((values) => update(updateRelationValuesToRelation(values)), [update])

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
                      <div className="py-2">
                        <RelationLabel relation={relation} />
                      </div>
                      <UpdateRelationFormFields />
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
                <RelationPropertySet relation={relation} />
              </>
            )}
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
