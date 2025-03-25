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
  <h1 class=" text-h6 text-weight-bold text-center" style="margin-top: 0; padding-top: 0;">Demande reçus</h1>
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
