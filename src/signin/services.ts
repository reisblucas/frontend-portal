import { client } from '@/infra/axios'

import { UserInfoLogin } from './contracts'

class SigninService {
  async login(userLogin: UserInfoLogin) {
    return client.post('/login', userLogin)
  }
}

export const signinService = new SigninService()
