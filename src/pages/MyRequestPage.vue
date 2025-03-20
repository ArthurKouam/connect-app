<script setup>

import {useFriendStore} from "stores/FriendStore.js";
import MyAskComponent from "components/Friend/MyAskComponent.vue";

  const friendStore = useFriendStore();
  friendStore.getFriendsRequest()

  const deleteAsk = (id)=>{
    console.log(id);
  }
</script>

<template>
  <div class="card-container q-pa-sm">
    <MyAskComponent
      v-for="user in friendStore.getFriendsReq"
      :user="user"
      :key="user.id"
      @delete="deleteAsk"
      @click="$router.push(`/user/${user.id}`)"
    />
  </div>
</template>

<style scoped>
.card-container{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px 10px;
}
</style>
