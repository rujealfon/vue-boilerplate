import type { Paginate } from '@/models/paginate.model'

export interface Users extends Paginate<User> {
  data: User[]
}

export interface User {
  id: number
  name: string
  year: number
  color: string
  pantone_value: string
}
