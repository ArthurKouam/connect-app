<script setup>
import { usePostStore } from 'src/stores/PostStore';
import { ref } from 'vue';

  const post = ref("");
  const files = ref();

  const handleFile = (e)=>{
    files.value = e.target.files
    console.log(files.value);
  }

  const postStore = usePostStore();

  const onSubmit = ()=>{
    if (post.value === "" && !files.value) {

      return;
    }
    console.log(files.value)
    postStore.newPost(post.value, files.value)
  }

</script>

<template>
  <header class=" fixed-top full-width flex items-center shadow-1 bg-white" style="gap: 5px; height: 50px; z-index: 50; padding-left: 5px;">
    <q-icon name="arrow_back" size="20px" @click="$router.go(-1)"/>
    <p class=" text-h6" style="margin: 0;">Ajouter un post </p>
  </header>
  <form
    @submit.prevent="onSubmit"
    class="q-gutter-md q-pa-md q-mt-xl"
    method="post"
    enctype="multipart/form-data"
  >

    <div>
      <label>Entrer votre post</label>
      <q-input outlined class="full-width " type="textarea" v-model="post" /><br>

      <input class="q-mt-lg" accept="image/*" type="file" @change="handleFile" multiple />

    </div>
    <div>
      <q-btn label="Publier le post" class="full-width q-mt-lg" type="submit" color="primary"/>
    </div>
  </form>
</template>

<style scoped>


</style>
