import { useMemo } from 'react'

import { SelectField } from '@/components/parts/forms'

export default function AccountSelectField ({ accounts, ...props }) {
  const options = useMemo(() => {
    if (!accounts) return []

    return accounts.map(account => ({
      value: account.id,
      label: account.name,
      account
    }))
  }, [accounts])

  return <SelectField options={options} {...props} />
}
