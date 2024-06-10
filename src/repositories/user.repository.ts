import BaseRepository from '@/repositories/base.repository'
import axios from '@/services/axios.service'
import type { User, Users } from '@/models/user.model'

class UserRepository extends BaseRepository<User, Users> {
  constructor() {
    super('/api/users')
  }

  async getAllByEmail(email: string): Promise<User[]> {
    const response = await axios.get<User[]>(`/users?email=${email}`)
    return response.data
  }
}

export default new UserRepository()
