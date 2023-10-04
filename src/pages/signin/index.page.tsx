import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputControl, SubmitButton } from 'react-hook-form-chakra'

const defaultValues = {
  username: '',
  password: '',
}

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required').max(15, 'Username must be less than 15 characters'),
  password: Yup.string().required('Password is required').max(15, 'Password must be less than 15 characters'),
})

const inputProjectDefault = {
  borderTop: 0,
  borderX: 0,
  borderBottomRadius: 0,
  focusBorderColor: 'transparent',
  _focus: { borderBottom: '1px solid', borderColor: 'green.500' },
}

export default function Login() {
  const form = useForm({ resolver: yupResolver(validationSchema), defaultValues, mode: 'onBlur' })
  const onSubmit = (data: typeof defaultValues) => console.log(data)

  return (
    <Flex justifyContent="center" align="center" height="100vh">
      <Box width="50%">
        <Flex width="50%" flexDir="column" m="0 auto" gap={4} minHeight="300px">
          <Box>
            <Heading as="h1">Pharmacy Portal</Heading>
            <Text color="blackAlpha.500">Login to access internal resources</Text>
          </Box>

          <FormProvider {...form}>
            <VStack as="form" onSubmit={form.handleSubmit(onSubmit)} alignItems="start" gap={4} maxWidth="275px">
              <InputControl name="username" label="Username" width="full" {...inputProjectDefault} />

              <InputControl
                name="password"
                label="Password"
                inputProps={{ type: 'password' }}
                style={{ ...inputProjectDefault }}
              />

              <SubmitButton alignSelf="center">Sign in</SubmitButton>
            </VStack>
          </FormProvider>
        </Flex>
      </Box>

      <Flex width="50%">
        <Heading as="h1">Make login on Pharmacy Content</Heading>
      </Flex>
    </Flex>
  )
}
