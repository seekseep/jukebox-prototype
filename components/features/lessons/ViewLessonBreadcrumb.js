import { useLesson } from '../../../hooks/lessons'
import Breadcrumb, { BreadcrumbItem } from '../../parts/Breadcrumb'

export default function ViewLessonBreadcrumb ({ lessonId }) {
  const lesson = useLesson(lessonId)
  return (
    <Breadcrumb>
      <BreadcrumbItem>{lesson?.name || '読込中'}</BreadcrumbItem>
    </Breadcrumb>
  )
}
