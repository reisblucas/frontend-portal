import axios from 'axios'
import { getSession } from 'next-auth/react'

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

client.interceptors.request.use(async (config) => {
  const session = await getSession()

  if (session && session.clientToken) {
    config.headers.Authorization = `Bearer ${session.clientToken}`
  }

  return config
})
