import List, { LinkItem } from '../List'

export default function SchoolList ({ schools, urlBase = '/schools' }) {
  return (
    <List>
      {schools.map((school) =>
        <LinkItem key={school.id} href={`${urlBase}/${school.id}`}>
          {school.name}
        </LinkItem>
      )}
    </List>
  )
}
