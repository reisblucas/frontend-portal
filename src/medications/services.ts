import { client } from '@/infra/axios'
import { MedicationsList } from './contracts'

class MedicationsService {
  async get({ page, limit, search }: MedicationsService.ListParams) {
    const response = await client.get<MedicationsList>('/medications', { params: { page, limit, search } })
    return response.data
  }
}

export namespace MedicationsService {
  export type ListParams = {
    page: number
    limit: number
    search: string
  }
}

export const medicationsService = new MedicationsService()
