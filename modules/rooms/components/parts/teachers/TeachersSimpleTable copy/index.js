import { useTableInstance, createTable, getCoreRowModel } from '@tanstack/react-table'
import SimpleTable from '@/components/parts/tables/SimpleTable'

import GenderCell from '@/components/parts/tables/cells/GenderCell'
import { DateCell } from '@/components/parts/tables/cells/dates'

const table = createTable()

const columns = [
  table.createGroup({
    id         : 'name',
    accessorKey: 'name',
    header     : '氏名',
    footer     : null
  }),
  table.createGroup({
    id         : 'nameKana',
    accessorKey: 'nameKana',
    header     : 'フリガナ',
    footer     : null
  }),
  table.createGroup({
    id         : 'gender',
    accessorKey: 'gender',
    header     : '性別',
    cell       : GenderCell,
    footer     : null
  }),
  table.createGroup({
    id         : 'bornedAt',
    accessorKey: 'bornedAt',
    header     : '生年月日',
    cell       : DateCell,
    footer     : null
  }),
  table.createGroup({
    id         : 'schoolName',
    accessorKey: 'schoolName',
    header     : '学校名',
    footer     : null
  }),
  table.createGroup({
    id         : 'schoolGrade',
    accessorKey: 'schoolGrade',
    header     : '学年',
    footer     : null
  }),
]

export default function TeachersTable ({ teachers }) {
  const instance = useTableInstance(table, {
    data           : teachers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <SimpleTable {...instance} />
}
