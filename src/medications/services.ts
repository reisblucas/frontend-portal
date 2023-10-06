import { client } from '@/infra/axios'

class MedicationsService {
  async get() {
    const response = await client.get('/medications')
    return response.data
  }
}

export const medicationsService = new MedicationsService()
