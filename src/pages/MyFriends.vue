<script setup>
import { useFriendStore } from 'src/stores/FriendStore';
import FriendComponent from 'src/components/Friend/FriendComponent.vue';

  const friendStore = useFriendStore();
  friendStore.getMyFriends();
</script>

<template>
  <h1 class=" text-h6 text-weight-bold text-center" style="margin-top: 0; padding-top: 0;">Mes amis</h1>
  <div class=" q-pa-md ">
    <q-list>
      <FriendComponent 
        v-for="user in friendStore.getMyFriend"
        :key="user.id"
        :user="user"
        @delete="deleteFriend"
        @click="$router.push(`/user/${user.id}`)"
      />
    </q-list>
  </div>
</template>

<style scoped>

</style>
