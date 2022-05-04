export function Feature ({ children }) {
  return <section className="flex flex-col gap-4">{children}</section>
}

export function FeatureHead ({ children }) {
  return <header className="flex flex-row gap-2 items-start">{children}</header>
}

export function FeatureTitle ({ children }) {
  return <h1 className="flex-grow text-2xl">{children}</h1>
}
