import { useMemo } from 'react'

import { getRepeatLabel } from '@/services/schedule'

export default function RepeatLabel ({ schedule }) {
  const label = useMemo(() => getRepeatLabel(schedule), [schedule])
  return label
}
