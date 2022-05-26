import { useToggleState } from '@/hooks/ui'

export default function CollectionManager ({
  conditionFields
}) {
  const [isConditionFieldsOpened, toggleConditionFields] = useToggleState()


  return (
      <div className="py-2 flex flex-col gap-2">
        <button className="flex flex-row justify-between px-2 py-2" onClick={toggleConditionFields}>
          <div>絞り込み</div>
          <div>{isConditionFieldsOpened ? '🔼' : '🔽'}</div>
        </button>
        {isConditionFieldsOpened && (
          <div>
            {conditionFields}
          </div>
        )}
      </div>
  )
}
