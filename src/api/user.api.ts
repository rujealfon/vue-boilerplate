import axios from '@/services/axios.service'
import BaseAPi from '@/api/base.api'
import type { User } from '@/models/user.model'

const baseUserApi = BaseAPi<User>('/api/user')

const getAllByEmail = async (email: string): Promise<User[]> => {
  const response = await axios.get<User[]>(`/users?email=${email}`)
  return response.data
}

const UserApi = {
  ...baseUserApi,
  getAllByEmail
}

export default UserApi
