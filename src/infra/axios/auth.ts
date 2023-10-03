import axios from 'axios'

export const auth = axios.create({
  url: '/api/auth',
})
