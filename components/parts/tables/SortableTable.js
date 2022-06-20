
import classNames from 'classnames'

import { Table, Thead, Tbody, Tr, Td, Th } from '@/components/parts/tables'

export default function SortableTable ({ instance }) {
  const { getHeaderGroups, getRowModel } = instance
  return (
    <Table>
      {getHeaderGroups && (
        <Thead>
          {getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const {
                  column: {
                    getToggleSortingHandler,
                    getCanSort
                  }
                } = header
                return (
                  <Th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          onClick={getToggleSortingHandler()}
                          className={classNames({
                            'cursor-pointer select-none': getCanSort()
                          })}>
                          {header.renderHeader()}
                          {{
                            asc : ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      </>
                    )}
                  </Th>
                )
              })}
            </Tr>
          ))}
        </Thead>
      )}
      <Tbody>
        {getRowModel().rows.map(row => (
          <Tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <Td key={cell.id}>{cell.renderCell()}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
