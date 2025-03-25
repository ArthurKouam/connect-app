<script setup>
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/UserStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


  const userStore = useUserStore();
  const router = useRouter();
  const isLoading = ref(false);

  const user = userStore.getUser;
  const name = ref(user.name);
  const username = ref(user.username);
  const actus = ref(user.actus)
  const picture = ref();
  const verifyProgress = ref(false)
  const disponibility = ref(true)
  const errorName = ref(false)

  const modifyprofile = async () => {
    isLoading.value = true;
    if(name.value != "" && username.value != "" && actus.value != ""){
      console.log('picture: ', picture.value)
      try {
        const response = await api.putForm(`/user/${user.id}`, {username: username.value, name: name.value, picture: picture.value, actus: actus.value}, {
          headers: {
            Authorization: `bearer ${userStore.getToken.token}`,
            'Content-Type': 'multipart/form-data',
          }
        })

        console.log(response.data.user)
        userStore.setUser(response.data.user);

        router.replace('/profile');
      } catch (error) {
        console.log(error);
      }finally{
        isLoading.value = false;
      }
    }
  }

  const verifyUsername = async ()=>{   
    if(username.value.includes(" ")){
      errorName.value = true;
      return
    }
    verifyProgress.value = true;
    errorName.value = false
    try {
      const response = await api.get('/user/username/check', {
        params: {
          id: user.id,
          username: username.value,
        }
      })

      if(response.data.disponibility){
        disponibility.value = true
      }else{
        disponibility.value = false
      }
    } catch (error) {
      console.log(error);
    }finally{
      verifyProgress.value = false;
    }
  }

  const handleFile = (e)=>{
    picture.value = e.target.files[0];
    console.log(picture.value);
  }


</script>

<template>

  <div class=" q-pa-md">
    <form
      @submit.prevent="modifyprofile"
      @reset="$router.replace('/profile')"
      class="q-gutter-md"
      method="post"
      enctype="multipart/form-data"
    >
      <h1 class="text-center text-h5 text-weigth-bold">Modifier vos informations</h1>
      <q-input class="q-mt-lg" required outlined type="text"  v-model="name" label="Entrer votre nom" />
      <q-input class="q-mt-lg" required outlined type="text"  v-model="username" label="Nom d'utilisateur" @keyup="verifyUsername">
        <template v-slot:append>
          <q-spinner
            color="primary"
            size="20px"
            :thickness="5"
            v-if="verifyProgress"
          />
        </template>
      </q-input>
      <p class=" text-red-10" v-if="errorName">Les espaces ne sont pas autorisé</p>
      <p class=" text-red-10" v-if="!disponibility">Nom d'utilisateur indisponible</p>

      <div class="q-mt-lg">
        <label for="">Choisissez une actus</label>
        <q-input class="q-mt-sm" required outlined type="text"  v-model="actus" label="Actus" />
      </div>

      <div class="q-mt-lg">
        <label for="">Choisissez une photo de profile</label>
        <input class="q-mt-md" accept="image/*" type="file" @change="handleFile" />
      </div>
     

      <div class=" q-mt-lg">
        <q-btn label="Modifier" :disabled="!disponibility || verifyProgress || errorName" type="submit" color="primary">
          <q-spinner
            color="primary"
            size="1rem"
            v-if="isLoading"
            :thickness="5"
          />
        </q-btn>
        <q-btn label="Annuler" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </form>
  </div>
  
</template>

<style>

</style>