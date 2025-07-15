<script setup>
import { useRoute, useRouter } from 'vue-router'
import sampleTickets from '../assets/sampleTickets'

const route = useRoute()
const router = useRouter()
const ticket = sampleTickets.find((t) => t.token === route.params.id)

function back() {
  router.push('/tickets')
}
</script>

<template>
  <div class="dashboard" v-if="ticket">
    <aside class="sidebar">
      <h2>On Street Parking</h2>
      <ul>
        <li>Statistics</li>
        <li>Tickets</li>
        <li class="title">On Street Parking</li>
        <li class="active">Tickets</li>
        <li>Manual Reviews</li>
        <li>Users</li>
        <li>Roles</li>
        <li>Permissions</li>
        <li class="logout">Logout</li>
      </ul>
    </aside>
    <div class="main">
      <header class="header-bar">
        <h1>Ticket Details</h1>
        <div class="header-actions">
          <div class="bell">
            <span class="icon">🔔</span>
            <span class="badge">1</span>
          </div>
          <div class="user">admin ▾</div>
        </div>
      </header>
      <div class="detail-card">
        <img :src="ticket.image" alt="car" class="large-image" />
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
