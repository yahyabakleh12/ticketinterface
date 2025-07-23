<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cancelTicket, getTicket, getNextTicket, submitTicket } from '../api'

import NavBar from '../components/NavBar.vue'
import Sidebar from '../components/Sidebar.vue'
const route = useRoute()
const router = useRouter()
const ticket = ref(null)
const videoElement = ref(null)
const entryImage = ref(null)

function updateVideoHeight() {
  if (entryImage.value && videoElement.value) {
    const imageHeight = entryImage.value.clientHeight
    const videoHeight =
      videoElement.value.videoHeight || videoElement.value.clientHeight
    if (imageHeight && videoHeight) {
      if (videoHeight > imageHeight) {
        videoElement.value.style.height = `${imageHeight}px`
      } else {
        videoElement.value.style.height = ''
      }
    }
  }
}

async function fetchTicket() {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      const res = await getTicket(token, route.params.id)
      const t = res.data
      ticket.value = {
        id: t.id,
        token: t.token,
        number: t.number,
        code: t.code,
        city: t.city,
        cameraId: t.access_point_id,
        entryTime: t.entry_time,
        exitTime: t.exit_time,
        duration: formatDuration(t.entry_time, t.exit_time),
        entryPath: t.entry_pic_base64,
        exitPath: t.exit_video_path,
        exitVideo: t.exit_video_path,
        image: t.car_pic,
        status: t.status,
      }
    }
  } catch (e) {
    console.error('Failed to load ticket', e)
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

function back() {
  router.push('/tickets')
}

async function goToNextTicket() {
  try {
    const token = localStorage.getItem('token')
    if (token && ticket.value) {
      const res = await getNextTicket(token, ticket.value.id)
      const next = res.data
      if (!next || !next.id) {
        router.push('/tickets')
        window.location.assign('/tickets')
        return
      }

      router.push(`/ticket/${next.id}`)
      window.location.assign(`/ticket/${next.id}`)
    }
  } catch (e) {
    console.error('Failed to load next ticket', e)
  }
}

async function submitAndNext() {
  try {
    const token = localStorage.getItem('token')
    if (token && ticket.value) {
      await submitTicket(token, ticket.value.id)
      await goToNextTicket()
    }
  } catch (e) {
    console.error('Failed to submit ticket', e)
  }
}

async function cancelAndNext() {
  try {
    const token = localStorage.getItem('token')
    if (token && ticket.value) {
      await cancelTicket(token, ticket.value.id)
      await goToNextTicket()
    }
  } catch (e) {
    console.error('Failed to submit ticket', e)
  }
}
async function Next() {
  try {
    const token = localStorage.getItem('token')
    if (token && ticket.value) {
      await goToNextTicket()
    }
  } catch (e) {
    console.error('Failed to submit ticket', e)
  }
}

function getMimeType(fileName) {
  if (!fileName) return ''
  const ext = fileName.split('.').pop().toLowerCase()
  if (ext === 'mp4' || ext === 'mp4v') return 'video/mp4'
  if (ext === 'wav') return 'audio/wav'
  return ''
}

onMounted(async () => {
  await fetchTicket()
  await nextTick()
  updateVideoHeight()
  window.addEventListener('resize', updateVideoHeight)
})

watch(
  () => ticket.value && ticket.value.exitVideo,
  () => {
    nextTick(updateVideoHeight)
  },
)

watch(ticket, () => {
  nextTick(updateVideoHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateVideoHeight)
})
</script>

<template>
  <div class="container-fluid px-0">
    <div class="dashboard" v-if="ticket">
      <Sidebar />
      <div class="main">
        <NavBar title="Ticket Details" :notifications="1" />
        <div class="card m-3 p-3">
          <div class="row">
            <div class="d-grid gap-2 col-4 mx-auto p-3">
              <button class="btn btn-danger me-2" @click="cancelAndNext">cancel</button>
            </div>
            <div class="d-grid gap-2 col-4 mx-auto p-3">
              <button class="btn btn-success me-2 justify-contant-center" @click="submitAndNext">
                Submit
              </button>
            </div>
            <div class="d-grid gap-2 col-4 mx-auto p-3">
              <button class="btn btn-primary me-2" @click="Next">Next</button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 p-3">
              <div class="mt-3">
                <p>
                  <strong>Entry File:</strong>
                  <img
                    ref="entryImage"
                    :src="`http://10.11.5.103:18001/image-in/${ticket.id}`"
                    alt="in image"
                    class="img-fluid rounded"
                    @load="updateVideoHeight"
                  />
                </p>
              </div>
            </div>
            <div class="col-md-6 p-3">
              <div class="mt-3">
                <p>
                  <strong>Exit File:</strong>
                  <video
                    ref="videoElement"
                    class="w-100 mt-2"
                    controls
                    v-if="ticket.exitVideo"
                    :src="`http://10.11.5.103:18001/videos/${ticket.exitVideo}`"
                    @loadedmetadata="updateVideoHeight"
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 text-center">
              <img
                :src="`http://10.11.5.103:18001/image-car/${ticket.id}`"
                alt="car"
                class="img-fluid rounded mb-3"
                style="height: 100%"
              />
            </div>
            <div class="col-md-8 bg-dark text-white p-3">
              <p><strong>Number:</strong> {{ ticket.number }}</p>
              <p><strong>Code:</strong> {{ ticket.code }}</p>
              <p><strong>City:</strong> {{ ticket.city }}</p>
              <p><strong>Camera ID:</strong> {{ ticket.cameraId }}</p>
              <p><strong>Entry Time:</strong> {{ ticket.entryTime }}</p>
              <p><strong>Exit Time:</strong> {{ ticket.exitTime }}</p>
              <p><strong>Duration:</strong> {{ ticket.duration }}</p>
              <p><strong>Status:</strong> {{ ticket.status }}</p>
            </div>
          </div>

          <button class="btn btn-primary mt-3" @click="back">Back</button>
        </div>
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
