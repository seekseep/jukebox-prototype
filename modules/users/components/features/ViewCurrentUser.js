import Suspension from '@/components/parts/Suspension'
import { useCurrentUser } from '@/hooks/auth'

export default function ViewCurrentUser (){
  const result = useCurrentUser()

  return (
    <Suspension {...result}>
      {({ data: currentUser }) => (
        <div className="bg-white">
          <div className="max-w-4xl mx-auto h-32 pt-8 flex flex-col gap-1 px-4">
            <div className="text-gray-800 text-sm">ようこそ</div>
            <div className="align-bottom">
              <span className="text-xl">{currentUser?.name}</span>
              <span className="ml-1 text-sm text-gray-800">さん</span>
            </div>
          </div>
        </div>
      )}
    </Suspension>
  )
}
