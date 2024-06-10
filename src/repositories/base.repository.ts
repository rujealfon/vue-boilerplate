import axios from '@/services/axios.service'

abstract class BaseRepository<T extends { id: number }, U> {
  protected readonly resource: string

  constructor(resource: string) {
    this.resource = resource
  }

  async search(params?: {
    delay?: number
    filter?: string
    page?: number
    q?: string
    sort?: string
  }): Promise<U> {
    const { data } = await axios.get<U>(this.resource, { params })
    return data
  }

  async create(payload: Omit<T, 'id'>): Promise<T> {
    const { data } = await axios.post<T>(this.resource, payload)
    return data
  }

  async read(id: number): Promise<T> {
    const { data } = await axios.get<T>(`${this.resource}/${id}`)
    return data
  }

  async update(payload: T): Promise<T> {
    const { data } = await axios.put<T>(`${this.resource}/${payload.id}`, payload)
    return data
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${this.resource}/${id}`)
  }
}

export default BaseRepository
