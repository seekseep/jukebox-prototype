import { useCallback, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import { useFormikContext, useField } from 'formik'
import ReactSelect from 'react-select'
import CreatableReactSelect from 'react-select/creatable'
import { startOfWeek, add } from 'date-fns'

import {
  getDatetimeLocalValue,
  getTimeValue,
  getDateValue,
  getWeekValue,
  getMonthValue
} from '@/services/input'

export function Select ({ className, size = 'md', disabled = false, ...props }) {
  return (
    <select
      className={
        classNames(
          className,
          'bg-white rounded border p-2',
          {
            'p-2'        : size === 'md',
            'p-2 text-sm': size === 'sm',
            'bg-gray-50' : disabled
          }
        )
      }
      disabled={disabled}
      {...props} />
  )
}

export function FieldGroup ({ children })  {
  return (
    <div className="flex gap-3 md:flex-nowrap">
      {children}
    </div>
  )
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

function useInputClassName({ className, size = 'md', disabled = false }) {
  return classNames(
    className,
    'border rounded leading-none shadow-sm focus:shadow',
    {
      'bg-gray-50' : disabled === true,
      'shadow-sm'  : disabled === false,
      'p-1 text-sm': size === 'sm',
      'p-2'        : size === 'md',
    }
  )
}

export function Input ({ type = 'text', size = 'md', className = '', disabled = false, ...props }) {
  const inputClassName = useInputClassName({ className, size, disabled })


  return <input className={inputClassName} type={type} disabled={disabled} {...props}/>
}

export function Textarea ({ className = '', size = 'md', disabled = false, ...props }) {
  const inputClassName = useInputClassName({ className, size, disabled })

  return <textarea className={inputClassName} disabled={disabled} {...props}/>
}

function useDateFieldInputValue(value, type) {
    return useMemo(() => {
      if (!value) return ''
      const date = value || ''
      switch(type) {
        case 'time':
          return getTimeValue(date)
        case 'date':
          return getDateValue(date)
        case 'week':
          return getWeekValue(date)
        case 'month':
          return getMonthValue(date)
        case 'datetime-local':
        default:
          return getDatetimeLocalValue(date)
      }
    },[value, type])
}

function valueToDate (value, type) {
  if (!value) return null

  if (type === 'week') {
    const [year, weeks ] = value.split('-W').map(Number)

    return startOfWeek(
      add(
        new Date(year, 0, 1), { weeks: weeks - 1 }
      )
    )
  }

  return new Date(value)
}

export function DateField({ label, type, ...props }) {
  const [field, meta, helpers] = useField(props)
  const inputValue = useDateFieldInputValue(field.value, type)


  const handleChange = useCallback(({ target: { value } }) => {
    helpers.setValue(valueToDate(value, type))
  }, [helpers])
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

export function CreatableSelectField ({ label, isMulti = false, options, ...props }) {
  const [field, meta, { setValue }] = useField(props)

  return (
    <FieldContainer>
      {label && <Label>{label}</Label>}
      <CreatableReactSelect
        instanceId={props.name} isMulti={isMulti} options={options}
        {...field}  onChange={setValue} noOptionsMessage={() => '項目がありません'}
        {...props} />
      <FieldAlert meta={meta} />
    </FieldContainer>
  )
}
