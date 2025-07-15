<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../api'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

async function doLogin() {
  try {
    const res = await login(username.value, password.value)
    localStorage.setItem('token', res.data.access_token)
    router.push('/tickets')
  } catch (e) {
    error.value = 'Invalid credentials'
  }
}
</script>

<template>
  <div class="login">
    <h2>Login</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="doLogin">Login</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
