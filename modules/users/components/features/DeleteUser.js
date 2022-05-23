import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useDeleteUserMutation, useUserQuery } from '@users/hooks/users'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Button } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'

export default function DeleteUser () {
  const { query:{ userId }, replace } = useRouter()

  const {
    mutate,
    ...result
  } = useUserQuery(userId)
  const [deleteUser, {
    isLoading: isDeleting,
    isSuccess: isDeleted,
    error: deletingError
  }] = useDeleteUserMutation(userId)

  const handleSubmit = useCallback(() => {
    if (!confirm('ユーザを削除しますか')) return
    deleteUser()
  }, [deleteUser])

  useEffect(() => {
    if (!isDeleted) return
    toast.success('ユーザを削除しました')
    mutate(undefined)
    replace(getRoomPath('/signout'))
  }, [isDeleted, mutate, replace])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>ユーザの削除</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
      {()=>(
        <Card>
          <CardBody>
          {deletingError && <ErrorAlert error={deletingError} />}
            <div className="flex flex-row-reverse">
              <Button danger type="button" disabled={isDeleting} onClick={handleSubmit}>ユーザを削除する</Button>
            </div>
          </CardBody>
        </Card>
        )}
      </Suspension>
    </Feature>
  )
}
