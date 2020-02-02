import apollo, { onLogin } from '@/plugins/apollo'
import LoginMutation from './../graphql/Login.gql'
import SignUpMutation from './../graphql/SignUp.gql'

const login = async (variables) => {
  const response = await apollo.mutate({
    mutation: LoginMutation,
    variables
  })
  const { login } = response.data
  await onLogin(apollo, login.token)
  return login
}

const singnup = async (variables) => {
  const response = await apollo.mutation({
    mutation: SignUpMutation,
    variables
  })
  const { singnup } = response.data
  await onLogin(apollo, singnup.token)
  return singnup
}

export default {
  login,
  singnup
}