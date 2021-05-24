import {
  reactive,
  useRouter,
  useRoute,
  onMounted,
} from '@nuxtjs/composition-api'
import axios from 'axios'
// import apiClient from 'axios'

interface Room {
  title: string
  user_name: string
  user_id: number
  users_id: Array<number>
}

interface Chat {
  user_id: number
  room_id: number
  comment: string
}

export default function useChat() {
  const router = useRouter()
  const route = useRoute()

  // 新規登録の際に使用
  const user = reactive<{
    // user: {
    name: string
    email: string
    password: string
    // }
  }>({
    // user: {
    name: '',
    email: '',
    password: '',
    // }
  })

  // ログインしたユーザーのデータ
  const loginedUser = reactive<{
    user: {
      id: number
      email: string
      name: string
    }
  }>({
    user: {
      id: 0,
      email: '',
      name: '',
    },
  })

  // ログインの際に使用
  const loginUser = reactive<{
    email: string
    password: string
  }>({
    email: '',
    password: '',
  })

  // ルーム一覧
  const state = reactive<{
    rooms: Array<Room>
  }>({
    rooms: [],
  })

  // チャット一覧
  const chats = reactive<{
    chats: Array<Room>
  }>({
    chats: [],
  })

  const dialog = reactive<{
    show: boolean
  }>({
    show: false,
  })

  const room = reactive<{
    title: string
    user_id: number
    users_id: Array<number>
  }>({
    title: '',
    user_id: 3,
    users_id: [],
  })

  const currentRoom = reactive<{
    currentRoom: {
      title: string
      user_id: number
      users_id: Array<number>
      id: number
    }
  }>({
    currentRoom: {
      title: '',
      user_id: 0,
      users_id: [],
      id: 0,
    },
  })

  const chat = reactive<{
    comment: string
    user_id: number
    room_id: string | number
  }>({
    comment: '',
    user_id: 0,
    room_id: route.value.params.roomId,
  })

  //   const rooms = reactive<{}>({})

  // ログインしたデータを取得
  const getUser = async () => {
    await axios.get('/sanctum/csrf-cookie').then(async () => {
      await axios
        .get('/api/user')
        .then(response => {
          loginedUser.user = response.data
        })
        .catch(error => {
          console.log(error)
        })
    })
  }

  // 新規登録
  const register = async () => {
    axios.defaults.withCredentials = true

    await axios.get('/sanctum/csrf-cookie').then(async () => {
      await axios
        .post('/api/register', user)
        .then(response => {
          if (response.status == 200) {
            router.push(`/rooms`)
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  }

  // ログイン処理
  const login = async () => {
    axios.defaults.withCredentials = true

    await axios.get('/sanctum/csrf-cookie').then(async () => {
      await axios
        .post('/api/login', loginUser)
        .then(response => {
          if (response.status == 200) {
            router.push('/rooms')
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  }

  // ログアウト処理
  const logout = async () => {
    await axios.get('/sanctum/csrf-cookie').then(async () => {
      await axios
        .get('/api/logout')
        .then(response => {
          if (response.status == 200) {
            loginedUser.user.email = ''
            loginedUser.user.id = 0
            loginedUser.user.name = ''
            router.push('/')
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  }

  // ユーザー名を取得
  const getUserName = async () => {
    chats.chats.forEach(async (chat, index) => {
      await axios.get(`/api/getUserName/${chat.user_id}`).then(res => {
        chats.chats[index].user_name = res.data.name
      })
    })
  }

  // Roomを作成
  const createRoom = () => {
    getUser().then(async () => {
      room.user_id = loginedUser.user.id
      // room.users_id.push(loginedUser.user.id)

      await axios.post('/api/rooms', room).then(res => {
        dialog.show = false
        router.push(`/rooms/${res.data.id}`)
      })
    })
  }

  // Room一覧を取得
  const getRooms = () => {
    axios.get('/api/rooms').then(res => {
      state.rooms = res.data
    })
  }

  // チャットを取得
  const getChats = () => {
    axios
      .get(`/api/chats/${route.value.params.roomId}`)
      .then(res => {
        chats.chats = res.data.slice().reverse()
      })
      .then(() => {
        getUserName()
      })
  }

  // チャットを入力
  const createChat = () => {
    getUser().then(async () => {
      chat.user_id = loginedUser.user.id
      chat.room_id = currentRoom.currentRoom.id

      // await apiClient.get('/sanctum/csrf-cookie').then(async () => {
      await axios.post('/api/chats', chat).then(async () => {
        await axios.post('/api/chat/pusher', chat).then(() => {
          // await apiClient.get('/api/new').then(() => {
          chat.comment = ''
        })
      })
      // })
    })
  }

  // 入室中のRoomを取得
  const getCurrentRoom = () => {
    axios.get(`/api/rooms/${route.value.params.roomId}`).then(res => {
      currentRoom.currentRoom = res.data[0]
    })
  }

  onMounted(() => {
    getRooms()
  })

  return {
    user,
    loginedUser,
    loginUser,
    state,
    dialog,
    room,
    chats,
    chat,
    currentRoom,
    // getUserName,
    register,
    getUser,
    login,
    logout,
    getChats,
    getCurrentRoom,
    createRoom,
    createChat,
    onMounted,
  }
}

export type ChatStore = ReturnType<typeof useChat>
