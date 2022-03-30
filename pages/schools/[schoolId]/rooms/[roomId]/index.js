import { useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { getMonth, getYear } from 'date-fns'

export default function Room () {
  const {  query: { schoolId, roomId } } = useRouter()

  const {
    year: currentYear,
    month: currentMonth,
  } = useMemo(() => {
    const now = new Date()
    return {
      year: getYear(now),
      month: getMonth(now) + 2,
    }
  }, [])

  const frames = useMemo(() => ([{
    id: 1,
    startedAt: "13:00",
    finishedAt: "13:55"
  },{
    id: 2,
    startedAt: "14:00",
    finishedAt: "14:55"
  },{
    id: 3,
    startedAt: "15:00",
    finishedAt: "15:55"
  },{
    id: 4,
    startedAt: "16:00",
    finishedAt: "16:55"
  },{
    id: 5,
    startedAt: "17:00",
    finishedAt: "17:55"
  }]), [])

  const teachers = useMemo(() => ([{
    id: 1,
    name: "田中",
    frames: [{
      id: 1,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }, {
      id: 2,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }, {
      id: 3,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }, {
      id: 4,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }, {
      id: 5,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }]
  }, {
    id: 2,
    name: "鈴木",
    frames: [{
      id: 1, lessons: [{
        id: 1, name: "数学講習",
        students: [
          { id: 1, name: "鈴木"},
          { id: 2, name: "木下"},
          { id: 3, name: "塚口"}
        ]
      }]
    }, {
      id: 2, lessons: [{
        id: 1, name: "数学講習",
        students: [
          { id: 1, name: "鈴木"},
          { id: 2, name: "木下"},
          { id: 3, name: "塚口"}
        ]
      }]
    }, {
      id: 3, lessons: [{
        id: 1, name: "数学講習",
        students: [
          { id: 1, name: "鈴木"},
          { id: 2, name: "木下"},
          { id: 3, name: "塚口"}
        ]
      }]
    }, {
      id: 4, lessons: [{
        id: 1, name: "数学講習",
        students: [
          { id: 1, name: "鈴木"},
          { id: 2, name: "木下"},
          { id: 3, name: "塚口"}
        ]
      }]
    }, {
      id: 5, lessons: [{
        id: 1, name: "数学講習",
        students: [
          { id: 1, name: "鈴木"},
          { id: 2, name: "木下"},
          { id: 3, name: "塚口"}
        ]
      }]
    }]
  },{
    id: 3,
    name: "三上",
    frames: [{
      id: 1,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }, {
      id: 2,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }, {
      id: 3,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }, {
      id: 4,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }, {
      id: 5,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }]
  },{
    id: 4,
    name: "長谷川",
    frames: [{
      id: 1,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }, {
      id: 2,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }, {
      id: 3,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }, {
      id: 4,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }, {
      id: 5,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }]
  },{
    id: 5,
    name: "棚上",
    frames: [{
      id: 1,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }, {
      id: 2,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }, {
      id: 3,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }, {
      id: 4,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }, {
      id: 5,
      lessons: [{
        id: 1, name: "個人国語",
        students: [{
          id: 1, name: "森"
        }]
      }, {
        id: 2, name: "個人数学",
        students: [{
          id: 1, name: "鈴木"
        }]
      }]
    }]
  }]), [])

  return (
    <div className="p-12 flex flex-col gap-6">
      <div className="flex gap-4 text-lg">
        <div>
          <Link href={`/schools/${schoolId}`}>
            <a className="text-blue-500 underline">サンプル塾</a>
          </Link>
        </div>
        <div>/</div>
        <div className="font-bold">北教室</div>
      </div>

      <div className="bg-blue-50 p-2 px-4 rounded">
        <Link href={`/schools/${schoolId}/rooms/${roomId}/schedule/${currentYear}/${currentMonth}/edit`}>
          <a className="text-blue-500 underline">
            来月の予定を作成する
          </a>
        </Link>
      </div>

      <div className="flex">
        <div className="text-2xl font-bold">今日の予定</div>
      </div>
      <div className="overflow-auto border">
        <div className="flex">
          <div className="w-36 border-r border-b flex-shrink-0"></div>
          {frames.map(frame => (
            <div key={frame.id} className="w-64 border-r border-b text-center flex-shrink-0">
              {frame.startedAt} ~ {frame.finishedAt}
            </div>
          ))}
        </div>
        {teachers.map(teacher =>
          <div key={teacher.id} className="flex">
            <div className="w-36 flex-shrink-0 flex justify-center items-center p-2 border-b border-r sticky left-0 bg-white">
              <div>{teacher.name}</div>
            </div>
            {teacher.frames.map(frame =>
              <div key={frame.id} className="w-64 border-r border-b text-center flex-shrink-0 p-1 flex flex-col gap-1">
                {frame.lessons.map(lesson => (
                  <div key={lesson.id} className="bg-gray-100 p-1 px-2 flex items-start gap-1 text-sm rounded">
                    <div className="p-1">{lesson.name}</div>
                    <div className="flex flex-grow flex-col items-end gap-1 p-1">
                      {lesson.students.map(student => (
                        <div key={student.id}>
                          {student.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}


// export default function Room () {
//
//   return (
//     <div className="flex min-h-screen">
//       <div className="w-52 border-r flex flex-col">
//         <Link href={`/rooms/${roomId}/schedule`}>
//           <a className="p-2 border-b">授業予定</a>
//         </Link>
//         <Link href={`/rooms/${roomId}/students`}>
//           <a className="p-2 border-b">生徒</a>
//         </Link>
//         <Link href={`/rooms/${roomId}/subjects`}>
//           <a className="p-2 border-b">科目</a>
//         </Link>
//         <Link href={`/rooms/${roomId}/teachers`}>
//           <a className="p-2 border-b">講師</a>
//         </Link>
//         <Link href={`/rooms/${roomId}/relationships`}>
//           <a className="p-2 border-b">関係</a>
//         </Link>
//       </div>
//       <div className="flex-grow p-6 flex flex-col gap-4">
//         <div className="flex items-center">
//           <div className="text-xl flex-grow">2022年3月</div>
//           <Link href={`/rooms/${roomId}/schedule/2022-03/edit`}>
//             <a className="bg-blue-500 rounded text-white p-2">編集する</a>
//           </Link>
//         </div>
//         <div className="flex flex-col items-start">
//           <div className="border-t border-l">
//             <div className="flex">
//               <div className="w-8 border-r border-b"></div>
//               <div className="w-32 p-1 border-b border-r text-center">日</div>
//               <div className="w-32 p-1 border-b border-r text-center">月</div>
//               <div className="w-32 p-1 border-b border-r text-center">火</div>
//               <div className="w-32 p-1 border-b border-r text-center">水</div>
//               <div className="w-32 p-1 border-b border-r text-center">木</div>
//               <div className="w-32 p-1 border-b border-r text-center">金</div>
//               <div className="w-32 p-1 border-b border-r text-center">土</div>
//             </div>
//             <div className="flex">
//               <Link href={`/rooms/${roomId}/weeks/${1}`}>
//                 <a className="border-r w-8 text-xs border-b flex flex-col items-center justify-center">
//                   <div>週1</div>
//                 </a>
//               </Link>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">27日</div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">28日</div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">3月1日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">2日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">3日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">4日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">5日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="flex">
//               <Link href={`/rooms/${roomId}/weeks/${1}`}>
//                 <a className="border-r w-8 text-xs border-b flex flex-col items-center justify-center">
//                   <div>週2</div>
//                 </a>
//               </Link>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">6日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">7日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">8日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">9日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">10日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">11日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">12日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="flex">
//               <Link href={`/rooms/${roomId}/weeks/${1}`}>
//                 <a className="border-r w-8 text-xs border-b flex flex-col items-center justify-center">
//                   <div>週3</div>
//                 </a>
//               </Link>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">13日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">14日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">15日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">16日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">17日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">18日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">19日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="flex">
//               <Link href={`/rooms/${roomId}/weeks/${1}`}>
//                 <a className="border-r w-8 text-xs border-b flex flex-col items-center justify-center">
//                   <div>週4</div>
//                 </a>
//               </Link>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">20日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">21日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">22日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">23日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">24日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">25日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">26日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="flex">
//               <Link href={`/rooms/${roomId}/weeks/${1}`}>
//                 <a className="border-r w-8 text-xs border-b flex flex-col items-center justify-center">
//                   <div>週5</div>
//                 </a>
//               </Link>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">27日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">28日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">29日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">30日</div>
//                 <div className="p-1 flex flex-col gap-1">
//                   <Link href={`/rooms/${roomId}/lessons/1`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">冬期講習 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/2`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 1</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                   <Link href={`/rooms/${roomId}/lessons/3`}>
//                     <a className="bg-gray-100 rounded flex text-xs gap-1 p-1">
//                       <span className="flex-grow">田中個人 2</span>
//                       <span className="">16:00</span>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">4月1日</div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">2日</div>
//               </div>
//               <div className="w-32 h-40 border-r border-b">
//                 <div className="text-right text-gray-800 text-sm p-1">3日</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
