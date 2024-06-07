import BaseRepository from '@/repositories/base.repository'
import type { User } from '@/models/user.model'

class UserRepository extends BaseRepository<User> {
  constructor() {
    super('/api/users')
  }
}

export default new UserRepository()
