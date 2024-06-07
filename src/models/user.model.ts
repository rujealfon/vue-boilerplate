import type { Paginate } from '@/models/paginate.model'

export interface Users extends Paginate {
  data: User[]
}

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}
