export interface User {
  id?: number // 新規登録の際にidを入力しない為
  name: string
  email: string
  password?: string // ログインした際パスワードを取得しない為
}
