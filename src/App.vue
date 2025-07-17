<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="container" v-if="ticket">
    <div class="row">
      <div class="col-md-2 p-0 ms-auto">
        <Sidebar />
      </div>
      <div class="col-md-10 ms-auto">
        <NavBar title="Ticket Details" :notifications="1" />
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
