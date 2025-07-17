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
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h2 class="mb-3 text-center">Login</h2>
        <div class="mb-3">
          <input
            v-model="username"
            type="text"
            class="form-control"
            placeholder="Username"
          />
        </div>
        <div class="mb-3">
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Password"
          />
        </div>
        <button class="btn btn-primary w-100" @click="doLogin">Login</button>
        <p class="text-danger mt-2" v-if="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>
