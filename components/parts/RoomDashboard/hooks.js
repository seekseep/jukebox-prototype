import classNames from "classnames";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useGetRoomLink } from "../../../hooks/rooms";

export function useGetNavLinkProps ({ roomId }) {
  const { asPath: currentPathname } = useRouter()
  const getRoomLink = useGetRoomLink(roomId)

  return useCallback(({ pathname, ...props }) => {
    const href = getRoomLink(pathname)
    const isActive = new RegExp(`^${href}`).test(currentPathname)

    return {
      href,
      className: classNames(
        'px-4 py-2 hover:bg-gray-700 text-sm',
        { "bg-gray-900 font-bold": isActive }
      ),
      ...props
    }
  }, [currentPathname, getRoomLink])
}
