<script setup>
import { ref } from 'vue';


  defineProps(['imageSrc'])
  defineEmits(['close'])
  const fullscreenOpen = ref(true)
</script>

<template>
    <q-dialog
      v-model="fullscreenOpen"
      maximized
      transition-show="fade"
      transition-hide="fade"
      class="flex justify-center items-center"
    >
      <q-card class="bg-black text-white flex justify-center items-center">
        <q-card-section class="q-pa-none">
          <div class="full-height full-width flex justify-center items-center">
            <img 
              :src="imageSrc" 
              class="fullscreen-image"
            />
          </div>
        </q-card-section>
        
        <q-btn
          round
          color="white"
          text-color="black"
          icon="close"
          class="fixed-top-right q-ma-md"
          @click="$emit('close')"
        />
      </q-card>
    </q-dialog>

</template>

<style scoped>
  .fullscreen-image{
    max-width: 100vw;
    object-fit: contain;
    max-height: 100vh;
  }

</style>