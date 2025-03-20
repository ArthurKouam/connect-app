<script setup>
  import {useFriendStore} from "stores/FriendStore.js";
  import FriendCard from "components/Friend/FriendCard.vue";

  const friendStore = useFriendStore()
  friendStore.getRecommendFriends()

  const sendReq = (id) => {
    friendStore.sendFriendRequest(id)
  }

 // const users = friendStore.getRecommend;
</script>

<template>
  <div class="card-container q-pa-sm">
    <FriendCard
      v-for="user in friendStore.getRecommend"
      :user="user"
      :key="user.id"
      @addFriend = "sendReq"
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
