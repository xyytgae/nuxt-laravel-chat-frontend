<template>
  <div>
    <Header :title="currentRoom.currentRoom.title" link="/rooms"></Header>

    <div style="height:auto;">
      <v-card flat v-for="chat in chats.chats" :key="chat.id" class="mb-2">
        <v-card-title v-if="chat.user_id != loginedUser.user.id">
          <v-icon>
            mdi-account
          </v-icon>
          <span class="title font-weight-light text-h6">{{
            chat.user_name
          }}</span>
        </v-card-title>
        <v-card-text
          class="comment pa-4"
          :class="{ 'ml-auto': chat.user_id == loginedUser.user.id }"
        >
          <span>
            {{ chat.comment }}
          </span>
        </v-card-text>
      </v-card>
    </div>

    <v-footer padless fixed app>
      <v-card width="100%">
        <v-textarea
          hide-details
          auto-grow
          outlined
          rows="1"
          row-height="10"
          class="mx-2 my-2"
          append-outer-icon="mdi-chevron-right"
          v-model="chat.comment"
          @click:append-outer="createChat()"
        ></v-textarea>
      </v-card>
    </v-footer>
  </div>
</template>

<script lang="ts">
import Header from '../../components/Header.vue'

import { defineComponent, inject, provide } from '@nuxtjs/composition-api'
import useChat, { ChatStore } from '../../compositions/useChat'
import ChatKey from '../../compositions/useChatKey'

export default defineComponent({
  components: {
    Header,
  },
  setup() {
    provide(ChatKey, useChat())

    const {
      loginedUser,
      getChats,
      chats,
      chat,
      createChat,
      getCurrentRoom,
      currentRoom,
    } = inject(ChatKey) as ChatStore
    return {
      loginedUser,
      getChats,
      chats,
      chat,
      createChat,
      getCurrentRoom,
      currentRoom,
    }
  },
  created() {
    this.getChats()
    this.getCurrentRoom()
  },
  mounted() {
    this.$pusher.subscribe('my-channel').bind('my-event', () => {
      this.getChats()
    })
  },
})
</script>

<style lang="scss" scoped>
.card {
  // background: skyblue !important;
}

.comment {
  // background: red;
  border-radius: 10px 10px 10px 10px;
  border: 1px solid grey;
  width: 45%;
}
</style>
