import { useQuery } from '@tanstack/react-query'
import { medicationsService } from './services'
import { useToast } from '@chakra-ui/react'

export function useMedications({ page, limit, search }: useMedications.Params) {
  const toast = useToast()

  return useQuery({
    queryKey: ['medications', page, limit, search],
    queryFn: () => medicationsService.get({ page, limit, search }),
    onError: () => {
      toast({
        title: 'Medications',
        description: 'Something went wrong on fetching medications',
        status: 'error',
      })
    },
  })
}

export namespace useMedications {
  export interface Params {
    page: number
    limit: number
    search?: string
  }
}
