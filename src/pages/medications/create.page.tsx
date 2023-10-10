import { Checkbox, Flex, Grid, GridItem, Heading, Text, VStack, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { InputControl, SubmitButton } from 'react-hook-form-chakra'
import { useCallback, useState } from 'react'
import * as Yup from 'yup'

import { MedicationsService, useCreateMedication, useManufacturers } from '@/medications'

const validationSchema = Yup.object({
  drug_name: Yup.string().required('Drug name is required').max(30),
  units_per_package: Yup.number()
    .required('Units per package is required')
    .moreThan(0, 'Units per package must be greater than 0'),
  issued_on: Yup.string().required('Issued on is required'),
  expires_on: Yup.string().required('Expires on is required'),
  manufacturers: Yup.array().of(Yup.string().max(50)),
}).defined()

const defaultValues: MedicationsService.CreateMedicationParams = {
  drug_name: '',
  units_per_package: 0,
  issued_on: undefined,
  expires_on: undefined,
  manufacturers: [],
}

export default function CreateMedication() {
  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'onBlur',
  })
  const manufacturers = useManufacturers()
  const createMedication = useCreateMedication()
  const toast = useToast()
  const [issuedOnMinValue, setIssuedOnMinValue] = useState<string>(undefined)

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

  const handleIssuedOnChange = useCallback(({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    const splitted = value.split('-')
    const addOneDay = (Number(splitted[2]) + 1).toString()
    const nextDay = `${splitted[0]}-${splitted[1]}-${addOneDay}`
    setIssuedOnMinValue(nextDay)
  }, [])

  const onSubmit = (data: typeof defaultValues) => {
    const issued_on = dateFormatter(data.issued_on)
    const expires_on = dateFormatter(data.expires_on)

    data.issued_on = issued_on
    data.expires_on = expires_on

    if (data.manufacturers.length === 0) {
      delete data.manufacturers
    }

    createMedication.mutate(data)
  }

  return (
    <Flex flexDirection="column" justifyContent="center" gap={4} minHeight="calc(100vh - 130px)">
      <Heading as="h1" textAlign="center">
        Create Medication
      </Heading>

      <FormProvider {...form}>
        <VStack as="form" onSubmit={form.handleSubmit(onSubmit)} alignItems="center">
          <Grid maxWidth={{ md: '50%' }} gridTemplateColumns="repeat(2, 1fr)" gap={4}>
            <InputControl name="drug_name" label="Drug name:" />
            <InputControl name="units_per_package" label="Units per package:" inputProps={{ type: 'number' }} />
            <InputControl
              name="issued_on"
              label="Issued on:"
              inputProps={{
                type: 'date',
                ...form.register('issued_on', {
                  onChange: handleIssuedOnChange,
                }),
              }}
            />
            <InputControl name="expires_on" label="Expires on:" inputProps={{ type: 'date', min: issuedOnMinValue }} />

            {manufacturers.isSuccess && manufacturers.data?.data.length > 0 && (
              <>
                {manufacturers.data.data.map((manufacturer) => (
                  <Checkbox
                    maxWidth="30%"
                    alignSelf="center"
                    minW="100%"
                    key={manufacturer.name}
                    value={manufacturer.name}
                    {...form.register('manufacturers')}
                  >
                    {manufacturer.name}
                  </Checkbox>
                ))}
              </>
            )}

            {!manufacturers.isLoading && manufacturers.data?.data && manufacturers.data.data.length === 0 && (
              <Text>No manufacturer available</Text>
            )}

            <GridItem colSpan={2} display="flex" alignItems="center" justifyContent="center">
              <SubmitButton>Create</SubmitButton>
            </GridItem>
          </Grid>
        </VStack>
      </FormProvider>
    </Flex>
  )
}

CreateMedication.title = 'Create Medication'
CreateMedication.content = 'Create a new medication'
