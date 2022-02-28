import Link from "next/link"

export default function MenuItem ({ href, children }) {
  return (
    <Link href={href} passHref>
      <a className="flex px-4 py-2 cursor-pointer">
        {children}
      </a>
    </Link>
  )
}
