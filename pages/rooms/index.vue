<template>
  <div>
    <Header title="Room一覧" link="/"></Header>
    <p>
      {{ logined.user }}
    </p>
    <v-row>
      <v-card
        v-for="room in rooms.list"
        :to="`/rooms/${room.id}`"
        :key="room.id"
        flat
        class="border"
        width="450px"
      >
        <v-card-text>
          <span>{{ room.title }} ({{ room.users_id.length }}) </span>

          <v-icon>mdi-chevron-right</v-icon>
        </v-card-text>
      </v-card>
    </v-row>

    <v-btn color="primary" @click="createRoomDialog = true" large icon>
      <v-icon>mdi-account-multiple</v-icon>
    </v-btn>

    <CreateRoomDialog />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, provide } from '@nuxtjs/composition-api'
import Header from '@/components/Header.vue'
import CreateRoomDialog from '@/components/CreateRoomDialog.vue'

import ChatKey from '@/compositions/useChatKey'
import useChat, { ChatStore } from '@/compositions/useChat'
import AuthKey from '@/compositions/useAuthKey'
import useAuth, { AuthStore } from '@/compositions/useAuth'

export default defineComponent({
  components: {
    Header,
    CreateRoomDialog,
  },
  setup() {
    provide(ChatKey, useChat())
    const { createRoomDialog, getRooms, rooms } = inject(ChatKey) as ChatStore

    provide(AuthKey, useAuth())
    const { logined } = inject(AuthKey) as AuthStore

    getRooms()

    return {
      createRoomDialog,
      rooms,
      logined,
    }
  },
})
</script>

<style lang="scss" scoped>
.border {
  border: 1px solid grey;
}
</style>
