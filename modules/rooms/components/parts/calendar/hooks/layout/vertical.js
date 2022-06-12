import { useContext, createContext } from 'react'

export const DEFAULT_HEAD_ROW_HEIGHT = 8
export const DEFAULT_HOUR_ROW_HEIGHT = 10
export const DEFAULT_LESSON_COL_WIDTH = 20
export const DEFAULT_LESSON_COLS_COUNT = 3

const VerticalLayoutContext = createContext()

export function VerticalLayoutProvider ({
  headRowHeight = DEFAULT_HEAD_ROW_HEIGHT,
  hourRowHeight = DEFAULT_HOUR_ROW_HEIGHT,
  lessonColWidth = DEFAULT_LESSON_COL_WIDTH,
  lessonColsCount = DEFAULT_LESSON_COLS_COUNT,
  ...props
}) {
  return (
    <VerticalLayoutContext.Provider
      value={{
        headRowHeight,
        hourRowHeight,
        lessonColWidth,
        lessonColsCount,
      }}
      {...props} />
  )
}

export function useLayoutContext () {
  return useContext(VerticalLayoutContext)
}

export function useHeadColStyle(style = {}) {
  return useMemo(() => ({
    ...style,
    zIndex: Z_INDEX.HEAD_COL,
  }), [style])
}

export function useBodyColStyle(style) {
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

export function useLessonStyle ({ start, duration, row }) {
  const { lessonRowHeight, hourColWidth } = useCalendarContext()
  return useMemo(() => ({
    top   : `${row  * lessonRowHeight}rem`,
    width : `${duration * hourColWidth}rem`,
    left  : `${start * hourColWidth}rem`,
    zIndex: row + Z_INDEX.LESSON
  }), [duration, hourColWidth, lessonRowHeight, row, start])
}
