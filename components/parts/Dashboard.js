export default function DashBoard (props) {
  return <div className="min-h-screen w-full flex" {...props}/>
}

export function DashboardMain (props) {
  return <div className="flex-grow flex flex-col gap-0" {...props} />
}

export function DashboardHead (props) {
  return <div className="border-b p-4" {...props}/>
}

export function DashboardTitle (props) {
  return <div className="font-bold text-lg px-2 py-1" {...props}/>
}
