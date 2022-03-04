import { useLesson } from '../../../hooks/lessons'

import LessonPropertyList from '../../parts/lessons/LessonPropertyList'

export default function ViewLesson ({ lessonId }) {
  const lesson = useLesson(lessonId)

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="text-lg">授業</div>
      <LessonPropertyList lesson={lesson} />
    </div>
  )
}
