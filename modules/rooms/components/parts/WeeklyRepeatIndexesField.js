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

  return (
    <FieldContainer>
      {label && (
        <Label>{label}</Label>
      )}
      <div className="flex gap-2">
        <Button
          type="button" onClick={getHandleToggleIndex(0)}
          primary={getIsSelected(0)} secondary={!getIsSelected(0)}>
          日
        </Button>
        <Button
          type="button" onClick={getHandleToggleIndex(1)}
          primary={getIsSelected(1)} secondary={!getIsSelected(1)}>
          月
        </Button>
        <Button
          type="button" onClick={getHandleToggleIndex(2)}
          primary={getIsSelected(2)} secondary={!getIsSelected(2)}>
          火
        </Button>
        <Button
          type="button" onClick={getHandleToggleIndex(3)}
          primary={getIsSelected(3)} secondary={!getIsSelected(3)}>
          水
        </Button>
        <Button
          type="button" onClick={getHandleToggleIndex(4)}
          primary={getIsSelected(4)} secondary={!getIsSelected(4)}>
          木
        </Button>
        <Button
          type="button" onClick={getHandleToggleIndex(5)}
          primary={getIsSelected(5)} secondary={!getIsSelected(5)}>
          金
        </Button>
        <Button
          type="button" onClick={getHandleToggleIndex(6)}
          primary={getIsSelected(6)} secondary={!getIsSelected(6)}>
          土
        </Button>
      </div>
      <FieldAlert meta={meta} />
    </FieldContainer>
  )
}
