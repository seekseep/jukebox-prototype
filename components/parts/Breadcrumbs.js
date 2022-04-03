import Link from 'next/link'

export default function Breadcrumbs ({ children }) {
  return (
    <div className="text-sm flex gap-2 text-gray-600 px-4">{children}</div>
  )
}

export function BreadcrumbsLinkItem ({ href, children }) {
  return (
    <>
      <Link href={href} passHref>
        <a className="underline">{children}</a>
      </Link>
      {'/'}
    </>
  )
}

export function BreadcrumbsCurrentItem ({ children }) {
  return (
    <div className="font-bold">{children}</div>
  )
}
