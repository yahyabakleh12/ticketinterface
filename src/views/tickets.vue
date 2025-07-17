<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTickets } from '../api'
import Sidebar from '../components/Sidebar.vue'
import NavBar from '../components/NavBar.vue'

const router = useRouter()
const tickets = ref([])

async function fetchTickets() {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      const res = await getTickets(token)
      tickets.value = res.data.map((t) => ({
        id: t.id,
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
  router.push(`/ticket/${id}`)
}

function editTicket(id) {
  alert(`Edit ${id}`)
}

function deleteTicket(id) {
  alert(`Delete ${id}`)
}
</script>

<template>
  <!-- <div class="container-fluid">
    <div class="row">
      <Sidebar class="col-md-2 p-0" />
      <div class="col-md-10 ms-auto">
        <NavBar :title="'Tickets'" :notifications="tickets.length">
          <button class="btn btn-primary btn-sm" @click="addTicket">
            Add New Ticket
          </button>
        </NavBar> -->
  <div class="filters row g-2 p-3 bg-light border-bottom">
    <div class="col-sm">
      <input v-model="filters.dateRange" class="form-control" placeholder="Entry/Exit Range" />
    </div>
    <div class="col-sm">
      <input v-model="filters.cameraId" class="form-control" placeholder="Camera ID" />
    </div>
    <div class="col-sm">
      <input v-model="filters.plate" class="form-control" placeholder="Plate Number" />
    </div>
    <div class="col-sm">
      <input v-model="filters.code" class="form-control" placeholder="Code" />
    </div>
    <div class="col-sm">
      <input v-model="filters.emirate" class="form-control" placeholder="Emirate" />
    </div>
  </div>
  <table class="table table-striped">
    <thead>
      <tr>
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
      <tr v-for="t in tickets" :key="t.id">
        <td>{{ t.number }}</td>
        <td>{{ t.code }}</td>
        <td>{{ t.city }}</td>
        <td>{{ t.cameraId }}</td>
        <td>{{ t.entryTime }}</td>
        <td>{{ t.exitTime }}</td>
        <td>{{ t.duration }}</td>
        <td>
          <img :src="`data:image/jpeg;base64,${t.image}`" alt="Car"
            style="width: 40px; height: 24px; object-fit: cover; border-radius: 4px;" />
        </td>
        <td>
          <button class="btn btn-warning btn-sm me-1" @click="viewTicket(t.id)">
            View
          </button>
          <button class="btn btn-secondary btn-sm me-1" @click="editTicket(t.id)">
            Edit
          </button>
          <button class="btn btn-danger btn-sm" @click="deleteTicket(t.id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- </div>
    </div>
  </div> -->
</template>

<style src="./tickets.css" scoped></style>
