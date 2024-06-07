import axios from '@/services/axios.service'
import baseAPi from '@/api/base.api'
import type { User } from '@/models/user.model'

const baseUserApi = baseAPi<User>('/api/users')

const getAllByEmail = async (email: string): Promise<User[]> => {
  const response = await axios.get<User[]>(`/users?email=${email}`)
  return response.data
}

const userApi = {
  ...baseUserApi,
  getAllByEmail
}

export default userApi
