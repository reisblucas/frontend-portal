import { Medication, useMedications } from '@/medications'
import { Flex, Grid, Heading, Link, Skeleton, Text, VStack } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'

export default function Medications() {
  const medications = useMedications({ page: 5, limit: 50 })
  const [crrPage] = useState(1) // after that get actual page using route params to inject on state

  const getPagination = useCallback(
    (last_page: number, pagesVisible = 1) => {
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

        pages.push(obj)
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
        <>
          <Text fontSize={{ base: '2xs', md: 'xs' }}>{formatStrength(medication.strength).strength}</Text>
          {/* <Text fontSize={{ base: '2xs', md: 'xs' }}>{formatStrength(medication.strength).observation}</Text> */}
        </>
      ) : (
        <Text fontSize={{ base: '2xs', md: 'xs' }}>{medication.strength}</Text>
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

        {medications.isSuccess &&
          getPagination(medications.data.last_page, 2).map((page) => {
            if (!page.show) {
              return
            }

            return (
              <Flex gap={2} key={page.page * 3.14}>
                <Link href={`/medications/${page.page}`}>{page.page}</Link>
              </Flex>
            )
          })}
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
