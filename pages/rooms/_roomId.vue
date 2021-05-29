<template>
  <div>
    <Header :title="current.room.title" link="/rooms"></Header>

    <div>
      <v-card flat v-for="chat in chats.list" :key="chat.id" class="mb-2">
        <v-card-title class="pb-0 pl-0" v-if="chat.user_id != logined.user.id">
          <v-icon>
            mdi-account
          </v-icon>
          <span class="title font-weight-light text-h6">{{ chat.name }}</span>
        </v-card-title>
        <v-card-text class="px-0 py-1">
          <div
            class="comment py-1 px-4"
            :class="{ 'ml-auto': chat.user_id == logined.user.id }"
          >
            <span>
              {{ chat.comment }}
            </span>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <!-- ボタンの表示/非表示を切り替える用の要素 -->
    <div v-intersect="onIntersect" id="bottom"></div>

    <v-footer padless fixed app>
      <v-card width="100%">
        <v-btn
          v-show="!isBottom"
          color="grey"
          icon
          large
          @click="$vuetify.goTo('#bottom')"
          class="icon"
        >
          <v-icon x-large>
            mdi-arrow-down-circle
          </v-icon>
        </v-btn>
        <v-textarea
          hide-details
          auto-grow
          outlined
          rows="1"
          row-height="10"
          class="ma-1"
          append-outer-icon="mdi-chevron-right"
          v-model="input.chat.comment"
          @click:append-outer="createChat(logined.user.id)"
        ></v-textarea>
      </v-card>
    </v-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, provide } from '@nuxtjs/composition-api'
import Header from '@/components/Header.vue'

import useChat, { ChatStore } from '@/compositions/useChat'
import ChatKey from '@/compositions/useChatKey'
import AuthKey from '@/compositions/useAuthKey'
import useAuth, { AuthStore } from '@/compositions/useAuth'

export default defineComponent({
  components: {
    Header,
  },
  setup() {
    provide(ChatKey, useChat())
    const {
      getChats,
      chats,
      input,
      createChat,
      getCurrentRoom,
      current,

      isBottom,
      onIntersect,
    } = inject(ChatKey) as ChatStore

    provide(AuthKey, useAuth())
    const { logined } = inject(AuthKey) as AuthStore

    // ページ表示時に実行
    getChats()
    getCurrentRoom()

    return {
      getChats,
      chats,
      input,
      createChat,
      getCurrentRoom,
      current,
      logined,
      isBottom,
      onIntersect,
    }
  },
  mounted() {
    this.$pusher.subscribe('my-channel').bind('my-event', () => {
      this.getChats()
    })
  },
})
</script>

<style lang="scss" scoped>
.icon {
  position: absolute;
  right: 0;
  bottom: 70px;
  margin: auto;
}

.comment {
  border-radius: 20px;
  border: 1px solid rgb(119, 117, 117);
  display: table;
  max-width: 80%;
}
</style>
