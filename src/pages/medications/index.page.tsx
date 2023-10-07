import { Medication, useMedications } from '@/medications'
import { Flex, Grid, Heading, Skeleton, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo, useState } from 'react'

export default function Medications() {
  const { query } = useRouter()
  const queryPage = useMemo(() => (query?.page ? Number(query.page) : 1), [query])
  const [crrPage, setCrrPage] = useState(queryPage)
  const medications = useMedications({ page: crrPage, limit: 50 })

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

  return (
    <VStack gap={4}>
      <Heading as="h1" textAlign="center">
        Medications
      </Heading>

      <Skeleton isLoaded={medications.isSuccess}>
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
