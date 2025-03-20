<script setup>

import {useFriendStore} from "stores/FriendStore.js";
import askComponent from "components/Friend/askComponent.vue";

  const friendStore = useFriendStore();
  friendStore.getFriendAsks();

  const accept = (id)=>{
    friendStore.acceptFriendRequest(id)
  }

  const decline = (id)=>{
    friendStore.rejectFriendRequest(id)
  }
</script>

<template>
  <div class="card-container q-pa-sm">
    <askComponent
      v-for="user in friendStore.getAsks"
      :user="user"
      :key="user.id"
      @acceptAsk="accept"
      @declineAsk="decline"
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
