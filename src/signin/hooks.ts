import { useRouter } from 'next/router'
import { signinService } from './services'
import { useMutation } from '@tanstack/react-query'

export const useLogin = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: signinService.login,
    onSuccess: () => {
      router.push('/medications')
    },
  })
}
