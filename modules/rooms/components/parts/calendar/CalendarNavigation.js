import ReactSelect from 'react-select'
import classNames from 'classnames'

import { CALENDAR_FORMAT, CALENDAR_TERM } from '@rooms/constants'

import { Button } from '@/components/parts/buttons'
import { Select } from '@/components/parts/forms'
import { WEEK_DAY } from '@/constants'
import { useMemo } from 'react'
import { useStudentOptions } from '@rooms/hooks/students'
import { useTeacherOptions } from '@rooms/hooks/teachers'
import { Z_INDEX } from './hooks/layout'

const FULL_HOURS = Array.from({ length: 24 }).fill(null).map((_, i) => i)

function Label (props) {
  return <label className="text-sm" {...props} />
}

function menuStyleFn (provided) {
  return {
    ...provided,
    zIndex: Z_INDEX.HEAD_COL + 1000
  }
}


export function NavigationContainer ({ className, ...props }) {
  return <div className={classNames(className, 'flex flex-col gap-3 p-2')}  {...props} />
}

export function FieldsRow ({ className, ...props }) {
  return <div className={classNames(className, 'flex gap-3 flex-wrap')}  {...props} />
}

export function FieldContainer ({ className, ...props }) {
  return <div className={classNames(className, 'flex flex-row gap-2 flex-nowrap shrink-0 items-center')}  {...props} />
}

export function DateCalendarField ({ current, onGoToday, onGoNext, onGoPrevious }) {
  return (
    <FieldContainer>
      <Button onClick={onGoToday} size="sm" color="secondary">今日</Button>
      <Button onClick={onGoPrevious} size="sm" color="secondary">◀</Button>
      <div className="leading-8 w-72 text-center">{current}</div>
      <Button onClick={onGoNext} size="sm" color="secondary">▶</Button>
    </FieldContainer>
  )
}

export function FormatCalendarField ({ value, onChange }) {
  return (
    <FieldContainer>
      <Label>種類</Label>
      <Select size="sm" defaultValue={value} onChange={({ target: { value: format } }) => onChange(format)}>
        <option value={CALENDAR_FORMAT.TEACHER_DATE}>講師 {'>'} 日付</option>
        <option value={CALENDAR_FORMAT.STUDENT_DATE}>生徒 {'>'} 日付</option>
        <option value={CALENDAR_FORMAT.DATE_TEACHER}>日付 {'>'} 講師</option>
        <option value={CALENDAR_FORMAT.DATE_STUDENT}>日付 {'>'} 生徒</option>
      </Select>
    </FieldContainer>
  )
}

export function TermCalendarField ({
  value, onChange,
  isDisabledDaily = false,
  isDisabledWeekly = false,
  isDisabledMontly = false,
}) {
  return (
    <FieldContainer>
      <Label>期間</Label>
      <Select size="sm" defaultValue={value} onChange={({ target: { value: term } }) => onChange(term)}>
        {!isDisabledDaily && (<option value={CALENDAR_TERM.DAILY}>日</option>)}
        {!isDisabledWeekly && (<option value={CALENDAR_TERM.WEEKLY}>週</option>)}
        {!isDisabledMontly && (<option value={CALENDAR_TERM.MONTHLY}>月</option>)}
      </Select>
    </FieldContainer>
  )
}

const dayOptions = [{
  value: WEEK_DAY.SUNDAY,
  label: '日'
},{
  value: WEEK_DAY.MONDAY,
  label: '月'
},{
  value: WEEK_DAY.TUESDAY,
  label: '火'
},{
  value: WEEK_DAY.WEDNESDAY,
  label: '水'
},{
  value: WEEK_DAY.THURSDAY,
  label: '木'
},{
  value: WEEK_DAY.FRIDAY,
  label: '金'
},{
  value: WEEK_DAY.SATURDAY,
  label: '土'
}]

export function DaysCalendarFiled ({ value, onChange }) {
  const inputValue = useMemo(() => {
    if (!value) return []
    return value.map((v) => {
      return dayOptions.find(option => option.value === v) ?? false
    }).filter(Boolean)
  }, [value])
  return (
    <FieldContainer>
      <Label>曜日</Label>
      <ReactSelect
        value={inputValue}
        options={dayOptions}
        isMulti styles={{ menu: menuStyleFn }}
        onChange={options => {
          onChange(options.map(option => option.value))
        }} />
    </FieldContainer>
  )
}

export function TimesCalendarField ({ startHour, endHour, onChange }) {
  return (
    <FieldContainer>
      <Label>時間</Label>
      <Select size="sm" defaultValue={startHour} onChange={({ target: { value: startHour } }) => onChange({ startHour, endHour })}>
        {FULL_HOURS.map(hour => (
          <option key={hour} value={hour}>{hour}:00</option>
        ))}
      </Select>
      <div className="text-sm">から</div>
      <Select size="sm" defaultValue={endHour} onChange={({ target: { value: endHour } }) => onChange({ startHour, endHour })}>
        {FULL_HOURS.map(hour => {
          if (hour <= startHour) return null
          return <option key={hour} value={hour}>{hour}:00</option>
        })}
      </Select>
    </FieldContainer>
  )
}

export function StudentCalendarField ({ value, onChange, students }) {
  const studentOptions = useStudentOptions(students)
  const inputValue = useMemo(() => {
    return studentOptions.find(option => option.value === value) || allOption
  }, [studentOptions, value])

  return (
    <FieldContainer>
      <Label>生徒</Label>
      <ReactSelect
        value={inputValue}
        options={[
          allOption,
          ...studentOptions,
        ]} styles={{ menu: menuStyleFn }}
        onChange={option => onChange(option.value)} />
    </FieldContainer>
  )
}

const allOption = { label: 'すべて', value: '' }

export function TeacherCalendarFiled ({ value, onChange, teachers }) {
  const teacherOptions = useTeacherOptions(teachers)
  const inputValue = useMemo(() => {
    return teacherOptions.find(option => option.value === value) || allOption
  }, [teacherOptions, value])

  return (
    <FieldContainer className="w-72">
      <Label>講師</Label>
      <ReactSelect
        value={inputValue} instanceId="calendar-teacher"
        options={[
          allOption,
          ...teacherOptions
        ]} styles={{ menu: menuStyleFn }}
        onChange={option => onChange(option.value)} />
    </FieldContainer>
  )
}
