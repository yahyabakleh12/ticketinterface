<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getSubmittedTickets } from '../api'
import Sidebar from '../components/Sidebar.vue'
import NavBar from '../components/NavBar.vue'

const router = useRouter()
const tickets = ref([])
const currentPage = ref(1)
const pageSize = 50
const hasNextPage = ref(false)

async function fetchTickets(page = currentPage.value) {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      const res = await getSubmittedTickets(token, page, pageSize)
      tickets.value = res.data.map((t) => ({
        id: t.id,
        token: t.token,
        number: t.number,
        code: t.code,
        city: t.city,
        status: t.status,
        cameraId: t.access_point_id,
        entryTime: t.entry_time,
        exitTime: t.exit_time,
        duration: formatDuration(t.entry_time, t.exit_time),
        image: t.car_pic,
      }))
      hasNextPage.value = res.data.length === pageSize
      currentPage.value = page
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

function nextPage() {
  if (hasNextPage.value) {
    fetchTickets(currentPage.value + 1)
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    fetchTickets(currentPage.value - 1)
  }
}

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

// function editTicket(id) {
//   alert(`Edit ${id}`)
// }

// function deleteTicket(id) {
//   alert(`Delete ${id}`)
// }
</script>

<template>
  <div class="container-fluid px-0">
    <div class="dashboard px-0">
      <Sidebar />
      <div class="main">
        <NavBar :title="'Submitted Tickets'" :notifications="tickets.length">
          <button class="btn primary" @click="addTicket">Add New Ticket</button>
        </NavBar>
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
              <th>Number</th>
              <th>Code</th>
              <th>City</th>
              <th>Camera ID</th>

              <th>Entry Time</th>
              <th>Exit Time</th>
              <th>Duration</th>
              <th>Car Image</th>
              <th>Status</th>
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
              <td><img :src="`http://10.11.5.103:18001/image-in/${t.id}`" alt="Car"
                  style="width:40px; height:24px; object-fit:cover; border-radius:4px;" /></td>
              <td>{{ t.status }}</td>
              <td>
                <button class="btn view" @click="viewTicket(t.id)">View</button>
                <!-- <button class="btn edit" @click="editTicket(t.id)">Edit</button>
              <button class="btn delete" @click="deleteTicket(t.id)">Delete</button> -->
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button class="btn primary" @click="prevPage" :disabled="currentPage === 1">Prev</button>
          <span class="mx-2">Page {{ currentPage }}</span>
          <button class="btn primary" @click="nextPage" :disabled="!hasNextPage">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./tickets.css" scoped></style>
