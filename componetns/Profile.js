import useSWR from 'swr'

export default function Profile({ id }) {
  const { data, error } = useSWR(`/users/${id}`)

  if (error) return <div>failed to load</div>

  if (!data) return <div>loading...</div>

  return <div>hello {data.firstName}!</div>
}
