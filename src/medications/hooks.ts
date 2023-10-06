import { useQuery } from '@tanstack/react-query'
import { medicationsService } from './services'

export function useMedications() {
  return useQuery({
    queryKey: ['medications'],
    queryFn: () => medicationsService.get(),
    select: (data) => {
      console.log(data)
      return data
    },
  })
}
