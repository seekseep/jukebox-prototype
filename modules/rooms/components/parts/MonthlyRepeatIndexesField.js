import { useCallback, useMemo } from 'react'
import { useField } from 'formik'

import { FieldContainer, Label, Select } from '@/components/parts/forms'

const options = new Array(30).fill(null).map((_,index) => {
  return {
    label: `毎月 ${index + 1}日`,
    value: index
  }
})

export default function MonthlyRepeatIndexesField ({ label, ...props }) {
  const [field, , helper] = useField(props)

  const value = useMemo(() => field.value[0], [field.value])

  const handleChange = useCallback(({ target: { value } }) => {
    helper.setValue([ +value ])
  }, [helper])

  return (
    <FieldContainer>
      {label && (
        <Label>{label}</Label>
      )}
      <Select value={value} onChange={handleChange}>
        {!value && <option value=""></option>}
        {options.map(({ label, value }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </Select>
    </FieldContainer>
  )
}
