import apollo from '@/plugins/apollo'
import LoginMutation from './../graphql/Login.gql'

const login = async (data) => {
  const response = await apollo.mutate({
    mutation: LoginMutation,
    data
  })
  return response.data.login
}

export default {
  login
}