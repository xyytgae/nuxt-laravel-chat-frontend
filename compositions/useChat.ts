import { reactive, useRouter, useRoute, ref } from '@nuxtjs/composition-api'
import axios from 'axios'

import { Room, Chat } from './types/chatTypes'

export default function useChat() {
  const router = useRouter()
  const route = useRoute()

  // Room一覧
  const rooms = reactive<{
    list: Array<Room>
  }>({
    list: [],
  })

  // createRoomDialogに紐づく
  const createRoomDialog = ref(false)

  // Room作成フォームで使用
  const room = reactive<{
    input: Room
  }>({
    input: {
      title: '',
      user_id: 0,
      users_id: [],
    },
  })

  // チャット一覧
  const chats = reactive<{
    list: Array<Room>
  }>({
    list: [],
  })

  // 入室中のroom
  const current = reactive<{
    room: Room
  }>({
    room: {
      title: '',
      user_id: 0,
      users_id: [],
      id: 0,
    },
  })

  // チャット入力時に扱うデータ
  const input = reactive<{
    chat: Chat
  }>({
    chat: {
      user_id: 0,
      room_id: parseInt(route.value.params.roomId),
      comment: '',
    },
  })

  /**
   * Room一覧を取得
   */
  const getRooms = () => {
    axios.get('/api/rooms').then(res => {
      rooms.list = res.data
    })
  }

  /**
   * Room作成
   * @param userId : number
   */
  const createRoom = (userId: number) => {
    room.input.user_id = userId
    axios
      .post('/api/rooms', room)
      .then(res => {
        createRoomDialog.value = false
        router.push(`/rooms/${res.data.id}`)
      })
      .catch(error => {
        console.log(error)
        router.push('/')
      })
  }

  // チャットを入力
  const createChat = (userId: number) => {
    input.chat.user_id = userId

    axios.post('/api/chats', input.chat).then(() => {
      axios.post('/api/chat/pusher', input.chat).then(() => {
        input.chat.comment = ''
      })
    })
  }

  /**
   * 入室中のRoomを取得
   */
  const getCurrentRoom = () => {
    axios.get(`/api/rooms/${route.value.params.roomId}`).then(res => {
      current.room = res.data[0]
    })
  }

  /**
   * チャットを取得
   */
  const getChats = () => {
    axios.get(`/api/chats/${route.value.params.roomId}`).then(res => {
      chats.list = res.data.slice().reverse()
    })
  }

  // 最下部の場合ボタンを非表示
  const isBottom = ref(false)

  /**
   * 最下部かどうか判定
   * @param entries
   * @param observer
   */
  const onIntersect = (entries: any, observer: any) => {
    isBottom.value = entries[0].isIntersecting
  }

  return {
    rooms,
    room,
    chats,
    input,
    current,
    createRoomDialog,
    getChats,
    getCurrentRoom,
    createRoom,
    createChat,
    getRooms,

    isBottom,
    onIntersect,
  }
}

export type ChatStore = ReturnType<typeof useChat>
