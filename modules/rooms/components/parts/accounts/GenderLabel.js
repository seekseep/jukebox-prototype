import { GENDER_TYPE } from '@/constants'

export default function GenderLabel ( { gender }) {
  switch (gender) {
    case GENDER_TYPE.MALE:
      return '男'
    case GENDER_TYPE.FEMALE:
      return '女'
    case GENDER_TYPE.OTHER:
      return 'その他'
    default:
      return '未設定'
  }
}
