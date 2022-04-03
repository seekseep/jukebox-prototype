import { Select } from '../../forms'

export default function Navigation (){
  return (
    <>
      <div className="fixed top-16 h-12 left-0 right-0 flex bg-white border-b z-[1002]">
        <div className="w-48 flex-shrink-0 bg-gray-50 p-1 flex flex-col items-stretch border-r">
          <Select>
            <option value="">講師</option>
            <option value="">生徒</option>
            <option value="">科目</option>
            <option value="">席</option>
          </Select>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-3 items-stretch leading-none h-12 p-2 sticky left-48">
            <button className="bg-gray-100 rounded p-2">⬅</button>
            <div className="flex items-center gap-2">
              <div>第1週</div>
              <div className="flex gap-1">
                <div>4月1日</div>
                <div>~</div>
                <div>4月7日</div>
              </div>
            </div>
            <button className="bg-gray-100 rounded p-2">➡</button>
          </div>
        </div>
       </div>
       <div className="pt-28 sticky top-0 z-[1001] bg-white">
        <div className="flex">
          <div className="w-48 border-r border-b flex-shrink-0 sticky left-0 bg-white" />
          {Array.from({ length: 24 }).fill(null).map((_, index) => (
            <div key={index} className="flex flex-col text-sm bg-white">
              <div className="px-2 pt-1 border-r">{index}:00</div>
              <div className="flex">
                {Array.from({ length: 6 }).fill(null).map((_, index) => (
                  <div key={index} className="w-4 h-2 border-r" />
                ))}
              </div>
            </div>
          ))}
          <div className="w-64 flex-shrink-0" />
          <div className="w-8 flex-shrink-0" />
        </div>
      </div>
    </>
  )
}
