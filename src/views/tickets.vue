<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import sampleTickets from '../assets/sampleTickets'

const router = useRouter()
const tickets = ref(sampleTickets)

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

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 240px;
  background: #1f2937;
  color: #fff;
  padding: 1rem;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
}
.sidebar li.title {
  margin-top: 1rem;
  font-weight: bold;
}
.sidebar li.logout {
  margin-top: 1rem;
}
.sidebar li.active,
.sidebar li:hover {
  background: #374151;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.bell {
  position: relative;
  font-size: 1.25rem;
  cursor: pointer;
}
.bell .badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background: #dc3545;
  color: #fff;
  border-radius: 50%;
  padding: 2px 5px;
  font-size: 0.65rem;
}
.user {
  cursor: pointer;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}
.filters input {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
}
.data-table th,
.data-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}
.data-table tr:hover {
  background: #f3f4f6;
}
.data-table img {
  width: 40px;
  height: 24px;
  object-fit: cover;
  border-radius: 4px;
}
.btn {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: #fff;
  border: none;
  font-size: 0.75rem;
  margin-right: 0.25rem;
}
.primary {
  background: #0d6efd;
}
.view {
  background: #ffc107;
}
.edit {
  background: #fd7e14;
}
.delete {
  background: #dc3545;
}
@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
  }
}
</style>
