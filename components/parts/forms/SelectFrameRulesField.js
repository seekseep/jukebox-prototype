import { useCallback } from 'react'
import { useField } from 'formik'

import { useWeekDays, useGetDayRules, useGetIsActiveRules } from '../../../hooks/frameRulesSets'

import { FieldContainer, Label } from '.'
import {
  FrameRulesContainer,
  DayFrameRulesContainer,
  DayFrameRulesTitle,
  DayFrameRulesRulesContainer,
  FrameRule
} from '../FrameRules'

export default function SelectFrameRulesField({ label, name, rules }) {
  const [{ value: selectedRuleIds }, , { setValue }] = useField(name)
  const days = useWeekDays()
  const getDayRules = useGetDayRules()

  const handleClick = useCallback((rule) => {
    const index = selectedRuleIds.findIndex(ruleId => ruleId === rule.id)

    if (index < 0) {
      setValue([...selectedRuleIds, rule.id])
      return
    }
    selectedRuleIds.splice(index, 1)
    setValue(selectedRuleIds)
  }, [selectedRuleIds, setValue])

  const getIsActive = useGetIsActiveRules(selectedRuleIds)

  return (
    <FieldContainer>
      <Label>{label}</Label>
      {!rules && (
        <div className="h-32 flex justify-center items-center">
          <div className="text-center text-gray-500 p-2">枠条件を選択してください</div>
        </div>
      )}
      {rules && (
        <FrameRulesContainer>
          {days.map(day => (
            <DayFrameRulesContainer key={day}>
              <DayFrameRulesTitle day={day} />
              <DayFrameRulesRulesContainer>
                {getDayRules(rules, day).map((rule, index) =>
                  <FrameRule key={index} isActive={getIsActive(rule)} rule={rule} onClick={() => handleClick(rule)} />
                )}
              </DayFrameRulesRulesContainer>
            </DayFrameRulesContainer>
          ))}
        </FrameRulesContainer>
      )}
    </FieldContainer>
  )
}
