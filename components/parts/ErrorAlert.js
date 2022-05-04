export default function ErrorAlert ({ error }) {
  return <div className="bg-red-200 border-red-500 text-red-800 rounded p-2">{error?.message || <>予期せぬエラー</>}</div>
}
