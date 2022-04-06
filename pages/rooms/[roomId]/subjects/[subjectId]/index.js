import { useRouter } from 'next/router'

import { useGetRoomLink, useRoom } from '../../../../../hooks/rooms'
import { useSubject } from '../../../../../hooks/subjects'

import Card, { CardActions } from '../../../../../components/parts/Card'
import { LinkButton } from '../../../../../components/parts/buttons'
import PropertySet, { PropertyItem, PropertyLabel, PropertyContents } from '../../../../../components/parts/PropertySet'
import RoomDashboard, { RoomDashboardSection } from '../../../../../components/parts/RoomDashboard'
import SubjectHeader from '../../../../../components/parts/SubjectHeader'
import { WEEK_DAY } from '../../../../../constatnts'
import classNames from 'classnames'

export default function Subject () {
  const { query: { roomId, subjectId } } = useRouter()
  const getRoomLink = useGetRoomLink(roomId)

  const room = useRoom(roomId)
  const subject = useSubject(subjectId)

  return (
    <RoomDashboard roomId={roomId}>
      <SubjectHeader roomId={roomId} subjectId={subjectId} />
      <RoomDashboardSection>
        <Card>
          <CardActions>
            <LinkButton secondary sm href={getRoomLink('/subjects/new')}>編集する</LinkButton>
          </CardActions>
          {subject && (
            <PropertySet>
              <PropertyItem>
                <PropertyLabel>名称</PropertyLabel>
                <PropertyContents>{subject.name}</PropertyContents>
              </PropertyItem>
              <PropertyItem>
                <PropertyLabel>枠</PropertyLabel>
                <PropertyContents>
                  <div className="flex flex-col items-start border-l">
                    <div className="flex bg-gray-50 border-t border-b">
                      <div className="w-8 h-8 border-r"></div>
                      {room && room.frames[1].map(({ start: { hours, minutes } }, index) => (
                        <div key={index} className="w-16 h-8 flex items-center border-r justify-center">
                          <div>{hours}:{('00' + minutes).slice(-2)}</div>
                          <div>~</div>
                        </div>
                      ))}
                    </div>
                  {room && room.frames.map((frameSet, day) => frameSet.length < 1 ? null : (
                    <div key={day} className="flex border-b justify-start">
                      <div className="border-r w-8 h-8 flex justify-center items-center">
                        <div>
                          {day === WEEK_DAY.SUNDAY && '日'}
                          {day === WEEK_DAY.MONDAY && '月'}
                          {day === WEEK_DAY.THURSDAY && '火'}
                          {day === WEEK_DAY.WEDNESDAY && '水'}
                          {day === WEEK_DAY.TUESDAY && '木'}
                          {day === WEEK_DAY.FRIDAY && '金'}
                          {day === WEEK_DAY.SATURDAY && '土'}
                        </div>
                      </div>
                      {frameSet.map((_, index) => {
                        const isActive = subject.frames.some((frame) => frame[0] === day && frame[1] === index)
                        return <div key={index} className={classNames('w-16 h-8 border-r', { 'bg-blue-500': isActive })} />
                      })}
                    </div>
                  ))}
                  </div>
                </PropertyContents>
              </PropertyItem>
            </PropertySet>
          )}
        </Card>
      </RoomDashboardSection>
    </RoomDashboard>
  )
}
