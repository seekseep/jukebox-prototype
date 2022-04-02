import classNames from "classnames"

export function Button ({ disabled, sm=false, primary = true, secondary = false, ...props}) {

  primary = primary && !secondary
  secondary = secondary

  return (
    <button
      className={classNames(
        "rounded p-2 border",
        {
          "text-sm": sm,
          "border-blue-600 bg-blue-500 text-white active:bg-blue-600 hover:bg-blue-400": primary,
          "border-gray-300 bg-gray-200 text-gray-900 active:bg-gray-300 hover:bg-gray-100": secondary,
          "opacity-50": disabled
        }
      )}
      {...props} />
  )
}
