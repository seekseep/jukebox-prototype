import Link from 'next/link'

export default function AppHeader () {
  return (
    <div className="bg-white border-b">
      <div className="max-w-4xl flex mx-auto">
        <Link href="/">
          <a className="p-2 font-bold block text-lg">JUKEBOX</a>
        </Link>
      </div>
    </div>
  )
}
