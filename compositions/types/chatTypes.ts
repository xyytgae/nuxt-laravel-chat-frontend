export interface Room {
  id?: number
  title: string
  user_name?: string
  user_id: number
  users_id: Array<number>
}

export interface Chat {
  user_id: number
  room_id: number
  comment: string
}
