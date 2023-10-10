import { Button, Flex, Heading, Skeleton, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Filters, MedicationsGridList, useMedications, usePagination } from '@/medications'
import { useDebounce, useDeleteRouterQuery, useUpdateRouterQuery } from '@/infra/helpers'

export default function Medications() {
  const router = useRouter()

  const queryPage = useMemo(() => (router.query?.page ? Number(router.query.page) : 1), [router.query])
  const [crrPage, setCrrPage] = useState(queryPage)

  const querySearch = useMemo(() => {
    if (router.query?.search && (router.query?.search).length > 3) {
      return router.query.search as string
    }

    return null
  }, [router.query])
  const [search, setSearch] = useState(querySearch)
  const debouncedInputValue = useDebounce(search, 500)

  const queryLimit = useMemo(() => {
    const allowedLimits = ['50', '80', '100']
    if (router.query?.limit && allowedLimits.includes(router.query.limit as string)) {
      return Number(router.query.limit)
    }

    return 50
  }, [router.query])
  const [limit, setLimit] = useState(queryLimit)

  const updateRouterQuery = useUpdateRouterQuery(router)
  const deleteRouterQuery = useDeleteRouterQuery(router)

  useEffect(() => {
    if (debouncedInputValue?.length > 3) {
      updateRouterQuery('search', debouncedInputValue)
    }

    if (search?.length === 0) {
      deleteRouterQuery('search')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue, search])

  useEffect(() => {
    if (limit !== null) {
      updateRouterQuery('limit', limit.toString())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit])

  useEffect(() => {
    updateRouterQuery('page', crrPage.toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crrPage])

  const shouldUseSearchIf = querySearch
    ? querySearch
    : debouncedInputValue && debouncedInputValue.length > 3
    ? debouncedInputValue
    : null
  const medications = useMedications({
    page: crrPage,
    limit,
    search: shouldUseSearchIf,
  })

  const last_page = medications.isSuccess ? medications.data.last_page : 1
  const pagination = usePagination({ crrPage, last_page, pagesVisible: 2 })

  useEffect(() => {
    if (Number(router.query.page) > medications.data?.last_page) {
      setCrrPage(1)
    }
  }, [medications.data, router.query.page, search])

  const showNoComponentData =
    medications.isSuccess && medications.data.data.length === 0 && search !== null && !medications.isFetching

  const handleSearchAction = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e
    const trimmedValue = value.trim()
    setSearch(trimmedValue)
  }, [])

  const handleLimitAction = useCallback((e: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e

    setLimit(Number(value))
  }, [])

  return (
    <VStack gap={4}>
      <Heading as="h1" textAlign="center">
        Medications
      </Heading>

      <Filters
        search={search}
        queryLimit={queryLimit}
        handleLimitAction={handleLimitAction}
        handleSearchAction={handleSearchAction}
      />

      <Skeleton isLoaded={medications.isSuccess}>
        {showNoComponentData && (
          <Text>
            No medication found or contain the word <Text as="span">&quot;{debouncedInputValue}&quot;</Text>
          </Text>
        )}

        {medications.isSuccess && <MedicationsGridList medications={medications.data} />}

        <Flex gap={2} justifyContent="center" alignItems="center">
          {medications.isSuccess &&
            pagination().map(({ page, show }) => {
              if (!show) {
                return <Text key={`${page * Math.PI} ${show}`}>...</Text>
              }

              return (
                <Button key={`${page * Math.PI} ${show}`} onClick={() => setCrrPage(page)} variant="outline">
                  <Text color={queryPage === page ? 'green.500' : 'inherit'} _hover={{ color: 'blue.500' }}>
                    {page}
                  </Text>
                </Button>
              )
            })}
        </Flex>
      </Skeleton>
    </VStack>
  )
}

Medications.title = 'Medications'
Medications.content = 'List of medications'
