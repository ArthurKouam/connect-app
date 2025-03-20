<script setup>
  import { ref } from "vue";
  import {getImageLink} from "src/service/Image.js";
  import { onMounted } from "vue";
  import FullImage from "../post/FullImage.vue";

  const props = defineProps({
    post: {
      required: true
    }
  })

  console.log(props.post)

  const src = ref("");
  const full = ref(false)
  const dateC = new Date(props.post.post.created_at);
  const dateP = (dateC.getDate() + 1) + "/" + (dateC.getMonth() + 1)+ ", " + dateC.getHours() + "h"

  onMounted(()=>{
    const imgs = document.querySelectorAll('img');

    for (const img of imgs) {
      img.addEventListener('click', ()=>{
        console.log(img.src)
        src.value = img.src;
        full.value = true
      })
    }
  })
</script>

<template>
  <q-card class="post-card q-mb-md" flat bordered>
    <q-card-section horizontal>
      <q-avatar size="40px" round color="primary" class="q-mr-md">
        <img :src="getImageLink(`picture/${post.user.picture}`)" v-if="post.user.picture" loading="lazy">
        <q-icon name="user" color="white" v-else></q-icon>
      </q-avatar>

      <q-card-section vertical class="full-width">
        <div class="row items-center no-wrap">
          <div class="">{{ post.user.name }}</div>
          <div class="text-grey-7 q-ml-sm">@{{ post.user.username }}</div>
          <q-space />
          <div class="text-grey-7">{{ dateP }}</div>
        </div>

        <div class="post-content q-mt-sm">
          {{ post.post.description }}
        </div>

        <div v-if="post.image.length > 0" class="q-mt-sm">
          <div v-if="post.image.length === 1" class="single-image">
            <q-img
              :src="getImageLink(`post/${post.image[0].link}`)"
              :ratio="16/9"
              class="rounded-borders"
              loading="lazy"
            />
          </div>
          <div v-else-if="post.image.length === 2" class="two-images">
            <q-img
              :src="getImageLink(`post/${post.image[0].link}`)"
              :ratio="16/9"
              class="rounded-borders"
              loading="lazy"
            />
            <q-img
              :src="getImageLink(`post/${post.image[1].link}`)"
              :ratio="16/9"
              class="rounded-borders"
              loading="lazy"
            />
          </div>
          <div v-else-if="post.image.length === 3" class="three-images">
            <q-img
              :src="getImageLink(`post/${post.image[0].link}`)"
              :ratio="16/9"
              class="rounded-borders"
              loading="lazy"
            />
            <div class="two-images">
              <q-img
                :src="getImageLink(`post/${post.image[1].link}`)"
                :ratio="16/9"
                class="rounded-borders"
                loading="lazy"
              />
              <q-img
                :src="getImageLink(`post/${post.image[2].link}`)"
                :ratio="16/9"
                class="rounded-borders"
                loading="lazy"
              />
            </div>
          </div>
          <div v-else-if="post.image.length === 4" class="four-images">
            <div class="two-images">
              <q-img
                :src="getImageLink(`post/${post.image[0].link}`)"
                :ratio="16/9"
                class="rounded-borders"
                loading="lazy"
              />
              <q-img
                :src="getImageLink(`post/${post.image[1].link}`)"
                :ratio="16/9"
                class="rounded-borders"
                loading="lazy"
              />
            </div>
            <div class="two-images">
              <q-img
                :src="getImageLink(`post/${post.image[2].link}`)"
                :ratio="16/9"
                class="rounded-borders"
                loading="lazy"
              />
              <q-img
                :src="getImageLink(`post/${post.image[3].link}`)"
                :ratio="16/9"
                class="rounded-borders"
                loading="lazy"
              />
            </div>
          </div>
        </div>


      </q-card-section>
    </q-card-section>
  </q-card>
  <FullImage v-if="full" :image-src="src" @close="full = false"></FullImage>
</template>


<style scoped>
.post-card {
  max-width: 600px;

}

.post-content {
    white-space: pre-line;
    word-break: break-word;
  }

.single-image {
  display: block;
}

.two-images {
  display: flex;
  justify-content: space-between;
}

.three-images {
  display: flex;
  flex-direction: column;
}

.four-images {
  display: flex;
  flex-direction: column;
}

.two-images img {
  width: 49%;
}

.three-images .two-images {
  margin-top: 10px;
}

.three-images .two-images img {
  width: 49%;
}

.four-images .two-images {
  margin-top: 10px;
}

.four-images .two-images img {
  width: 49%;
}
</style>
