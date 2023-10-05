import { signinService } from './services'
import { useMutation } from '@tanstack/react-query'

export const useLogin = () => {
  return useMutation({
    mutationFn: signinService.login,
    onSuccess: () => {
      console.log('gonna redirect to the list page')
    },
  })
}
