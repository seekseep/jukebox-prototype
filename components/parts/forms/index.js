import { useCallback, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import { useFormikContext, useField } from 'formik'
import ReactSelect from 'react-select'
import CreatableReactSelect from 'react-select/creatable'

import { getDatetimeLocalValue, getTimeValue, getDateValue } from '@/services/input'

export function Select ({ className, ...props }) {
  return <select className={classNames(className, 'bg-white rounded border p-2')} {...props} />
}

export function Form ({ ...props }) {
  const { handleSubmit, errors } = useFormikContext()

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.info(
        Object.entries(([key, value]) => `${key}: ${value}`).join('\n'),
        errors
      )
    }
  }, [errors])

  return <form onSubmit={handleSubmit} className="flex flex-col gap-4" {...props} />
}

export function FormActions ({ ...props }) {
  return <div className="flex flex-row-reverse justify-between" {...props} />
}

export function Label ({ ...props }) {
  return <label className="" {...props} />
}

const inputClassName = 'border rounded p-2 leading-none shadow-sm focus:shadow'

export function Input ({ type = 'text', className = '', ...props }) {
  return <input className={classNames(className, inputClassName)} type={type} {...props}/>
}

export function Textarea ({ className, ...props }) {
  return <textarea className={classNames(className, inputClassName)} {...props}/>
}


export function DateField({ label, type, ...props }) {
  const [field, meta, helpers] = useField(props)

  const inputValue = useMemo(() => {
    const date = field.value || new Date()

    switch(type) {
      case 'time':
        return getTimeValue(date)
      case 'date':
        return getDateValue(date)
      case 'datetime-local':
      default:
        return getDatetimeLocalValue(date)
    }
  },[field.value, type])

  const handleChange = useCallback(({ target: { value } }) => helpers.setValue(value ? new Date(value) : null), [helpers])

  return (
    <FieldContainer>
      {label && <Label>{label}</Label>}
      <Input type={type} {...field} value={inputValue} onChange={handleChange} {...props} />
      <FieldAlert meta={meta} />
    </FieldContainer>
  )
}

export function FieldContainer (props) {
  return <div className="flex flex-col gap-2 w-full" {...props} />
}

export function FieldAlert ({ meta }) {
  if (!meta.touched || !meta.error) return null
  return <div className="text-red-500">{meta.error}</div>
}

export function FieldHelper ({ helper }) {
  if (!helper) return null
  return <div className="text-gray-700 text-sm">{helper}</div>
}

export function Field ({ label, type, children, ...props }) {
  const [field, meta] = useField(props)

  return (
    <FieldContainer>
      {label && <Label>{label}</Label>}
      {type === 'select' ? (
        <Select {...field} {...props}>{children}</Select>
      ) : type === 'textarea' ? (
        <Textarea {...field} {...props}>{children}</Textarea>
      ) : (
        <Input type={type} {...field} {...props} />
      )}
      <FieldAlert meta={meta} />
    </FieldContainer>
  )
}

export function CheckBoxField({ label, ...props }) {
  const [ field, meta ] = useField(props)
  return (
    <FieldContainer>
      <label className="flex flex-row gap-2 items-center">
        <input type="checkbox" checked={field.value} {...field} />
        {label && <div>{label}</div>}
      </label>
      <FieldAlert meta={meta} />
    </FieldContainer>
  )
}

export function SelectField ({ label, options, helper, isMulti = false, ...props }) {
  const [field, meta, { setValue }] = useField(props)

  return (
    <FieldContainer>
      {label && <Label>{label}</Label>}
      <ReactSelect
        instanceId={props.name} isMulti={isMulti}
        options={options} noOptionsMessage={() => '項目がありません'}
        {...field} onChange={setValue}
        {...props} />
      <FieldHelper helper={helper} />
      <FieldAlert meta={meta} />
    </FieldContainer>
  )
}

export function CreatableSelectField ({ label, isMulti = false, ...props }) {
  const [field, meta, { setValue }] = useField(props)

  return (
    <FieldContainer>
      {label && <Label>{label}</Label>}
      <CreatableReactSelect
        instanceId={props.name} isMulti={isMulti}
        {...field}  onChange={setValue} noOptionsMessage={() => '項目がありません'}
        {...props} />
      <FieldAlert meta={meta} />
    </FieldContainer>
  )
}
