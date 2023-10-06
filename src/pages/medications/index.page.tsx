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
        <Grid gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gridAutoFlow="dense" gap={4}>
          {medications.isSuccess &&
            medications.data.data.map((medication) => {
              return (
                <Flex
                  key={medication.application_number + medication.product_number}
                  flexDirection="column"
                  padding={2}
                >
                  <Text fontSize={{ base: 'xs', md: 'md' }} textAlign="center" fontWeight="bold">{`${
                    medication.drug_name
                  } ${formatStrength(medication.strength).strength}`}</Text>

                  <Grid gridTemplateColumns="100px 1fr">
                    <Flex
                      flexDirection="column"
                      gap={2}
                      sx={{
                        p: {
                          fontWeight: '600',
                        },
                      }}
                    >
                      <Text variant="grid">Active ing.:</Text>
                      <Text variant="grid">App num.:</Text>
                      <Text variant="grid">Product num.:</Text>
                      <Text variant="grid">Form:</Text>
                      <Text variant="grid">Strength:</Text>
                    </Flex>

                    <Flex gap={2} flexDirection="column">
                      <Text variant="grid">{medication.active_ingredient}</Text>
                      <Text variant="grid">{medication.application_number}</Text>
                      <Text variant="grid">{medication.product_number}</Text>
                      <Text variant="grid">{medication.form}</Text>
                      {getStrength(medication)}
                    </Flex>
                  </Grid>
                </Flex>
              )
            })}
        </Grid>
      </Skeleton>
    </VStack>
  )
}
