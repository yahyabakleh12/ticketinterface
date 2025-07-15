<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTickets } from '../api'

const router = useRouter()
const tickets = ref([])

async function fetchTickets() {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      const res = await getTickets(token)
      tickets.value = res.data.map((t) => ({
        token: t.token,
        number: t.number,
        code: t.code,
        city: t.city,
        cameraId: t.access_point_id,
        entryTime: t.entry_time,
        exitTime: t.exit_time,
        duration: formatDuration(t.entry_time, t.exit_time),
        image: t.car_pic,
      }))
    }
  } catch (e) {
    console.error('Failed to load tickets', e)
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

onMounted(() => {
  fetchTickets()
})

const filters = ref({
  dateRange: '',
  cameraId: '',
  plate: '',
  code: '',
  emirate: '',
})

function addTicket() {
  alert('Add ticket')
}

function viewTicket(id) {
  router.push(`/tickets/${id}`)
}

function editTicket(id) {
  alert(`Edit ${id}`)
}

function deleteTicket(id) {
  alert(`Delete ${id}`)
}
</script>

<template>
  <div class="dashboard">
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
        <h1>Tickets</h1>
        <div class="header-actions">
          <button class="btn primary" @click="addTicket">Add New Ticket</button>
          <div class="bell">
            <span class="icon">🔔</span>
            <span class="badge">{{ tickets.length }}</span>
          </div>
          <div class="user">admin ▾</div>
        </div>
      </header>
      <div class="filters">
        <input v-model="filters.dateRange" placeholder="Entry/Exit Range" />
        <input v-model="filters.cameraId" placeholder="Camera ID" />
        <input v-model="filters.plate" placeholder="Plate Number" />
        <input v-model="filters.code" placeholder="Code" />
        <input v-model="filters.emirate" placeholder="Emirate" />
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Token</th>
            <th>Number</th>
            <th>Code</th>
            <th>City</th>
            <th>Camera ID</th>
            <th>Entry Time</th>
            <th>Exit Time</th>
            <th>Duration</th>
            <th>Car Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in tickets" :key="t.token">
            <td>{{ t.token }}</td>
            <td>{{ t.number }}</td>
            <td>{{ t.code }}</td>
            <td>{{ t.city }}</td>
            <td>{{ t.cameraId }}</td>
            <td>{{ t.entryTime }}</td>
            <td>{{ t.exitTime }}</td>
            <td>{{ t.duration }}</td>
            <td><img :src="t.image" alt="car" /></td>
            <td>
              <button class="btn view" @click="viewTicket(t.token)">View</button>
              <button class="btn edit" @click="editTicket(t.token)">Edit</button>
              <button class="btn delete" @click="deleteTicket(t.token)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style src="./tickets.css" scoped></style>
