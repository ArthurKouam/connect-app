<script setup>
import { getImageLink } from 'src/service/Image';

  const props = defineProps({
    com: {
      required: true,
    }
  });

  const dateC = new Date(props.com.commentaire.created_at);
  const dateP = (dateC.getDate() + 1) + "/" + (dateC.getMonth() + 1)+ ", " + dateC.getHours() + "h"

  console.log(props);
</script>

<template>
  <q-card class="post-card q-mb-md" flat style="border-bottom: 1px solid black;">
    <q-card-section horizontal>
      <q-avatar size="40px" round color="primary" class="q-mr-md">
        <img :src="getImageLink(`picture/${com.user.picture}`)" v-if="com.user.picture" loading="lazy">
        <q-icon name="user" color="white" v-else></q-icon>
      </q-avatar>

      <q-card-section vertical class="full-width">
        <div class="row items-center no-wrap">
          <div class="">{{ com.user.name }}</div>
          <div class="text-grey-7 q-ml-sm">@{{ com.user.username }}</div>
          <q-space />
          <div class="text-grey-7">{{ dateP }}</div>
        </div>

        <div class="com-content q-mt-sm">
          {{ com.commentaire.content }}
        </div>
 
      </q-card-section>
    </q-card-section>
  </q-card>
</template>


<style scoped>
.post-card {
  max-width: 600px;

}

.post-content {
    white-space: pre-line;
    word-break: break-word;
  }
</style>
