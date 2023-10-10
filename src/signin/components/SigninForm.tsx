import { VStack, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { InputControl, SubmitButton } from 'react-hook-form-chakra'
import * as Yup from 'yup'
import { signIn } from 'next-auth/react'

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
  const toast = useToast()
  const onSubmit = async (data: typeof defaultValues) => {
    const response = await signIn('credentials', { ...data, callbackUrl: '/signin', redirect: false })

    if (!response.ok) {
      toast({
        title: 'Username or password incorrect',
        colorScheme: 'red',
      })
    }
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

        <SubmitButton alignSelf="center" colorScheme="green">
          Sign in
        </SubmitButton>
      </VStack>
    </FormProvider>
  )
}
