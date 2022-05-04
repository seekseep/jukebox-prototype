import { useCallback, useState } from 'react'
import { useField } from 'formik'

import { useFrameRuleSchema, useWeekDays, useGetDayRules } from '../../../hooks/frameRulesSets'

import { Select, Input, FieldContainer, Label } from '.'
import { Button } from '../buttons'
import {
  FrameRulesContainer,
  DayFrameRulesContainer,
  DayFrameRulesTitle,
  DayFrameRulesRulesContainer,
  FrameRule
} from '../FrameRules'
import { WEEK_DAY, WEEK_DAY_ALL } from '../../../constatnts'

export default function FrameRulesField({ name }) {
  const [{ value: rules }, , { setValue }] = useField(name)
  const days = useWeekDays()
  const frameRuleSchema = useFrameRuleSchema()
  const getDayRules = useGetDayRules()

  const [newRule, setNewRule] = useState(frameRuleSchema.cast({}))

  const handleRemove = useCallback((deletedRule) => {
    setValue(rules.filter(rule => rule !== deletedRule))
  }, [rules, setValue])

  const handleAppend = useCallback((rule = {}) => {
    if (+rule?.day === WEEK_DAY_ALL) {
      setValue(([
        ...rules,
        ...Object.values(WEEK_DAY).map((day) =>
          frameRuleSchema.cast({
            ...rule,
            day
          }, {
            stripUnknown: true
          })
        )
      ]))
      return
    }

    const createdRule = frameRuleSchema.cast(rule, { stripUnknown: true })
    setNewRule(frameRuleSchema.cast({}))
    setValue([...rules, createdRule])
  }, [frameRuleSchema, rules, setValue])

  return (
    <>
      <div className="flex gap-2">
        <FieldContainer>
          <Label>曜日</Label>
          <Select className="w-[8rem]" value={newRule.day} onChange={({ target: { value: day } }) => setNewRule(s => ({ ...s, day }))}>
            <option value={WEEK_DAY_ALL}>すべて</option>
            <option value={WEEK_DAY.SUNDAY}>日</option>
            <option value={WEEK_DAY.MONDAY}>月</option>
            <option value={WEEK_DAY.TUESDAY}>火</option>
            <option value={WEEK_DAY.WEDNESDAY}>水</option>
            <option value={WEEK_DAY.THURSDAY}>木</option>
            <option value={WEEK_DAY.FRIDAY}>金</option>
            <option value={WEEK_DAY.SATURDAY}>土</option>
          </Select>
        </FieldContainer>
        <FieldContainer>
          <Label>開始時間</Label>
          <div className="flex items-center gap-1">
            <Input
              type="number" min={0} max={23}
              value={newRule.start.hours}
              onChange={
                ({ target: { value: hours } }) =>
                  setNewRule(({ start, ...s }) => ({
                    ...s,
                    start: {
                      ...start,
                      hours
                    }
                  }))
              } className="w-[4rem]"  />
            <div>:</div>
            <Input
              value={newRule.start.minutes}
              type="number" min={0} max={59}
              onChange={
                ({ target: { value: minutes } }) =>
                  setNewRule(({ start, ...s }) => ({
                    ...s,
                    start: {
                      ...start,
                      minutes
                    }
                  }))
              } className="w-[4rem]"  />
          </div>
        </FieldContainer>
        <FieldContainer>
          <Label>終了時間</Label>
          <div className="flex items-center gap-1">
            <Input
              type="number" min={0} max={23}
              value={newRule.finish.hours}
              onChange={
                ({ target: { value: hours } }) =>
                  setNewRule(({ finish, ...s }) => ({
                    ...s,
                    finish: {
                      ...finish,
                      hours
                    }
                  }))
              } className="w-[4rem]"  />
            <div>:</div>
            <Input
              value={newRule.finish.minutes}
              type="number" min={0} max={59}
              onChange={
                ({ target: { value: minutes } }) =>
                  setNewRule(({ finish, ...s }) => ({
                    ...s,
                    finish: {
                      ...finish,
                      minutes
                    }
                  }))
              } className="w-[4rem]"  />
          </div>
        </FieldContainer>
        <div className="flex items-end">
          <Button type="button" onClick={() => handleAppend(newRule)}>追加する</Button>
        </div>
      </div>
      <FrameRulesContainer>
        {days.map(day => (
          <DayFrameRulesContainer key={day}>
            <DayFrameRulesTitle day={day} />
            <DayFrameRulesRulesContainer>
              {getDayRules(rules, day).map((rule, index) =>
                <FrameRule isDeletable key={index} rule={rule} onDelete={() => handleRemove(rule)} />
              )}
            </DayFrameRulesRulesContainer>
          </DayFrameRulesContainer>
        ))}
      </FrameRulesContainer>
    </>
  )
}
