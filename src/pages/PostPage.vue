<script setup>
  import {usePostStore} from "stores/PostStore.js";
  import {useRoute, } from "vue-router";
  import { ref } from "vue";
  import {api} from "boot/axios.js";
  import { useUserStore } from "src/stores/UserStore";
  import ViewComponent from "src/components/postPage/ViewComponent.vue";
  import CommentaireComponent from "src/components/postPage/CommentaireComponent.vue";
  //import FullImage from "src/components/post/FullImage.vue";

  const postStore = usePostStore();
  const userStore = useUserStore();
  userStore.replace();


  const route = useRoute();

  const { id } = route.params;
  
  const com = ref("");
  const tabCom = ref([]);
  const token = userStore.getToken;

  postStore.getById(parseInt(id));

  const envoyer = async ()=>{
    if(com.value === "")
      return;

    try {
      const response = await api.postForm(`commentaire/${id}`, {commentaire: com.value}, {
        headers: {
          Authorization: `${token.type} ${token.token}`,
        }
      });

      if(response.status === 200){
        com.value = "";
        postStore.reset();
        await load()
      }
    }catch (e) {
      console.log(e);
    }
  }

  const load = async ()=>{
    try {
      const response = await api.get(`/commentaire/${id}`);

      if (response.status === 200){
        tabCom.value = response.data;
        console.log("com: ", tabCom.value);
      }
    }catch (e) {
      console.log(e);
    }
  }

  load();
</script>

<template>
  <header class=" fixed-top full-width flex items-center shadow-1 bg-white" style="gap: 5px; height: 50px; z-index: 50; padding-left: 5px;">
    <q-icon name="arrow_back" size="20px" @click="$router.go(-1)"/>
    <p class=" text-h6" style="margin: 0;">Post </p>
  </header>
  <div class="q-pa-md" style="margin-top: 50px;">
    
    <div v-if="postStore.getCurrentPost">
      
      <ViewComponent :post="postStore.getCurrentPost" style="z-index: 10;"></ViewComponent>

      <div class=" q-pt-md q-pl-md bg-white" style="margin-bottom: 100px;">
        <CommentaireComponent 
          v-for="(com, index) in tabCom"
          :com="com"
          :key="index"
        />
      </div>

      <div style="gap: 8px; z-index: 50;" class="q-px-sm fixed-bottom full-width flex q-mb-sm bg-white">
        <q-input outlined style="flex: 5;" placeholder="Ajouter un commentaire" v-model="com"></q-input>
        <q-btn color="primary" label="envoyer" @click="envoyer"/>
      </div>
    </div>

    <div class="text-center text-weight-bold text-h6" v-else>
      Le post n'existe pas ou a été supprimée
    </div>
  </div>

</template>

<style scoped>

</style>
