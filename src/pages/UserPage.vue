<script setup>
import { ref } from 'vue';
import { usePostStore } from 'src/stores/PostStore';
import { useUserStore } from 'src/stores/UserStore';
import { useRoute } from 'vue-router';
import { getImageLink } from 'src/service/Image';
import PostComponent from 'src/components/post/PostComponent.vue';
import FullImage from 'src/components/post/FullImage.vue';

  const userStore = useUserStore();
  const postStore = usePostStore();

  
  const router = useRoute();
  const userId = router.params.id;
  const full = ref(false)

  userStore.getUserProfile(userId)
  postStore.getPostforUser(userId)

  
</script>

<template>

  <div class="q-pa-md">
    <div class="profil">
      <q-avatar size="100px" font-size="52px" color="teal" text-color="white">
        <q-img @click="full = true" :src="getImageLink(`picture/${userStore.getProfile.user.picture}`)" v-if="userStore.getProfile.user.picture" loading="lazy" />
        <q-icon name="person" color="white" v-else></q-icon>
      </q-avatar>
      <p class=" text-h4 q-mt-sm q-mb-sm text-weight-bold">{{ userStore.getProfile.user.name }}</p>
      <div class=" full-width flex justify-between">
        <p class=" text-subtitle2" style="margin-top: 0;">@{{ userStore.getProfile.user.username }}</p>
        
      </div>
      <p>{{ userStore.getProfile.user.actus }}</p>
    </div>
  
    <div>
      <p class=" text-h5 text-weight-bold text-center">Posts</p>
      <div class=" q-mt-md" v-for="(post, index) in postStore.getProfilePost" :key="index">
        <PostComponent 
          :post="{post: post.post, user: userStore.getProfile.user, image: post.images}"
          @click="$router.push(`/post/${post.post.id}`)"
        />
      </div>
    </div>
  </div>

  <FullImage :image-src="getImageLink(`picture/${userStore.getProfile.user.picture}`)" @close="full = false" v-if="full && userStore.getProfile.user.picture" />
</template>

<style scoped>

</style>