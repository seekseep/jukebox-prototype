import Link from 'next/link'

export default function FeatureCard ({ href, icon, label, description }) {
  return (
    <Link href={href}>
      <a className="bg-white rounded shadow block">
        <div className="flex gap-4 items-center p-4">
          <div className="text-4xl">{icon}</div>
          <div className="text-lg">{label}</div>
        </div>
        {description && (
          <div className="border-t py-2 px-4 text-sm">
            {description}
          </div>
        )}
      </a>
    </Link>
  )
}
