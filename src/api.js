import axios from 'axios'

const api = axios.create({
  baseURL: 'http://10.11.5.103:18001',
})

export function login(username, password) {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  return api.post('/login', params)
}

export function getTickets(token) {
  return api.get('/tickets?status=waiting', {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function getTicket(token, id) {
  return api.get(`/ticket/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function submitTicket(token, id) {
  return api.post(
    `/submit/${id}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
}
export function cancelTicket(token, id) {
  return api.post(
    `/ticket/${id}/cancel`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
}

export function getNextTicket(token, id) {
  return api.get(`/ticket/${id}/next`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
