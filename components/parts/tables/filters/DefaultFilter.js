import DebouncedInput from '../DebouncedInput'

export default function Filter({ column }){
  return (
    <div>
      <DebouncedInput
        type="text" size="sm"
        value={column.getFilterValue() ?? ''}
        onChange={(value) => column.setFilterValue(value)}  />
    </div>
  )
}
