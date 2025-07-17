<script setup>
const props = defineProps({
  title: { type: String, default: '' },
  notifications: { type: Number, default: 0 }
})
</script>

<template>
  <header
    class="header-bar d-flex justify-content-between align-items-center p-3 bg-white border-bottom"
  >
    <h1 class="h4 m-0">{{ props.title }}</h1>
    <div class="header-actions d-flex align-items-center gap-3">
      <slot></slot>
      <div class="position-relative">
        <span class="icon">🔔</span>
        <span
          class="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle p-1"
          style="font-size: 0.65rem"
          >{{ props.notifications }}</span
        >
      </div>
      <div class="user">admin ▾</div>
    </div>
  </header>
</template>
