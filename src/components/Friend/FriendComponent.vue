<script setup>
import { defineProps, defineEmits } from 'vue';
import { getImageLink } from 'src/service/Image';

defineEmits(['delete']);

defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>


<template>
  <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-avatar size="60px" font-size="52px" color="teal" text-color="white">
          <img :src="getImageLink(user.picture)" alt="" v-if="user.picture">
          <q-icon color="primary" name="person" v-else/>
        </q-avatar>
      </q-item-section>
      <q-item-section top>
        <q-item-label>{{ user.name }}</q-item-label>
        <q-item-label caption>@{{ user.username }}</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-item-label><q-btn color="primary"  outline round icon="delete" @click.stop="$emit('delete', user.id)" /></q-item-label>
      </q-item-section>      
  </q-item>
</template>
