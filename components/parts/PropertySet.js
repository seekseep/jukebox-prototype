export default function PropertySet ({ ...props }) {
  return <dl className="flex flex-col" {...props}/>
}

export function PropertyItem ({ ...props }) {
  return <div className="flex flex-row border-b gap-2 items-start" {...props} />
}

export function PropertyLabel ({ ...props }) {
  return <dt className="w-32 p-2 flex-shrink-0 text-gray-700"  {...props} />
}

export function PropertyContents ({ ...props }) {
  return <dd className="flex-grow p-2 flex flex-col justify-start items-stretch"  {...props} />
}
