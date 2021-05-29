import { reactive, useRouter } from '@nuxtjs/composition-api'
import axios from 'axios'

import { User } from './types/authTypes'

export default function useAuth() {
  const router = useRouter()

  // 新規登録/ログインのフォームに使用
  const form = reactive<{
    user: User
  }>({
    user: {
      name: '',
      email: '',
      password: '',
    },
  })

  // ログインしたユーザーのデータ
  const logined = reactive<{
    user: User
  }>({
    user: {
      id: 0,
      name: '',
      email: '',
    },
  })

  /**
   * ログインしたデータを取得
   */
  const getLoginUser = () => {
    axios.get('/sanctum/csrf-cookie').then(() => {
      axios
        .get('/api/user')
        .then(response => {
          logined.user = {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
          }
        })
        .catch(error => {
          router.push('/login')
          console.log('ログイン出来ませんでした')
          console.log(error)
        })
    })
  }

  /**
   * 新規登録
   */
  const register = () => {
    axios.get('/sanctum/csrf-cookie').then(() => {
      axios
        .post('/api/register', form.user)
        .then(response => {
          if (response.status == 200) {
            login()
          }
        })
        .catch(error => {
          console.log('新規登録出来ませんでした')
          console.log(error)
        })
    })
  }

  /**
   * デモアカウントでログイン
   * @param email
   * @param password
   */
  const demoLogin = (email: string, password: string) => {
    form.user.email = email
    form.user.password = password
    login()
  }

  /**
   * ログイン
   */
  const login = () => {
    axios.get('/sanctum/csrf-cookie').then(() => {
      axios
        .post('/api/login', form.user)
        .then(response => {
          if (response.status == 200) {
            router.push('/rooms')
          }
        })
        .catch(error => {
          alert('ログイン出来ませんでした。')
          console.log(error)
        })
    })
  }

  /**
   * ログアウト
   */
  const logout = () => {
    axios.get('/sanctum/csrf-cookie').then(() => {
      axios
        .get('/api/logout')
        .then(response => {
          if (response.status == 200) {
            resetLoginUser()
            router.push('/')
          }
        })
        .catch(error => {
          console.log('ログアウト出来ませんでした')
          console.log(error)
        })
    })
  }

  /**
   * ログインしているユーザーのデータをリセット
   */
  const resetLoginUser = () => {
    logined.user = {
      id: 0,
      name: '',
      email: '',
    }
  }

  return {
    form,
    logined,
    register,
    getLoginUser,
    demoLogin,
    login,
    logout,
  }
}

export type AuthStore = ReturnType<typeof useAuth>
