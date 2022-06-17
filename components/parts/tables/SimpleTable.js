import { Table, Thead, Tbody, Tr, Td, Th, Tfoot } from '@/components/parts/tables'

export default function SimpleTable ({ getHeaderGroups, getRowModel, getFooterGroups }) {
  return (
    <Table>
      {getHeaderGroups && (
        <Thead>
          {getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </Th>
              ))}
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
      {getFooterGroups && (
        <Tfoot>
          {getFooterGroups().map(footerGroup => (
            <Tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <Th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderFooter()}
                </Th>
              ))}
            </Tr>
          ))}
        </Tfoot>
      )}
    </Table>
  )
}
