<script setup>
  import { ref } from 'vue';
  import { getImageLink } from 'src/service/Image';
  import { useUserStore } from 'src/stores/UserStore';
  import FullImage from 'src/components/post/FullImage.vue';


  const full = ref(false)

  const userStore = useUserStore();
  const user = userStore.getUser;
</script>

<template>
  <div class="q-pa-md q-mt-md full-width">
    <div class="full-width flex justify-center items-center" style="flex-direction: column; gap: 5px;">
      <q-avatar class="p-mx-auto" size="90px" font-size="52px" color="teal" text-color="white" >
        <img :src="getImageLink(`picture/${user.picture}`)" alt="" v-if="user.picture" @click="full = true">
        <q-icon name="people" v-else/>

      </q-avatar>
      <p class="text-bold" style="font-size: 1.3em;">{{ user.username }} </p>
    </div>
  </div>

  <div class="q-pa-md q-mt-md flex" style="flex-direction: column; gap: 20px;">
    <div class="q-btn q-btn--outline " @click="$router.push('/profile/edit')">Modifier mon profil</div>
    <div class="q-btn q-btn--outline" @click="$router.push(`/user/${user.id}`)">Voir mes posts</div>
    <div class="q-btn q-btn--outline" @click="userStore.logout()">Deconnexion</div>
  </div>

  <FullImage :image-src="getImageLink(`picture/${user.picture}`)" @close="full = false" v-if="full && user.picture" />
</template>

<style scoped>
  .menu-item {
    font-weight: 700;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 5px;
    background-color: #f2f2f2;

  }
</style>