import { defineStore } from 'pinia'
import type { User } from '@/models/user.model'
import api from '@/services/api.service'

type State = {
  users: User[]
  loading: boolean
  error: Error | null
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    users: [],
    loading: false,
    error: null
  }),
  actions: {
    async getUsers(): Promise<void> {
      this.loading = true
      try {
        const response = await this.$axios.get<User[]>('/users')
        this.users = response.data
      } catch (error: any) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async createUser(newUser: User): Promise<void> {
      this.loading = true
      try {
        const response = await this.$axios.post<User>('/users', newUser)
        this.users.push(response.data)
      } catch (error: any) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async updateUser(updatedUser: User): Promise<void> {
      this.loading = true
      try {
        const response = await api.put<User>(`/users/${updatedUser.id}`, updatedUser)
        const index = this.users.findIndex((user) => user.id === updatedUser.id)
        if (index !== -1) {
          this.users.splice(index, 1, response.data)
        }
      } catch (error: any) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async deleteUser(userId: number): Promise<void> {
      this.loading = true
      try {
        await api.delete(`/users/${userId}`)
        this.users = this.users.filter((user) => user.id !== userId)
      } catch (error: any) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
