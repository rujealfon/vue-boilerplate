import axios from '@/services/axios.service'
import type { Paginate as GetResponse } from '@/models/paginate.model'

type QueryParams = {
  [key in 'page' | 'q' | 'delay']?: string | number
}

const baseApi = <TResource>(endpoint: string) => {
  const get = async (params?: QueryParams): Promise<GetResponse<TResource>> => {
    const response = await axios.get<GetResponse<TResource>>(endpoint, { params })
    return response.data
  }

  const create = async (payload: Omit<TResource, 'id'>): Promise<TResource> => {
    const response = await axios.post<TResource>(endpoint, payload)
    return response.data
  }

  const read = async (id: number): Promise<TResource> => {
    const response = await axios.get<TResource>(`${endpoint}/${id}`)
    return response.data
  }

  const update = async (payload: TResource): Promise<TResource> => {
    const response = await axios.put<TResource>(`${endpoint}/${payload.id}`, payload)
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
