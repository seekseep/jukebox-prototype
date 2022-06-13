import { FieldContainer, Label, FieldAlert  } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { useField } from 'formik'
import { useCallback } from 'react'

export default function WeeklyRepeatIndexesField ({ label, ...props }) {
  const [field, meta, helper] = useField(props)

  const getIsSelected = useCallback((index) => {
    return field.value.some(value => value === index)
  }, [field.value])

  const getHandleToggleIndex = useCallback((index) => {
    return function handleToggleIndex () {
      const isSelected = getIsSelected(index)
      const value = isSelected ? (
        field.value.filter(i => i !== index)
      ) : (
        [...field.value, index].sort()
      )
      helper.setValue(value)
    }
  }, [field.value, getIsSelected, helper])


  const getColor = useCallback((isSelected) =>  isSelected ? 'primary' : 'secondary', [])

  return (
    <FieldContainer>
      {label && (
        <Label>{label}</Label>
      )}
      <div className="flex gap-2">
        <Button
          type="button" onClick={getHandleToggleIndex(0)}
          color={getColor(getIsSelected(0))}>
          日
        </Button>
        <Button
          type="button" onClick={getHandleToggleIndex(1)}
          color={getColor(getIsSelected(1))}>
          月
        </Button>
        <Button
          type="button" onClick={getHandleToggleIndex(2)}
          color={getColor(getIsSelected(2))}>
          火
        </Button>
        <Button
          type="button" onClick={getHandleToggleIndex(3)}
          color={getColor(getIsSelected(3))}>
          水
        </Button>
        <Button
          type="button" onClick={getHandleToggleIndex(4)}
          color={getColor(getIsSelected(4))}>
          木
        </Button>
        <Button
          type="button" onClick={getHandleToggleIndex(5)}
          color={getColor(getIsSelected(5))}>
          金
        </Button>
        <Button
          type="button" onClick={getHandleToggleIndex(6)}
          color={getColor(getIsSelected(6))}>
          土
        </Button>
      </div>
      <FieldAlert meta={meta} />
    </FieldContainer>
  )
}
