<script setup>
import { ref } from 'vue'

const orders = ref([
  {
    id: 'ORD-1001',
    code: 'P-01',
    category: 'Electronics',
    region: 'Dubai',
    start: '2024-05-01 08:00',
    end: '2024-05-01 10:00',
    duration: '2h',
    image: 'https://via.placeholder.com/40',
  },
  {
    id: 'ORD-1002',
    code: 'P-02',
    category: 'Furniture',
    region: 'Abu Dhabi',
    start: '2024-05-03 09:15',
    end: '2024-05-03 10:45',
    duration: '1h 30m',
    image: 'https://via.placeholder.com/40',
  },
  {
    id: 'ORD-1003',
    code: 'P-03',
    category: 'Groceries',
    region: 'Sharjah',
    start: '2024-05-05 12:00',
    end: '2024-05-05 13:20',
    duration: '1h 20m',
    image: 'https://via.placeholder.com/40',
  },
])

function addOrder() {
  alert('Add new order')
}
</script>

<template>
  <div class="admin-dashboard">
    <aside class="sidebar">
      <h2 class="logo">Admin</h2>
      <ul class="nav">
        <li>Dashboard</li>
        <li>Reports</li>
        <li>Inventory</li>
        <li class="active">Orders</li>
        <li>Customers</li>
        <li>Settings</li>
        <li>Logout</li>
      </ul>
    </aside>
    <div class="main">
      <header class="header-bar">
        <h1>Orders</h1>
        <div class="header-actions">
          <button class="btn primary" @click="addOrder">Add New Order</button>
          <div class="bell">
            <span class="icon">🔔</span>
            <span class="badge">3</span>
          </div>
          <div class="user">Admin ▾</div>
        </div>
      </header>
      <div class="filters">
        <input type="text" placeholder="Date range" />
        <input type="text" placeholder="Product code" />
        <input type="text" placeholder="Region" />
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Category</th>
            <th>Region</th>
            <th>Start</th>
            <th>End</th>
            <th>Duration</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.code }}</td>
            <td>{{ order.category }}</td>
            <td>{{ order.region }}</td>
            <td>{{ order.start }}</td>
            <td>{{ order.end }}</td>
            <td>{{ order.duration }}</td>
            <td><img :src="order.image" alt="" /></td>
            <td>
              <button class="btn view">View</button>
              <button class="btn edit">Edit</button>
              <button class="btn delete">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  background: #222;
  color: #fff;
  padding: 1rem;
}

.logo {
  margin-bottom: 1rem;
}

.nav {
  list-style: none;
  padding: 0;
}

.nav li {
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
}

.nav li:hover,
.nav li.active {
  background: rgba(255, 255, 255, 0.1);
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
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
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
  background: #fff;
  border-bottom: 1px solid #ddd;
}

.filters input,
.filters select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
}

.data-table tr:hover {
  background: #f7f7f7;
}

.data-table img {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
}

.btn {
  padding: 0.25rem 0.75rem;
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
  background: #198754;
}

.delete {
  background: #dc3545;
}

@media (max-width: 768px) {
  .admin-dashboard {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }
}
</style>
