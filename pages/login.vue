<template>
  <v-card class="mt-10 mx-auto" max-width="480px" elevation="1">
    <v-card-actions>
      <v-btn color="primary" text to="/">
        <v-icon>mdi-chevron-left</v-icon>
        戻る
      </v-btn>

      <v-spacer />
      <v-btn color="primary" to="/signup" text>
        登録まだの方
      </v-btn>
    </v-card-actions>
    <v-card-title>
      <span class="headline mx-auto">ログイン画面</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.user.email"
              label="メールアドレス"
              required
              @keydown.enter="login()"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.user.password"
              label="パスワード"
              type="password"
              required
              @keydown.enter="login()"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-row>
        <v-col class="text-center" cols="12">
          <v-btn @click="login()" class="mx-auto" outlined color="primary">
            ログイン
          </v-btn>
        </v-col>

        <v-col class="text-center" cols="12">
          <v-btn
            @click="demoLogin('test@test.com', 'test')"
            outlined
            color="primary"
          >
            デモアカウント1でログイン
          </v-btn>
        </v-col>

        <v-col class="text-center" cols="12">
          <v-btn
            @click="demoLogin('test2@test.com', 'test')"
            outlined
            color="primary"
          >
            デモアカウント2でログイン
          </v-btn>
        </v-col>
      </v-row>
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
    const { form, login, demoLogin } = inject(AuthKey) as AuthStore
    return {
      form,
      login,
      demoLogin,
    }
  },
})
</script>
