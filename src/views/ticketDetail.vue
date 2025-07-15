<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTicket } from '../api'

const route = useRoute()
const router = useRouter()
const ticket = ref(null)

onMounted(async () => {
  const token = localStorage.getItem('token')
  const id = route.params.id
  const res = await getTicket(token, id)
  ticket.value = res.data
})

function back() {
  router.push('/tickets')
}
</script>

<template>
  <div class="content" v-if="ticket">
    <h2>Ticket Details</h2>
    <p><strong>Number:</strong> {{ ticket.number }}</p>
    <p><strong>City:</strong> {{ ticket.city }}</p>
    <p><strong>Status:</strong> {{ ticket.status }}</p>
    <img v-if="ticket.image" :src="ticket.image" alt="ticket" style="max-width: 400px" />
    <video v-if="ticket.video" :src="ticket.video" controls style="max-width: 400px" />
    <button @click="back">Back</button>
  </div>
</template>
