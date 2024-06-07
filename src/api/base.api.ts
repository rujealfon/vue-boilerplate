import axios from '@/services/axios.service'

// type Api<T> = {
//   getAll: () => Promise<T[]>
//   getById: (id: string) => Promise<T>
//   create: (data: T) => Promise<T>
//   update: (id: string, data: T) => Promise<T>
//   remove: (id: string) => Promise<void>
// }

const baseApi = <T>(endpoint: string) => {
  const get = async <U>(params?: Record<string, string | number>): Promise<U[]> => {
    const response = await axios.get<U[]>(endpoint, { params })
    return response.data
  }

  const create = async (payload: Omit<T, 'id'>): Promise<T> => {
    const response = await axios.post<T>(endpoint, payload)
    return response.data
  }

  const read = async (id: number): Promise<T> => {
    const response = await axios.get<T>(`${endpoint}/${id}`)
    return response.data
  }

  const update = async (id: string, payload: T): Promise<T> => {
    const response = await axios.put<T>(`${endpoint}/${id}`, payload)
    return response.data
  }

  const remove = async (id: number): Promise<void> => {
    await axios.delete(`${endpoint}/${id}`)
  }

  return {
    get,
    create,
    read,
    update,
    remove
  }
}

export default baseApi
