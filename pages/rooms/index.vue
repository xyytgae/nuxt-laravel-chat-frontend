<template>
  <div>
    <Header title="Room一覧" link="/"></Header>

    <!-- <h1>Room一覧</h1> -->

    <v-row>
      <!-- <v-card flat color="primary" width="100%">
        <v-card-text>
          <span>sample ({{ count }}) </span>


          <v-btn @click="$router.push('/rooms/123')" icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-card-text>
      </v-card> -->
      <v-card
        v-for="room in state.rooms"
        :to="`/rooms/${room.id}`"
        :key="room.id"
        flat
        class="border"
        width="450px"
      >
        <v-card-text>
          <span>{{ room.title }} ({{ room.users_id.length }}) </span>
          <div v-for="user in room.users_id" :key="`${room.title}-${user}`">
            <!-- {{ user }} -->
          </div>
          {{ room.user_id }}

          <!-- <v-btn icon> -->
          <v-icon>mdi-chevron-right</v-icon>
          <!-- </v-btn> -->
        </v-card-text>
      </v-card>
    </v-row>

    <v-btn color="primary" @click="dialog.show = true" large icon>
      <v-icon>mdi-account-multiple</v-icon>
    </v-btn>

    <CreateRoomDialog />
    <!-- <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>Room作成</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="room.title" label="ルーム名"></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="dialog = false" color="green">閉じる</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="createRoom()" color="primary">作成</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, provide } from '@nuxtjs/composition-api'
import CreateRoomDialog from '../../components/CreateRoomDialog.vue'

import ChatKey from '../../compositions/useChatKey'
import useChat, { ChatStore } from '../../compositions/useChat'

export default defineComponent({
  components: {
    CreateRoomDialog,
  },
  setup() {
    provide(ChatKey, useChat())
    const { onMounted, dialog, state } = inject(ChatKey) as ChatStore
    return {
      onMounted,
      dialog,
      state,
    }
  },
})

// export default {
//   data() {
//     return {
//       dialog: false,
//       rooms: null,
//       room: {
//         user_id: 3,
//         users_id: [1, 2],
//       },
//     }
//   },
//   methods: {
//     createRoom() {
//       this.$axios
//         .post('/api/rooms', this.room, {
//           headers: { 'Content-Type': 'application/json' },
//         })
//         .then(res => {
//           this.dialog = false
//           this.$router.push(`/rooms/${res.data.id}`)
//         })
//     },
//     get() {
//       this.$axios.get('/api/rooms').then(res => {
//         this.rooms = res.data
//       })
//     },
//   },
//   mounted() {
//     this.get()
//   },
// }
</script>

<style lang="scss" scoped>
.border {
  border: 1px solid grey;
}
</style>
