import { client } from '@/infra/axios'
import { Manufacturer, ManufacturersList, MedicationsList } from './contracts'

class MedicationsService {
  async get({ page, limit, search }: MedicationsService.ListParams) {
    const response = await client.get<MedicationsList>('/medications', { params: { page, limit, search } })
    return response.data
  }

  async getManufacturers() {
    const response = await client.get<ManufacturersList>('/manufacturers')
    return response.data
  }

  async createMedication(medication: MedicationsService.CreateMedicationParams) {
    const response = await client.post('/medications', medication)
    return response.data
  }
}

export namespace MedicationsService {
  export interface ListParams {
    page: number
    limit: number
    search: string
  }

  export interface CreateMedicationParams {
    drug_name: string
    units_per_package: number
    issued_on: string
    expires_on: string
    manufacturers: Manufacturer[]
  }
}

export const medicationsService = new MedicationsService()
