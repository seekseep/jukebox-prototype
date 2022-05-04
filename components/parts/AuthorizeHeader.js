export default function AuthorizeHeader ({ icon, title }) {
  return (
    <div className="flex flex-col justify-center gap-5 items-center">
      {icon && <div className="text-5xl leading-none">{icon}</div>}
      {title && <div className="text-lg font-bold leading-none">{title}</div>}
    </div>
  )
}
