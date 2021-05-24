<template>
  <!-- <div class="container">
    <h1 class="h1 pb-1 border-bottom border-dark">Login</h1>
    <p>ログイン状態: {{ $auth.loggedIn }}</p>
    <div class="row justify-content-md-center">
      <div class="col-6">
        <form name="login" @submit.prevent="login()">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter email"
              v-model="form.email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter password"
              v-model="form.password"
              required
            />
          </div>
          <button type="submit" class="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  </div> -->
  <v-card class="mt-10" elevation="1">
    <div>
      <v-btn color="primary" text @click="$router.push('/')">
        <v-icon>mdi-chevron-left</v-icon>
        戻る
      </v-btn>
    </div>
    <v-card-title>
      <span class="headline">ログイン画面</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="メールアドレス"
              v-model="loginUser.email"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="loginUser.password"
              label="パスワード"
              type="password"
              required
            ></v-text-field>
          </v-col>
          <!-- <v-col cols="12">
            <v-text-field
              v-model="loginUser.password_confirm"
              label="確認用パスワード"
              type="password"
              required
            ></v-text-field>
          </v-col> -->
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="login()" color="primary">
        ログイン
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, inject, provide } from '@nuxtjs/composition-api'

import ChatKey from '../compositions/useChatKey'
import useChat, { ChatStore } from '../compositions/useChat'

export default defineComponent({
  setup() {
    provide(ChatKey, useChat())
    const { loginUser, login } = inject(ChatKey) as ChatStore
    return {
      loginUser,
      login,
    }
  },
})
// export default {
//   data() {
//     return {
//       form: {
//         email: '',
//         password: '',
//       },
//     }
//   },
//   mounted() {
//     this.$axios.get('/sanctum/csrf-cookie')
//   },
//   methods: {
//     async login() {
//       try {
//         const response = await this.$auth.loginWith('local', {
//           data: this.form,
//         })
//         console.log(response)
//       } catch (error) {
//         console.log(error)
//       }
//     },
//   },
// }
</script>
