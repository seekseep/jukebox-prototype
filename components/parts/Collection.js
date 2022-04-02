import Link from "next/link"

export default function Collection ({ ...props }) {
  return <ul className="flex flex-col" {...props} />
}

export function CollectionItem ({ ...props }) {
  return <li className="border-b flex-row bg-white px-2 py-1" {...props} />
}

export function CollectionLinkItem ({ href, ...props }) {
  return (
    <li className="border-b flex-row bg-white">
      <Link href={href} passHref>
        <a className="p-2 block hover:bg-gray-50 active:bg-gray-50" {...props} />
      </Link>
    </li>
  )
}

export function CollectionPlaceholder ({...props}) {
  return (
    <li className="py-12 px-4 text-gray-600 text-center" {...props} />
  )
}
