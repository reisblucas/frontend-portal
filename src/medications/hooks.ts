import { useQuery } from '@tanstack/react-query'
import { medicationsService } from './services'
import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'

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

export function usePagination({ last_page, pagesVisible = 1, crrPage }) {
  return useCallback(() => {
    let setEllipsisNow = false
    const pages: usePagination.Pages[] = []

    for (let i = 1; i <= last_page; i++) {
      const obj = { page: i, show: false }

      if (i === 1 || i === last_page) {
        obj.show = true
      }

      if (crrPage === i) {
        obj.show = true
      }

      if (i === crrPage - pagesVisible || i === crrPage + pagesVisible) {
        obj.show = true
      }

      if (i > crrPage - pagesVisible && i < crrPage + pagesVisible) {
        obj.show = true
      }

      if (obj.show) {
        pages.push(obj)

        if (!setEllipsisNow) {
          setEllipsisNow = true
          continue
        } else {
          continue
        }
      }

      if (setEllipsisNow) {
        pages.push({ page: i, show: false })
        setEllipsisNow = false
      }
    }

    return pages
  }, [crrPage, pagesVisible, last_page])
}

export namespace usePagination {
  export interface Pages {
    page: number
    show: boolean
  }
}

export function useManufacturers() {
  const toast = useToast()

  return useQuery({
    queryKey: ['manufacturers'],
    queryFn: () => medicationsService.getManufacturers(),
    onError: () => {
      toast({
        title: 'Manufacturers',
        description: 'Something went wrong on fetching manufacturers',
        status: 'error',
      })
    },
  })
}
