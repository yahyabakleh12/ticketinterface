import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:18001',
})

export function login(username, password) {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  return api.post('/login', params)
}

export function getTickets(token) {
  return api.get('/tickets/', {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function getTicket(token, id) {
  return api.get(`/ticket/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
