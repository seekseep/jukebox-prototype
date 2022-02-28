import { useRouter } from "next/router"

const rooms = [
  {
    id: "room-a",
    name: "教室 A"
  },
  {
    id: "room-b",
    name: "教室 B"
  },
  {
    id: "room-c",
    name: "教室 C"
  },
  {
    id: "room-d",
    name: "教室 D"
  },
]

export function useRoom(roomId) {
  return rooms.find(room => room.id === roomId)
}

export function useRooms () {
  return rooms
}

export function useCurrentRoomId() {
  const {
    query:{
      roomId: currentRoomId
    }
  } = useRouter()

  return currentRoomId
}

export function useCurrentRoom () {
  const currentRoomId = useCurrentRoomId()
  const currentRoom = useRoom(currentRoomId)
  return currentRoom
}
