<template>
  <div>
    <v-app-bar fixed app elevation="0">
      <v-btn icon @click="$router.push(link)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title class="pl-0">
        {{ title }}
      </v-toolbar-title>
      <!-- <v-spacer />
    <v-btn icon @click.stop="">
      <v-icon>mdi-menu</v-icon>
    </v-btn> -->
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="logout">
        ログアウト
      </v-btn>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" right fixed>
      <v-list>
        <v-list-item>
          <v-list-item-title
            >Name : {{ loginedUser.user.name }}</v-list-item-title
          >
        </v-list-item>
        <v-list-item>
          <v-list-item-title
            >Mail : {{ loginedUser.user.email }}</v-list-item-title
          >
        </v-list-item>
        <v-list-item>
          <v-list-item-title>ID : {{ loginedUser.user.id }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
// import apiClient from 'axios'
import { defineComponent, inject } from '@nuxtjs/composition-api'

import ChatKey from '../compositions/useChatKey'
import { ChatStore } from '../compositions/useChat'

export default defineComponent({
  setup() {
    const { loginedUser, getUser, logout } = inject(ChatKey) as ChatStore
    return {
      loginedUser,
      getUser,
      logout,
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
  data() {
    return {
      drawer: false,
    }
  },
  mounted() {
    this.getUser()
  },
})
</script>
