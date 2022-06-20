import GenderLabel from '@rooms/components/parts/accounts/GenderLabel'

export default function GenderCell ({ getValue }) {
  return <GenderLabel gender={getValue()} />
}
