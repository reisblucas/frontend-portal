import { Medication, useMedications } from '@/medications'
import { Flex, Grid, Heading, Skeleton, Text, VStack } from '@chakra-ui/react'
import React, { useCallback } from 'react'

export default function Medications() {
  const medications = useMedications({ page: 1, limit: 50 })

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
          <Text fontSize={{ base: '2xs', md: 'xs' }}>{formatStrength(medication.strength).observation}</Text>
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
          gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
          gridAutoFlow="dense"
          gap={4}
          // justifyContent="space-around"
        >
          {medications.isSuccess &&
            medications.data.data.map((medication) => {
              return (
                <Flex
                  key={medication.application_number + medication.product_number}
                  flexDirection="column"
                  padding={2}
                >
                  <Text fontSize={{ base: 'xs', md: 'md' }}>{`${medication.drug_name} ${medication.strength}`}</Text>

                  <Flex gap={2} flexDirection="column">
                    <Text fontSize={{ base: '2xs', md: 'xs' }}>{medication.active_ingredient}</Text>
                    <Text fontSize={{ base: '2xs', md: 'xs' }}>{medication.application_number}</Text>
                    <Text fontSize={{ base: '2xs', md: 'xs' }}>{medication.product_number}</Text>
                    <Text fontSize={{ base: '2xs', md: 'xs' }}>{medication.form}</Text>
                    {getStrength(medication)}
                  </Flex>
                </Flex>
              )
            })}
        </Grid>
      </Skeleton>
    </VStack>
  )
}
