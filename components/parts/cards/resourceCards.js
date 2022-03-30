import Link from "next/link"

export function ResourceCardContainer (props) {
  return <div className="grid grid-cols-3 gap-3" {...props} />
}

export function ResouceCard (props) {
  return <a className="border rounded p-3 flex gap-3 h-24 items-center" {...props} />
}

export function ResouceIcon (props) {
  return <div className="text-3xl leading-none" {...props}/>
}

export function ResouceText (props) {
  return <div className="flex-grow" {...props} />
}

export function CreateSchoolCard ({ baseUrl }) {
  return (
    <Link href={`${baseUrl}/new`} passHref>
      <ResouceCard>
        <div className="text-center">学校を作成する</div>
      </ResouceCard>
    </Link>

  )
}

export function SchoolCard ({ school, baseUrl }) {
  return (
    <Link href={`${baseUrl}/${school.id}`} passHref>
      <ResouceCard>
        <ResouceIcon>🏫</ResouceIcon>
        <ResouceText>{school.name}</ResouceText>
      </ResouceCard>
    </Link>
  )
}

export function RoomCard ({ room }) {
  return (
    <ResouceCard>
      <ResouceIcon>🚪</ResouceIcon>
      <ResouceText>{room.name}</ResouceText>
    </ResouceCard>
  )
}
