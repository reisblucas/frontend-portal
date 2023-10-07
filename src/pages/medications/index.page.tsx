import { Medication, useMedications } from '@/medications'
import { useDebounce } from '@/infra/helpers'
import { Flex, FormLabel, Grid, Heading, Input, Select, Skeleton, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

export default function Medications() {
  const router = useRouter()
  const queryPage = useMemo(() => (router.query?.page ? Number(router.query.page) : 1), [router.query])
  const [crrPage, setCrrPage] = useState(queryPage)

  const querySearch = useMemo(() => (router.query?.search as string) ?? null, [router.query])
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

  const updateRouterQuery = useCallback(
    (queyrParam: string, queryValue: string) => {
      router.push({
        ...router,
        query: {
          [queyrParam]: queryValue,
        },
      })
    },
    [router],
  )

  useEffect(() => {
    if (search !== null) {
      updateRouterQuery('search', search.trim())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue, search])
  console.log('search / debounce', search, debouncedInputValue)

  const medications = useMedications({
    page: crrPage,
    limit,
    search: querySearch ? querySearch : debouncedInputValue ? debouncedInputValue : null,
  })

  const getPagination = useCallback(
    (last_page: number, pagesVisible = 1) => {
      let setEllipsisNow = false
      const pages: Medications.PaginationPages[] = []

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
    },
    [crrPage],
  )

  const formatStrength = useCallback((strength: string) => {
    const asterisk = strength.indexOf('*')
    const strengthText = strength.slice(0, asterisk - 1)
    const observation = strength.slice(asterisk)

    return { strength: strengthText, observation }
  }, [])

  const getStrength = useCallback(
    (medication: Medication) => {
      return medication.strength.includes('**') ? (
        <Text fontSize={{ base: '2xs', md: 'xs' }}>{formatStrength(medication.strength).strength} **</Text>
      ) : (
        <Text fontSize={{ base: '2xs', md: 'xs' }} noOfLines={1}>
          {medication.strength}
        </Text>
      )
    },
    [formatStrength],
  )

  const handleSearchAction = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e
    if (value.length > 3) {
      const trimmedValue = value.trim()
      setSearch(trimmedValue)
    }
  }, [])

  const handleLimitAction = useCallback(
    (e: React.FormEvent<HTMLSelectElement>) => {
      const {
        currentTarget: { value },
      } = e

      setLimit(Number(value))
      updateRouterQuery('limit', value)
    },
    [updateRouterQuery],
  )

  return (
    <VStack gap={4}>
      <Heading as="h1" textAlign="center">
        Medications
      </Heading>

      {/* filters component */}
      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent={{ base: 'space-between', md: 'space-around' }}
        alignItems="center"
        gap={2}
      >
        <FormLabel htmlFor="search" display="flex" justifyContent="space-between" alignItems="center">
          <Text minWidth="80px">Find med:</Text>
          <Input id="search" type="text" placeholder="Vasoxyl..." onChange={handleSearchAction} />
        </FormLabel>

        <Select
          placeholder="Items per page"
          maxWidth="30%"
          alignSelf="center"
          defaultValue="50"
          onChange={handleLimitAction}
        >
          <option value="50">
            <Link href={{ pathname: `/medications`, query: { limit: '50' } }}>50</Link>
          </option>
          <option value="80">
            <Link href={{ pathname: `/medications`, query: { limit: '80' } }}>80</Link>
          </option>
          <option value="100">
            <Link href={{ pathname: `/medications`, query: { limit: '100' } }}>100</Link>
          </option>
        </Select>
      </Flex>

      <Skeleton isLoaded={medications.isSuccess}>
        {/* List component */}
        {medications.isSuccess && medications.data.data.length === 0 && search !== null && (
          <Text>No medication found with name {search}</Text>
        )}

        <Grid
          gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: '50% 50%', lg: 'repeat(3, 1fr)' }}
          gridAutoFlow="dense"
          gap={8}
          rowGap={10}
        >
          {medications.isSuccess &&
            medications.data.data.map((medication) => {
              return (
                <Flex
                  key={medication.application_number + medication.product_number}
                  flexDirection="column"
                  padding={2}
                >
                  <Text
                    fontSize={{ base: 'xs', md: 'md' }}
                    textAlign="center"
                    fontWeight="bold"
                  >{`${medication.drug_name} `}</Text>

                  <Grid
                    gridTemplateColumns="100px 1fr"
                    sx={{
                      p: {
                        '#title': {
                          fontWeight: '600',
                        },
                      },
                    }}
                  >
                    <Text variant="grid">Active ing.:</Text>
                    <Text variant="grid" noOfLines={1}>
                      {medication.active_ingredient}
                    </Text>
                    <Text variant="grid">App num.:</Text>
                    <Text variant="grid">{medication.application_number}</Text>
                    <Text variant="grid">Product num.:</Text>
                    <Text variant="grid">{medication.product_number}</Text>
                    <Text variant="grid">Form:</Text>
                    <Text variant="grid">{medication.form}</Text>
                    <Text variant="grid">Strength:</Text>
                    {getStrength(medication)}
                  </Grid>
                </Flex>
              )
            })}
        </Grid>

        <Flex gap={2} justifyContent="center">
          {medications.isSuccess &&
            getPagination(medications.data.last_page, 2).map(({ page, show }) => {
              if (!show) {
                return <Text key={`${page * Math.PI} ${show}`}>...</Text>
              }

              return (
                <Link
                  href={{ pathname: '/medications', query: { page } }}
                  key={`${page * Math.PI} ${show}`}
                  onClick={() => setCrrPage(page)}
                >
                  <Text color={queryPage === page ? 'green.500' : 'inherit'} _hover={{ color: 'blue.500' }}>
                    {page}
                  </Text>
                </Link>
              )
            })}
        </Flex>
      </Skeleton>
    </VStack>
  )
}

export namespace Medications {
  export interface PaginationPages {
    page: number
    show: boolean
  }
}
