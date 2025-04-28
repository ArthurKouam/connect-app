<script setup>
  import { useUserStore } from 'src/stores/UserStore';
  import { getImageLink } from 'src/service/Image';

  const userStore = useUserStore()

  const user = userStore.getUser

</script>

<template>

  <header class=" fixed-top full-width flex items-center shadow-1 bg-white" style="gap: 5px; height: 50px; z-index: 50; padding: 0px 8px;">
    <p class=" text-h6" style="margin: 0;">Status</p>
  </header>

  <div class=" q-px-md" style=" margin-top: 70px;">
    <q-item>
      <q-item-section top avatar>
        <q-avatar color="primary" text-color="white">
          <img :src="getImageLink(`picture/${user.picture}`)" alt="" v-if="user.picture" @click="full = true">
          <q-icon name="people" v-else/>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>Vous</q-item-label>
        <q-item-label caption lines="2">Ajouter un status</q-item-label>
      </q-item-section>
    </q-item>
  </div>

</template>