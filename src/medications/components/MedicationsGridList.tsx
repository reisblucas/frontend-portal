import { Flex, Grid, Text } from '@chakra-ui/react'
import { Medication, MedicationsList } from '../contracts'
import { useCallback } from 'react'

export function MedicationsGridList({ medications }: MedicationsGridList.Props) {
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
    <Grid
      gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: '50% 50%', lg: 'repeat(3, 1fr)' }}
      gridAutoFlow="dense"
      gap={8}
      rowGap={10}
    >
      {medications.data.map((medication) => {
        return (
          <Flex key={medication.application_number + medication.product_number} flexDirection="column" padding={2}>
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
  )
}

export namespace MedicationsGridList {
  export interface Props {
    medications: MedicationsList
  }
}
