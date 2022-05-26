import { ACCOUNT_TYPE } from '@rooms/constants'

export default function AccountTypeLabel ({ type }) {
  switch (type) {
    case ACCOUNT_TYPE.PARENT:
      return '保護者'
    case ACCOUNT_TYPE.TEACHER:
      return '講師'
    case ACCOUNT_TYPE.STUDENT:
      return '生徒'
    default:
      return '不明'
  }
}
