<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTicket } from '../api'
import Sidebar from '../components/Sidebar.vue'
import NavBar from '../components/NavBar.vue'

const route = useRoute()
const router = useRouter()
const ticket = ref(null)

async function fetchTicket() {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      const res = await getTicket(token, route.params.id)
      const t = res.data
      ticket.value = {
        id: t.id,
        token: t.token,
        number: t.number,
        code: t.code,
        city: t.city,
        cameraId: t.access_point_id,
        entryTime: t.entry_time,
        exitTime: t.exit_time,
        duration: formatDuration(t.entry_time, t.exit_time),
        entryPath: t.entry_pic_path,
        exitPath: t.exit_video_path,
        exitVideo: t.exit_video_path,
        image: t.car_pic,
      }
    }
  } catch (e) {
    console.error('Failed to load ticket', e)
  }
}

function formatDuration(entry, exit) {
  if (!entry || !exit) return ''
  const diff = new Date(exit) - new Date(entry)
  if (Number.isNaN(diff)) return ''
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  return `${hours}h ${minutes}m`
}

function back() {
  router.push('/tickets')
}

onMounted(fetchTicket)
</script>

<template>
  <div class="dashboard" v-if="ticket">
    <Sidebar />
    <div class="main">
      <NavBar title="Ticket Details" :notifications="1" />
      <div class="detail-card">
        <img :src="`data:image/jpeg;base64,${ticket.image}`" alt="car" class="large-image" />
        <p><strong>Token:</strong> {{ ticket.token }}</p>
        <p><strong>Number:</strong> {{ ticket.number }}</p>
        <p><strong>Code:</strong> {{ ticket.code }}</p>
        <p><strong>City:</strong> {{ ticket.city }}</p>
        <p><strong>Camera ID:</strong> {{ ticket.cameraId }}</p>
        <p><strong>Entry Time:</strong> {{ ticket.entryTime }}</p>
        <p><strong>Exit Time:</strong> {{ ticket.exitTime }}</p>
        <p><strong>Duration:</strong> {{ ticket.duration }}</p>
        <p><strong>Entry File:</strong> {{ ticket.entryPath }}</p>
        <p><strong>Exit File:</strong> {{ ticket.exitPath }}</p>
        <video class="video" controls v-if="ticket.exitVideo" :src="ticket.exitVideo"></video>
        <button class="btn primary" @click="back">Back</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './tickets.css';
.detail-card {
  background: #fff;
  padding: 1rem;
  margin: 1rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.large-image {
  width: 200px;
  height: auto;
  margin-bottom: 1rem;
  border-radius: 4px;
}
.video {
  max-width: 320px;
  margin-top: 0.5rem;
}
</style>
