<template>
  <v-card class="mt-10" elevation="1">
    <div>
      <v-btn color="primary" text @click="$router.push('/')">
        <v-icon>mdi-chevron-left</v-icon>
        戻る
      </v-btn>
    </div>
    <v-card-title>
      <span class="headline">新規登録画面</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="メールアドレス"
              v-model="user.email"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="パスワード"
              type="password"
              v-model="user.password"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="ユーザー名"
              v-model="user.name"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="register()">
        新規登録
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
    const { user, register } = inject(ChatKey) as ChatStore
    return {
      user,
      register,
    }
  },
})
</script>
