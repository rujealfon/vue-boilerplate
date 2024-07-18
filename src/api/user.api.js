import axios from '@/services/axios.service'
import BaseAPi from '@/api/base.api'

const baseUserApi = BaseAPi('/api/user')

const getAllByEmail = async (email) => {
  const response = await axios.get(`/users?email=${email}`)
  return response.data
}

export const UserApi = {
  ...baseUserApi,
  getAllByEmail
}
