import Link from 'next/link'

import LessonStatusBadge from './LessonStatusBadge'

function LessonListItem ({ lesson, lessonUrlBase }) {
  return (
    <Link href={`${lessonUrlBase}/${lesson.id}`} passHref>
      <a className="flex flex-col gap-4 border-b py-3 px-3">
        <div className="flex gap-3 items-center">
          <div className="text-xl font-bold flex-grow">{lesson.name}</div>
          <LessonStatusBadge status={lesson.status} />
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex-grow">
            <div className="text-xs text-gray-700">開始日</div>
            <div className="text-lg">{lesson.startedAt}</div>
          </div>
          <div>〜</div>
          <div className="flex-grow">
              <div className="text-xs text-gray-700">終了日</div>
            <div className="text-lg">{lesson.finishedAt}</div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default function LessonList ({ lessons, referUrlBase }) {
  return (
    <div className="flex flex-col">
      {lessons.map(lesson => (
          <LessonListItem
            key={lesson.id}
            lesson={lesson}
            referUrlBase={referUrlBase} />
      ))}
    </div>
  )
}
