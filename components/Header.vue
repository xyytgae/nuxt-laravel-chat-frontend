<template>
  <div>
    <v-app-bar color="primary" dark fixed app elevation="0">
      <v-btn icon @click="$router.push(link)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title class="pl-0">
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout()" outlined>
        ログアウト
      </v-btn>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" right fixed>
      <v-list>
        <v-list-item>
          <v-list-item-title>Name : {{ logined.user.name }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Mail : {{ logined.user.email }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>ID : {{ logined.user.id }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from '@nuxtjs/composition-api'

import AuthKey from '@/compositions/useAuthKey'
import { AuthStore } from '@/compositions/useAuth'

export default defineComponent({
  setup() {
    const drawer = ref(false)

    const { logined, logout, getLoginUser } = inject(AuthKey) as AuthStore
    return {
      drawer,
      logined,
      logout,
      getLoginUser,
    }
  },
  props: {
    title: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  mounted() {
    this.getLoginUser()
  },
})
</script>
