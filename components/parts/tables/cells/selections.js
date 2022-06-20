import IndeterminateCheckbox from '@/components/parts/tables/IndeterminateCheckbox'

export function SelectCheckBoxHeaderCell ({ instance }) {
  return (
    <IndeterminateCheckbox
      {...{
        checked      : instance.getIsAllRowsSelected(),
        indeterminate: instance.getIsSomeRowsSelected(),
        onChange     : instance.getToggleAllPageRowsSelectedHandler(),
      }}
    />
  )
}

export function SelectCheckBoxCell ({ row }) {
  return (
    <label className="px-1 flex justify-center items-center">
      <IndeterminateCheckbox
        {...{
          checked      : row.getIsSelected(),
          indeterminate: row.getIsSomeSelected(),
          onChange     : row.getToggleSelectedHandler(),
        }}
      />
    </label>
  )
}
