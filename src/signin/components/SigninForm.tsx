import { VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { InputControl, SubmitButton } from 'react-hook-form-chakra'
import * as Yup from 'yup'

import { useLogin } from '../hooks'

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

export default function SigninForm() {
  const form = useForm({ resolver: yupResolver(validationSchema), defaultValues, mode: 'onBlur' })
  const login = useLogin()
  const onSubmit = async (data: typeof defaultValues) => {
    login.mutate(data)
  }

  return (
    <FormProvider {...form}>
      <VStack as="form" onSubmit={form.handleSubmit(onSubmit)} alignItems="start" gap={4} maxWidth="275px">
        <InputControl
          name="username"
          label="Username"
          width="full"
          inputProps={{ type: 'text', placeholder: 'Turing' }}
          {...inputProjectDefault}
          placeholder="yourUsername"
        />

        <InputControl
          name="password"
          label="Password"
          inputProps={{ type: 'password', placeholder: '*****' }}
          style={{ ...inputProjectDefault }}
        />

        <SubmitButton alignSelf="center">Sign in</SubmitButton>
      </VStack>
    </FormProvider>
  )
}
