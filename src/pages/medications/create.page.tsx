import { Flex, Grid, GridItem, Heading, VStack, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { MedicationsService, useCreateMedication, useManufacturers } from '@/medications'
import { InputControl, SubmitButton } from 'react-hook-form-chakra'

const validationSchema = Yup.object<MedicationsService.CreateMedicationParams>({
  drug_name: Yup.string().required('Drug name is required').max(30),
  units_per_package: Yup.number()
    .required('Units per package is required')
    .moreThan(0, 'Units per package must be greater than 0'),
  issued_on: Yup.string().required('Issued on is required'),
  expires_on: Yup.string().required('Expires on is required'),
  manufacturers: Yup.array().of(
    Yup.object({
      name: Yup.string().required().max(50),
    }),
  ),
})

const defaultValues = {
  drug_name: '',
  units_per_package: 0,
  issued_on: undefined,
  expires_on: undefined,
  manufacturers: undefined,
} satisfies MedicationsService.CreateMedicationParams

export default function CreateMedication() {
  const form = useForm({ resolver: yupResolver(validationSchema), defaultValues, mode: 'onBlur' })
  const manufacturers = useManufacturers()
  const createMedication = useCreateMedication()
  const toast = useToast()

  function dateFormatter(strDate: string) {
    try {
      const date = new Date(strDate)
      return date.toISOString()
    } catch (e) {
      console.log('Error', e)
      toast({
        title: 'Date Formatter',
        description: `Error: ${e.message}`,
      })
    }
  }

  const onSubmit = (data: typeof defaultValues) => {
    const issued_on = dateFormatter(data.issued_on)
    const expires_on = dateFormatter(data.expires_on)

    data.issued_on = issued_on
    data.expires_on = expires_on

    createMedication.mutate(data)
  }

  return (
    <Flex flexDirection="column" gap={4}>
      <Heading as="h1" textAlign="center">
        Create Medication
      </Heading>

      <FormProvider {...form}>
        <VStack as="form" onSubmit={form.handleSubmit(onSubmit)} alignItems="center">
          <Grid maxWidth={{ md: '50%' }} gridTemplateColumns="repeat(2, 1fr)" gap={4}>
            <InputControl name="drug_name" label="Drug name:" />
            <InputControl name="units_per_package" label="Units per package:" inputProps={{ type: 'number' }} />
            <InputControl name="issued_on" label="Issued on:" inputProps={{ type: 'date' }} />
            <InputControl name="expires_on" label="Expires on:" inputProps={{ type: 'date' }} />

            <GridItem colSpan={2}>
              <InputControl name="manufacturers" label="Manufacturers:" />
            </GridItem>

            <GridItem colSpan={2} display="flex" alignItems="center" justifyContent="center">
              <SubmitButton>Create</SubmitButton>
            </GridItem>
          </Grid>
        </VStack>
      </FormProvider>
    </Flex>
  )
}
