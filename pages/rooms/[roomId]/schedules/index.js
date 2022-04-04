import { useRouter } from 'next/router'
import { useGetRoomLink } from '../../../../hooks/rooms'

import { useSchedulesByRoomId } from '../../../../hooks/schedules'

import RoomDashboard, {
  RoomDashboardTitle,
  RoomDashboardSection
} from '../../../../components/parts/RoomDashboard'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from '../../../../components/parts/Breadcrumbs'
import Card, { CardActions } from '../../../../components/parts/Card'
import Collection, { CollectionLinkItem, CollectionPlaceholder } from '../../../../components/parts/Collection'
import { Select } from '../../../../components/parts/forms'
import { LinkButton } from '../../../../components/parts/buttons'
import { format } from 'date-fns'
import classNames from 'classnames'
import { SCHEDULE_STATUS } from '../../../../constatnts'

export default function Schedules () {
  const { query: { roomId } } = useRouter()
  const getRoomLink = useGetRoomLink(roomId)

  const schedules = useSchedulesByRoomId(roomId)

  return (
    <RoomDashboard roomId={roomId} title="授業予定の一覧">
      <Breadcrumbs>
        <BLink href={getRoomLink('/')}>ホーム</BLink>
        <BCurrent>授業予定の一覧</BCurrent>
      </Breadcrumbs>
      <RoomDashboardSection>
        <RoomDashboardTitle>授業予定の一覧</RoomDashboardTitle>
        <Card>
          <CardActions>
            <LinkButton href={getRoomLink('/schedules/new')}>授業予定を作成する</LinkButton>
          </CardActions>
          <div className="flex p-3">
            <Select>
              <option value="">完了前</option>
              <option value="">すべて</option>
            </Select>
          </div>
          {schedules && (
            <Collection>
            {schedules.length > 0 ? (
              schedules.map(schedule => (
                <CollectionLinkItem key={schedule.id} href={getRoomLink(`/schedules/${schedule.id}`)}>
                  <div className="flex gap-4 items-center">
                    <div className={classNames('rounded w-16 border py-1 text-sm text-center', {
                      'border-blue-500 bg-white text-blue-500'  : schedule.status === SCHEDULE_STATUS.UNSUBMITTED,
                      'border-blue-500 bg-blue-500 text-white'  : schedule.status === SCHEDULE_STATUS.SUBMITTED,
                      'border-green-500 bg-green-500 text-white': schedule.status === SCHEDULE_STATUS.PUBLISHED,
                      'borderbg-gray-500 bg-gray-500 text-white': schedule.status === SCHEDULE_STATUS.ARCHIVED,
                    })}>
                      {schedule.status === SCHEDULE_STATUS.UNSUBMITTED && '編集中'}
                      {schedule.status === SCHEDULE_STATUS.SUBMITTED && '未公開'}
                      {schedule.status === SCHEDULE_STATUS.PUBLISHED && '公開済'}
                      {schedule.status === SCHEDULE_STATUS.ARCHIVED && '削除済'}
                    </div>
                    <div className="flex gap-2 leading-none items-center">
                      <div className="w-40 text-center text-lg">{format(schedule.startedAt, 'yyyy年MM月dd日')}</div>
                      <div>〜</div>
                      <div className="w-40 text-center text-lg">{format(schedule.finishedAt, 'yyyy年MM月dd日')}</div>
                    </div>
                  </div>

                </CollectionLinkItem>
              ))
            ) : (
              <CollectionPlaceholder>
                授業予定が作成さられていません
              </CollectionPlaceholder>
            )}

            </Collection>
          )}

        </Card>
      </RoomDashboardSection>
    </RoomDashboard>
  )
}
