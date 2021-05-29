<template>
  <v-dialog max-width="480px" v-model="createRoomDialog">
    <!-- <v-dialog max-width="480px" v-model="dialog.show"> -->
    <v-card>
      <v-card-title>Room作成</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="room.input.title"
            label="ルーム名"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="createRoomDialog = false" text color="green darken-1"
          >閉じる</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn @click="createRoom(logined.user.id)" text color="primary"
          >作成</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { ChatStore } from '../compositions/useChat'
import ChatKey from '../compositions/useChatKey'

import AuthKey from '@/compositions/useAuthKey'
import { AuthStore } from '@/compositions/useAuth'

export default defineComponent({
  setup() {
    const { logined } = inject(AuthKey) as AuthStore
    const { createRoom, createRoomDialog, room } = inject(ChatKey) as ChatStore
    return {
      logined,
      createRoom,
      createRoomDialog,
      room,
    }
  },
})
</script>
