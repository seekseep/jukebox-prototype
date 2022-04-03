import Navigation from './Navigation'

export default function Board () {
  return (
    <>
      <Navigation />
      {Array.from({ length: 20 }).fill(null).map((_, index) => (
        <div key={index} className="flex">
          <div className="w-48 border-r flex items-streach sticky left-0 top-0 z-[1000] flex-shrink-0 bg-white">
            <div className="flex-grow flex flex-col border-b justify-center">
              <div className="px-2 sticky top-40">講師 {index+1}</div>
            </div>
            <div className="flex flex-col">
              <div className="p-1 text-sm h-8 border-b">月</div>
              <div className="p-1 text-sm h-8 border-b">火</div>
              <div className="p-1 text-sm h-8 border-b">水</div>
              <div className="p-1 text-sm h-8 border-b">木</div>
              <div className="p-1 text-sm h-8 border-b">金</div>
            </div>
          </div>
          <div className="flex flex-col">
            {Array.from({ length: 5 }).fill(null).map((_, day) => (
              <div key={day} className="flex">
                {Array.from({ length: 24 }).fill(null).map((_, hour) => (
                    <div key={hour} className="flex">
                      {Array.from({ length: 6 }).fill(null).map((_, minute) => (
                        <div key={minute} className="flex-shrink-0 h-8 w-4 border-b border-r"></div>
                      ))}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>


  )
}
