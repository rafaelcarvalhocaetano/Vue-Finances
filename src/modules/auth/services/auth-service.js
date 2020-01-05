import apollo, { onLogin } from '@/plugins/apollo'
import LoginMutation from './../graphql/Login.gql'
import SignUpMutation from './../graphql/SignUp.gql'

const login = async (data) => {
  const response = await apollo.mutate({
    mutation: LoginMutation,
    data
  })
  const { login } = response.data
  await onLogin(apollo, login.token)
  return login
}

const singnup = async (data) => {
  const response = await apollo.mutate({
    mutation: SignUpMutation,
    data
  })
  const { singnup } = response.data
  await onLogin(apollo, singnup.token)
  return singnup
}

export default {
  login,
  singnup
}