<template>
  <v-card class="mt-10 mx-auto" max-width="480px" elevation="1">
    <v-card-actions>
      <v-btn color="primary" text to="/">
        <v-icon>mdi-chevron-left</v-icon>
        戻る
      </v-btn>

      <v-spacer />
      <v-btn color="primary" to="/login" text>
        ログイン
      </v-btn>
    </v-card-actions>
    <v-card-title>
      <span class="headline mx-auto">新規登録画面</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="メールアドレス"
              v-model="form.user.email"
              required
              @keydown.enter="register()"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="パスワード"
              type="password"
              v-model="form.user.password"
              required
              @keydown.enter="register()"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="ユーザー名"
              v-model="form.user.name"
              required
              @keydown.enter="register()"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="register()" class="mx-auto" color="primary">
        新規登録
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, inject, provide } from '@nuxtjs/composition-api'

import AuthKey from '@/compositions/useAuthKey'
import useAuth, { AuthStore } from '@/compositions/useAuth'

export default defineComponent({
  setup() {
    provide(AuthKey, useAuth())
    const { form, register } = inject(AuthKey) as AuthStore
    return {
      form,
      register,
    }
  },
})
</script>
