import { useQuery } from '@tanstack/react-query'
import { medicationsService } from './services'

export function useMedications({ page, limit, search }: useMedications.Params) {
  return useQuery({
    queryKey: ['medications', page, limit, search],
    queryFn: () => medicationsService.get({ page, limit, search }),
  })
}

export namespace useMedications {
  export interface Params {
    page: number
    limit: number
    search?: string
  }
}
