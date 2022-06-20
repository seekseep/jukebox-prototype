import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'

import {
  useTableInstance,
  createTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getSortedRowModel,
} from '@tanstack/react-table'

import { Input } from '@/components/parts/forms'

import SortableTable from '@/components/parts/tables/SortableTable'
import Pagination from '@/components/parts/tables/Pagination'
import GenderCell from '@/components/parts/tables/cells/GenderCell'
import { DateCell } from '@/components/parts/tables/cells/dates'
import { useGetRoomPath } from '@rooms/hooks/router'
import { Button } from '@/components/parts/buttons'
import { SelectCheckBoxCell, SelectCheckBoxHeaderCell } from '@/components/parts/tables/cells/selections'
import { fuzzySort } from '@/services/tables'
import { useSelection } from '@/hooks/tables'
import { useEffect } from 'react'

const table = createTable()
  .setOptions({
    sortingFns: {
      fuzzy: fuzzySort,
    },
  })


export default function StudentsTable ({
  roomId,
  students,
  onDownloadCalendars,
  onEdit,
  onDelete
}) {
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState ({ pageIndex: 0, pageSize: 10 })
  const getRoomPath = useGetRoomPath(roomId)

  const columns = useMemo(() => ([
    table.createDisplayColumn({
      id    : 'select',
      header: SelectCheckBoxHeaderCell,
      cell  : SelectCheckBoxCell,
    }),
    table.createGroup({
      accessorKey: 'name',
      header     : '氏名',
      cell       : ({ getValue, row: { original } }) => (
        <Link href={getRoomPath(`/students/${original.id}`)} passHref>
          <a className="text-blue-500 underline">{getValue() ?? '未設定'}</a>
        </Link>
      )
    }),
    table.createGroup({
      accessorKey: 'nameKana',
      header     : 'フリガナ',
    }),
    table.createGroup({
      accessorKey: 'gender',
      header     : '性別',
      cell       : GenderCell,
    }),
    table.createGroup({
      accessorKey: 'bornedAt',
      header     : '生年月日',
      cell       : DateCell,
    }),
    table.createGroup({
      accessorKey: 'schoolName',
      header     : '学校名',
    }),
    table.createGroup({
      accessorKey: 'schoolGrade',
      header     : '学年',
    }),
  ]), [getRoomPath])

  const instance = useTableInstance(table, {
    data           : students,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state          : {
      pagination,
      columnFilters,
      globalFilter,
      rowSelection,
    },
    defaultColumn: {
      footer   : null,
      filterFn : 'fuzzy',
      sortingFn: 'fuzzy'
    },

    // Note; Pagination
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange   : setPagination,
    getPaginationRowModel: getPaginationRowModel(),

    // Note: Filter
    globalFilterFn        : 'fuzzy',
    onGlobalFilterChange  : setGlobalFilter,
    onColumnFiltersChange : setColumnFilters,
    getFilteredRowModel   : getFilteredRowModel(),
    getFacetedRowModel    : getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),

    // NOTE: Sort
    getSortedRowModel: getSortedRowModel(),

    // NOTE: Selection
    onRowSelectionChange: setRowSelection,

    // NOTE: Debug
    debugTable  : true,
    debugHeaders: true,
    debugColumns: false
  })

  const selection = useSelection(students, rowSelection)
  const selectedStudents = useMemo(() => selection.map(({ data: student }) => student), [selection])

  const handleDownloadCalendarsStart = useCallback(() => {
    onDownloadCalendars(selectedStudents)
  }, [onDownloadCalendars, selectedStudents])

  const handleEditStart = useCallback(() => {
    onEdit(selectedStudents)
  }, [onEdit, selectedStudents])

  const handleDelete = useCallback(() => {
    if (!confirm('生徒を削除しますか？')) return
    onDelete(selectedStudents)
  }, [onDelete, selectedStudents])

  useEffect(() => {
    setRowSelection({})
  }, [students])

  return (
    <>
      <div className="p-2 bg-gray-50 border-b">
        <div className="flex gap-2 items-center">
          <label className="text-sm px-2">検索</label>
          <Input type="text" size="sm" value={globalFilter} onChange={(event) => setGlobalFilter(event.target.value)} />
        </div>
      </div>
      <div className="w-full overflow-auto">
        <SortableTable instance={instance} />
      </div>
      <Pagination instance={instance} />
      {selection.length > 0 && (
        <>
          <div className="flex gap-2 flex-wrap p-2">
            {selection.map(({ index, data: student }) => (
              <div className="flex bg-gray-100 border rounded items-streach" key={index}>
                <div className="py-1 px-2 text-sm">{student.name}</div>
                <button className="p-1 text-xs hover:bg-gray-200" onClick={() => setRowSelection(s => ({ ...s, [index]: false }))}>❌</button>
              </div>
            ))}
          </div>
          <div className="flex p-2 gap-2 flex-row-reverse">
            <Button type="button" color="seconday" size="sm" onClick={handleDownloadCalendarsStart}>カレンダーをダウンロードする</Button>
            <Button type="button" color="seconday" size="sm" onClick={handleEditStart}>編集する</Button>
            <Button type="button" color="danger" size="sm" onClick={handleDelete}>削除する</Button>
          </div>
        </>
      )}
    </>
  )
}
