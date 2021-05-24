<template>
  <div>
    <h1>チャットアプリ</h1>
    <v-row>
      <v-card>
        <v-btn color="primary" @click="$router.push('/rooms')">Room一覧</v-btn>
        <v-btn color="primary" @click="$router.push('/signup')">新規登録</v-btn>
        <v-btn color="primary" @click="$router.push('/login')">ログイン</v-btn>
      </v-card>
    </v-row>
  </div>
</template>
