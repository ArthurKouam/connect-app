<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container style="margin-bottom: 120px">
      <router-view />
    </q-page-container>
  </q-layout>
  <q-tabs
    v-model="tab"
    class="text-black fixed-bottom full-width shadow-1 blur"
    indicator-color="transparent"
    active-color = "primary"
  >
    <q-route-tab name="home" icon="home" replace label="Home" to="/" />
    <q-route-tab name="status" icon="circle" label="Status" to="/status" />
    <q-route-tab name="friends" icon="group" label="Friends" to="/friends" />
    <q-route-tab name="profile" icon="account_box" label="profile" to="/profile" />
  </q-tabs>
</template>

<script setup>
  import { useUserStore } from 'src/stores/UserStore';
  import { ref } from 'vue'

  const userStore = useUserStore();

  userStore.replace();

  const tab = ref('home')
</script>

<style scoped>
  .blur{
    backdrop-filter: blur(30px);
    justify-content: space-between;
  }
</style>
