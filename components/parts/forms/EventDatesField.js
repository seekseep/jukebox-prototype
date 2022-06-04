import { useCallback, useMemo } from 'react'
import { useField } from 'formik'
import { CheckBoxField, Label, Input,FieldContainer, FieldAlert } from '.'
import { format, getYear, getMonth, getDate, getHours, getMinutes } from 'date-fns'

export default function EventDatesFields ({
  label,
  startedAtName = 'startedAt',
  finishedAtName = 'finishedAt',
  isAllDayName = 'isAllDay',
  isEnabnledIsAllDay = false
}) {
  const [startedAtField, startedAtMeta, startedAtHelper ] = useField(startedAtName)
  const [finishedAtField, finishedAtMeta, finishedAtHelper ] = useField(finishedAtName)
  const [isAllDayField ] = useField(isAllDayName)

  const handleChangeStartDate = useCallback((event) => {
    if (!event.target.value) return startedAtHelper.setValue(null)

    const current = startedAtField.value || new Date()
    const changed = new Date(event.target.value)

    startedAtHelper.setTouched(true)
    startedAtHelper.setValue(new Date(
      getYear(changed),
      getMonth(changed),
      getDate(changed),
      getHours(current),
      getMinutes(current)
    ))

    if (!finishedAtMeta.touched) {
      const current = finishedAtField.value || new Date()
      finishedAtHelper.setValue(new Date(
        getYear(changed),
        getMonth(changed),
        getDate(changed),
        getHours(current),
        getMinutes(current)
      ))
    }
  }, [finishedAtField.value, finishedAtHelper, finishedAtMeta.touched, startedAtField.value, startedAtHelper])
  const handleChangeStartTime = useCallback((event) => {
    if (!event.target.value) return startedAtHelper.setValue(null)

    const current = startedAtField.value || new Date()
    const [hours, mintues] = event.target.value.split(':').map(Number)

    startedAtHelper.setTouched(true)
    startedAtHelper.setValue(new Date(
      getYear(current),
      getMonth(current),
      getDate(current),
      hours,
      mintues
    ))
  }, [startedAtField.value, startedAtHelper])
  const handleChangeFinishDate = useCallback((event) => {
    if (!event.target.value) return finishedAtHelper.setValue(null)

    const current = finishedAtField.value || new Date()
    const changed = new Date(event.target.value)

    finishedAtHelper.setTouched(true)
    finishedAtHelper.setValue(new Date(
      getYear(changed),
      getMonth(changed),
      getDate(changed),
      getHours(current),
      getMinutes(current)
    ))
  }, [finishedAtField.value, finishedAtHelper])
  const handleChangeFinishTime = useCallback((event) => {
    if (!event.target.value) return finishedAtHelper.setValue(null)

    const current = finishedAtField.value || new Date()
    const [hours, mintues] = event.target.value.split(':').map(Number)

    finishedAtHelper.setTouched(true)
    finishedAtHelper.setValue(new Date(
      getYear(current),
      getMonth(current),
      getDate(current),
      hours,
      mintues
    ))
  }, [finishedAtField.value, finishedAtHelper])

  const startDateValue = useMemo(() => {
    const startedAt = startedAtField.value

    if (!startedAt) return ''
    return format(startedAt, 'yyyy-MM-dd')
  }, [startedAtField.value])

  const startTimeValue = useMemo(() => {
    const startedAt = startedAtField.value
    if (!startedAt) return ''
    return format(startedAt, 'HH:mm')
  }, [startedAtField.value])

  const finishDateValue = useMemo(() => {
    const finishedAt = finishedAtField.value
    if (!finishedAt) return ''
    return format(finishedAt, 'yyyy-MM-dd')
  }, [finishedAtField.value])

  const finishTimeValue = useMemo(() => {
    const finishedAt = finishedAtField.value
    if (!finishedAt) return ''
    return format(finishedAt, 'HH:mm')
  }, [finishedAtField.value])

  const isShownStartTime = !isEnabnledIsAllDay || !isAllDayField.value
  const isShownFinishedAtFields = !isEnabnledIsAllDay || !isAllDayField.value

  return (
    <>
      <FieldContainer>
        <Label>{label}</Label>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex flex-col">
            <div className="flex gap-2">
              <Input type="date" value={startDateValue} onChange={handleChangeStartDate} />
              {isShownStartTime && <Input type="time" value={startTimeValue} onChange={handleChangeStartTime} />}
            </div>
            <FieldAlert meta={startedAtMeta} />
          </div>
          {isShownFinishedAtFields && (
            <>
              <div>~</div>
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <Input type="time" value={finishTimeValue} onChange={handleChangeFinishTime} />
                  <Input type="date" value={finishDateValue} onChange={handleChangeFinishDate} />
                </div>
                <FieldAlert meta={startedAtMeta} />
              </div>
            </>
          )}
        </div>
      </FieldContainer>
      {isEnabnledIsAllDay && (
        <CheckBoxField name={isAllDayName} label="終日" />
      )}
    </>
  )
}
