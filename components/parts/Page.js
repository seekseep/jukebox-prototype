import Head from 'next/head'

export default function Page ({ children, title }) {
  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </>
  )
}

export function PageContainer({ children }) {
  return <div className="max-w-4xl mx-auto flex flex-col gap-8 py-6">{children}</div>
}

export function PageSection ({ children }) {
  return <div className="px-4">{children}</div>
}
