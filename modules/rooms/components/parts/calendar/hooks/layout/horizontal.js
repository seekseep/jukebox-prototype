import { useContext, useMemo, createContext } from 'react'

import { Z_INDEX } from '@rooms/components/parts/calendar/hooks/layout'

export const DEFAULT_HEAD_COL_WIDTH = 10
export const DEFAULT_HOUR_COL_WIDTH = 12
export const DEFAULT_LESSON_ROW_HEIGHT = 2
export const DEFAULT_LESSON_ROWS_COUNT = 3

const HorizontalLayoutContext = createContext()

export function HorizontalLayoutProvider ({
  headColWidth = DEFAULT_HEAD_COL_WIDTH,
  hourColWidth = DEFAULT_HOUR_COL_WIDTH,
  lessonRowHeight = DEFAULT_LESSON_ROW_HEIGHT,
  lessonRowsCount = DEFAULT_LESSON_ROWS_COUNT,
  ...props
}) {
  return (
    <HorizontalLayoutContext.Provider
      value={{
        headColWidth,
        hourColWidth,
        lessonRowHeight,
        lessonRowsCount,
      }}
      {...props} />
  )
}

export function useLayoutContext() {
  return useContext(HorizontalLayoutContext)
}

export function useLessonStyle ({ start, duration, row }) {
  const { lessonRowHeight, hourColWidth } = useLayoutContext()
  return useMemo(() => ({
    top   : `${row  * lessonRowHeight}rem`,
    width : `${duration * hourColWidth}rem`,
    left  : `${start * hourColWidth}rem`,
    zIndex: row + Z_INDEX.LESSON
  }), [duration, hourColWidth, lessonRowHeight, row, start])
}

export function useHeadColStyle (style = {}) {
  return useMemo(() => ({
    ...style,
    zIndex: Z_INDEX.HEAD_COL,
  }), [style])
}

export function useBodyColStyle(style = {}) {
  return useMemo(() => ({
    ...style,
    zIndex: Z_INDEX.BODY_COL
  }), [style])
}

export function useLessonContainerStyle(style) {
  return useMemo(() => ({
    ...style,
    zIndex: Z_INDEX.CALENDAR
  }), [style])
}
