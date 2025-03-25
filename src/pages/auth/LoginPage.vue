<script setup>
import { useUserStore } from 'src/stores/UserStore';
import { ref } from 'vue';
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

  const email = ref("");
  const password = ref("");
  const userStore = useUserStore();

  const login = () => {
    userStore.login(email.value, password.value);
  }


</script>

<template>
  <div class="full-width window-height">
    <h1 class="text-h4 text-bold text-center q-mt-lg">CONNECT</h1><br>
    <q-form class="q-px-md q-mt-sm" method="post" @submit="login">
      <q-input outlined type="email"  v-model="email" label="Adresse Email" />

      <q-input class="q-mt-lg" outlined  v-model="password" label="Mot de passe" />   <br>
      <q-btn :disabled="userStore.getIsLoading" type="submit" class="q-mt-lg full-width bg-primary text-white rounded-borders">
        <q-spinner
          v-if="userStore.getIsLoading"
          color="whit"
          size="1rem"
          class="q-mr-sm"
          :thickness="5"
        />
        Se connecter
      </q-btn>

    </q-form>
    <p class="q-mt-lg text-center">Vous n'avez pas de compte ? <router-link to="/register" replace>S'inscrire</router-link></p>
  </div>
</template>

<style scoped>

</style>
