<template>
  <div class="user-info">
    <div class="user-avatar">
      <q-avatar size="80px" font-size="52px" color="primary" text-color="white" v-if="!user.picture">
        <q-icon name="person" />
      </q-avatar>
      <q-avatar size="80px" font-size="52px" v-else>
        <img :src="getImageLink(user.picture)" />
      </q-avatar>
    </div>
    <div class="user-name">{{ user.name }}</div>
    <div class="user-username">@{{ user.username }}</div>
    <q-btn color="primary" outline class="q-px-sm q-py-xs" icon="person_add" label="Demander" @click.stop="$emit('addFriend', user.id)" />
  </div>
</template>

<script setup>
import { getImageLink } from 'src/service/Image';
import { defineEmits, defineProps } from 'vue';

defineProps({
  user: {
    type: Object,
    required: true
  }
});

defineEmits(['addFriend']);
</script>

<style scoped>
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px 5px;
}

.user-avatar {
  margin-bottom: 16px;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.user-username {
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
}
</style>
