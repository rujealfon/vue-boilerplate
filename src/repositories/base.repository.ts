import axios from '@/services/axios.service'

abstract class BaseRepository<T> {
  constructor(protected resource: string) {}

  get<U>(params?: Record<string, string | number>) {
    return axios.get<U>(`${this.resource}`, { params })
  }

  create(payload: Omit<T, 'id'>) {
    return axios.post<T>(`${this.resource}`, payload)
  }

  read(id: number) {
    return axios.get<T>(`${this.resource}/${id}`)
  }

  update(payload: Partial<Omit<T, 'id'>>) {
    return axios.put<T>(`${this.resource}`, payload)
  }

  remove(id: number) {
    return axios.delete<Promise<void>>(`${this.resource}/${id}`)
  }
}

export default BaseRepository
