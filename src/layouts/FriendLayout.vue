<script setup>
//  import {ref} from "vue";


</script>

<template>
  <q-header elevated>
    <q-toolbar>

      <q-toolbar-title>Amis</q-toolbar-title>

      <q-btn-dropdown auto-close flat round dense icon="menu" label="">
        <q-list>
          <q-item clickable v-close-popup @click="$router.replace('/friends')">
            <q-item-section>
              <q-item-label>Mes amis</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="$router.replace('/friends/recommend')">
            <q-item-section>
              <q-item-label>Recommandations</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="$router.replace('/friends/ask')">
            <q-item-section>
              <q-item-label>Demande recu</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="$router.replace('/friends/request')">
            <q-item-section>
              <q-item-label>Demande Envoyées</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
  </q-header>

  <q-page-container style="padding-top: 20px;">
    <router-view />
  </q-page-container>

</template>

<style scoped>

</style>
