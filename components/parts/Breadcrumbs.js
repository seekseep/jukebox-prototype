import Link from 'next/link'

export default function Breadcrumbs ({ children }) {
  return (
    <div className="text-sm flex gap-1 text-gray-600 px-4 py-2">{children}</div>
  )
}

export function BreadcrumbsLinkItem ({ href, children }) {
  return (
    <>
      <Link href={href} passHref>
        <a className="underline block px-2">{children}</a>
      </Link>
      <span className="select-none">{'>'}</span>
    </>
  )
}

export function BreadcrumbsCurrentItem ({ children }) {
  return (
    <div className="font-bold px-2">{children}</div>
  )
}
