import { ICON } from '@/constatnts'

const iconStyle = { fontSize: '125%', lineHeight: 1 }

export function Container ({ children }) {
  return <span className="mr-2" style={iconStyle}>{children}</span>
}

export function SchoolIcon () {
  return <Container>{ICON.SCHOOL}</Container>
}


export function RoomIcon () {
  return <Container>{ICON.ROOM}</Container>
}
