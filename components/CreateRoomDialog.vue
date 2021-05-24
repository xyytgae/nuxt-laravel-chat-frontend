<template>
  <v-dialog v-model="dialog.show">
    <v-card>
      <v-card-title>Room作成</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="room.title" label="ルーム名"></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="dialog.show = false" color="green">閉じる</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="createRoom()" color="primary">作成</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { ChatStore } from '../compositions/useChat'
import ChatKey from '../compositions/useChatKey'

export default defineComponent({
  setup() {
    const { createRoom, room, dialog, state } = inject(ChatKey) as ChatStore
    return {
      createRoom,
      room,
      dialog,
      state,
    }
  },
})
</script>
