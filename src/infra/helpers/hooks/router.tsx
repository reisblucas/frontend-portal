import { NextRouter } from 'next/router'
import { useCallback } from 'react'

export function useUpdateRouterQuery(router: NextRouter) {
  const updateRouterQuery = useCallback(
    (queryParam: string, queryValue: string) => {
      router.query[queryParam] = queryValue
      router.push({ ...router }, undefined, {})
    },
    [router],
  )
  return updateRouterQuery
}

export function useDeleteRouterQuery(router: NextRouter) {
  const deleteRouterQuery = useCallback(
    (queryParam: string) => {
      delete router.query[queryParam]
      router.push({ ...router }, undefined, {})
    },
    [router],
  )

  return deleteRouterQuery
}
