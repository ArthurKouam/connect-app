<script setup>
  import addButton from '../components/post/addButton.vue'
  import {usePostStore} from "stores/PostStore.js";
  import {ref} from "vue";
  import PostComponent from "components/post/PostComponent.vue";
  import { onMounted, onUnmounted } from 'vue'

  onMounted(() => {
    document.addEventListener('backbutton', handleBackButton, false)
  })

  onUnmounted(() => {
    document.removeEventListener('backbutton', handleBackButton, false)
  })

  function handleBackButton() {
    navigator.app.exitApp() // Ferme l'application
  }


  const postStore = usePostStore();
  const tabPosts = postStore.getPosts;
  const more = ref(true);

  const loadMore = (index, done)=>{
    if(postStore.getMorePage){
      postStore.getAllPost();
      done();
    }else {
      more.value = false
    }
  }
</script>

<template>
  <q-page class=" q-pa-md">
    <header class=" fixed-top full-width flex justify-between items-center shadow-1 bg-white" style="gap: 5px; height: 50px; z-index: 50; padding: 0px 8px;">
      <p class=" text-h6" style="margin: 0;">CONNECT</p>
      <q-icon size="20px" color="black" name="notifications" />
    </header>

    <q-infinite-scroll class="q-mt-xl"  @load="loadMore" :offset="10">
      <div v-for="(posts, index) in tabPosts" :key="index" class="q-pa-md">
        <post-component
          v-for="(post, key) in posts"
          :key = "key"
          :post="post"
          @click="$router.push(`/post/${post.post.id}`)"
        />
      </div>

      <template v-slot:loading v-if="more">
        <div class="row justify-center q-my-md">
          <q-spinner color="primary" size="2em" />
        </div>
      </template>

      <p v-if="!more" class="text-center q-py-md">Aucun Autre post</p>
    </q-infinite-scroll>

    <add-button @click="$router.push('/add')"></add-button>
  </q-page>
</template>

<style scoped>


</style>
