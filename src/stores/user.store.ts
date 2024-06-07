import axios from '@/services/axios.service'
import type { User, Users } from '@/models/user.model'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { useLoading } from '@/composables/loading'

const loading = useLoading()

export const useUserStore = defineStore('user', {
  persist: true,

  state: () => ({
    users: [] as User[],
    user: {} as User,
    page: 0 as number,
    per_page: 0 as number,
    total: 0 as number,
    total_pages: 0 as number,
    error: null as AxiosError | null
  }),

  getters: {},

  actions: {
    async getUsers(params?: Record<string, string | number>): Promise<Users> {
      const loader = loading.show()
      try {
        const { data } = await axios.get<Users>('/api/users', { params })
        this.users = data.data
        this.page = data.page
        this.per_page = data.per_page
        this.total = data.total
        this.total_pages = data.total_pages

        return data
      } catch (err) {
        if (err instanceof AxiosError) {
          this.error = err
          throw err
        }

        throw err
      } finally {
        loader.hide()
      }
    },

    async createUser(payload: Omit<User, 'id'>): Promise<User> {
      const loader = loading.show()
      try {
        const { data } = await axios.post<User>('/api/users', payload)
        this.users.push(data)

        return data
      } catch (err) {
        if (err instanceof AxiosError) {
          this.error = err
          throw err
        }

        throw err
      } finally {
        loader.hide()
      }
    },

    async updateUser(payload: User): Promise<User> {
      const loader = loading.show()
      try {
        const { data } = await axios.put<User>(`/api/users/${payload.id}`, payload)
        const index = this.users.findIndex((user) => user.id === payload.id)
        if (index !== -1) {
          this.users.splice(index, 1, data)
        }

        return data
      } catch (err) {
        if (err instanceof AxiosError) {
          this.error = err
          throw err
        }

        throw err
      } finally {
        loader.hide()
      }
    },

    async deleteUser(userId: number): Promise<void> {
      const loader = loading.show()
      try {
        await axios.delete(`/api/users/${userId}`)
        this.users = this.users.filter((user) => user.id !== userId)
      } catch (err) {
        if (err instanceof AxiosError) {
          this.error = err
          throw err
        }

        throw err
      } finally {
        loader.hide()
      }
    }
  }
})
