<script setup>
  import { useUserStore } from 'src/stores/UserStore'
import { ref } from 'vue'
  
  const email = ref("")  
  const name = ref("")
  const username = ref("")
  const password = ref("")

  const userStore = useUserStore();

  const register = ()=>{
    userStore.register(email.value, name.value, username.value, password.value);
  }

</script>

<template>
  <div class="full-width window-height">
    <h1 class="text-h4 text-bold text-center q-mt-lg">CONNECT</h1><br>
    <q-form class="q-px-md q-mt-sm" method="post" @submit="register">
      <q-input required outlined type="email"  v-model="email" label="Adresse Email" />
      <q-input required class="q-mt-lg" outlined type="text"  v-model="name" label="Entrer votre nom" />
      <q-input required class="q-mt-lg" outlined type="text"  v-model="username" label="Nom d'utilisateur" />
      <q-input required class="q-mt-lg" outlined type="text"  v-model="password" label="Mot de passe" />   <br>
      <q-btn :disabled="userStore.getIsLoading" type="submit" class="q-mt-lg full-width bg-primary text-white rounded-borders">
        <q-spinner
          v-if="userStore.getIsLoading"
          color="whit"
          size="1rem"
          class="q-mr-sm"
          :thickness="5"
        />
        S'inscrire
      </q-btn>

    </q-form>
    <p class="q-mt-lg text-center">Vous avez déjà un compte ? <router-link to="/login" replace>Se connecter</router-link></p>
  </div>
</template>

<style scoped>

</style>

