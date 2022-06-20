import { Button } from '../buttons'
import { Select } from '../forms'

export default function Pagination ({ instance }) {
  const {
    setPageIndex,
    nextPage,
    previousPage,
    getCanPreviousPage,
    getCanNextPage,
    getPageCount,
    setPageSize
  } = instance
  return (
    <div className="flex gap-3 flex-wrap p-2">
      <div className="flex gap-2">
        <Button size="sm" color="secondary" disabled={!getCanPreviousPage()} onClick={() => setPageIndex(0)}>⏪</Button>
        <Button size="sm" color="secondary" disabled={!getCanPreviousPage()} onClick={() => previousPage()}>◀</Button>
        <Button size="sm" color="secondary" disabled={!getCanNextPage()} onClick={() => nextPage()}>▶</Button>
        <Button size="sm" color="secondary" disabled={!getCanNextPage()} onClick={() => setPageIndex(getPageCount() - 1)}>⏩</Button>
      </div>
      <div className="flex gap-2 items-center">
        件数
        <Select size="sm" onChange={(event) => setPageSize(Number(event.target.value))}>
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}
