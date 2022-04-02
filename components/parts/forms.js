import { useFormikContext, useField } from 'formik'

export function Select ({...props}) {
  return <select className="bg-white rounded border p-2" {...props} />
}

export function Form ({...props}) {
  const { handleSubmit } = useFormikContext()

  return <form onSubmit={handleSubmit} className="flex flex-col gap-4" {...props} />
}

export function Label ({ ...props }) {
  return <label className="" {...props} />
}

export function Input ({ type = 'text', ...props}) {
  return <input className="border rounded p-2" type={type} {...props}/>
}


export function Field ({label, ...props }) {
  const [field, meta, helpers] = useField(props)
  return (
    <div className="flex flex-col gap-2">
      {label && <Label>{label}</Label>}
      <Input {...field} {...props} />
      {meta.touched && meta.error ? (
         <div className="text-red-500">{meta.error}</div>
       ) : null}
    </div>
  )
}
