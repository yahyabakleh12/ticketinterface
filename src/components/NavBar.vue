<script setup>
const props = defineProps({
  title: { type: String, default: '' },
  notifications: { type: Number, default: 0 }
})
</script>

<template>
  <header class="header-bar">
    <h1>{{ props.title }}</h1>
    <div class="header-actions">
      <slot></slot>
      <div class="bell">
        <span class="icon">🔔</span>
        <span class="badge">{{ props.notifications }}</span>
      </div>
      <div class="user">admin ▾</div>
    </div>
  </header>
</template>
