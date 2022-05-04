import ReactSelect from 'react-select'
import CreatableReactSelect from 'react-select/creatable'
import { useFormikContext, useField } from 'formik'
import classNames from 'classnames'

export function Select ({ className, ...props }) {
  return <select className={classNames(className, 'bg-white rounded border p-2')} {...props} />
}

export function Form ({ ...props }) {
  const { handleSubmit } = useFormikContext()

  return <form onSubmit={handleSubmit} className="flex flex-col gap-4" {...props} />
}

export function Label ({ ...props }) {
  return <label className="" {...props} />
}

export function Input ({ type = 'text', className = '', ...props }) {
  return <input className={classNames(className, 'border rounded p-2 leading-none shadow-sm focus:shadow')} type={type} {...props}/>
}

export function FieldContainer (props) {
  return <div className="flex flex-col gap-2" {...props} />
}

export function Field ({ label, ...props }) {
  const [field, meta, helpers] = useField(props)
  return (
    <FieldContainer>
      {label && <Label>{label}</Label>}
      <Input {...field} {...props} />
      {meta.touched && meta.error ? (
         <div className="text-red-500">{meta.error}</div>
       ) : null}
    </FieldContainer>
  )
}

export function SelectField ({ label, options, isMulti = false, ...props }) {
  const [field, meta, { setValue }] = useField(props)

  return (
    <FieldContainer>
      {label && <Label>{label}</Label>}
      <ReactSelect isMulti={isMulti} options={options} {...field} onChange={setValue} {...props} />
      {meta.touched && meta.error ? (
         <div className="text-red-500">{meta.error}</div>
       ) : null}
    </FieldContainer>
  )
}

export function CreatableSelectField ({ label, ...props }) {
  const [field, meta, { setValue }] = useField(props)
  return (
    <FieldContainer>
      {label && <Label>{label}</Label>}
      <CreatableReactSelect {...field} onChange={setValue} {...props} />
      {meta.touched && meta.error ? (
         <div className="text-red-500">{meta.error}</div>
       ) : null}
    </FieldContainer>
  )
}
