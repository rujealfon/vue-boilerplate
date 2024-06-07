import axios from '@/services/axios.service'
import type { Users, User } from '@/models/user.model'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLoading } from 'vue-loading-overlay'

const loading = useLoading()

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  // const loading = ref(false)
  const error = ref<AxiosError>()
  const page = ref<number>(0)
  const per_page = ref<number>(0)
  const total = ref<number>(0)
  const total_pages = ref<number>(0)

  // const getUSerTotal = computed(() => users.value.length)

  function $reset() {
    users.value = []
    // loading.value = false
    error.value = undefined
  }

  async function getUsers(params?: Record<string, string | number>): Promise<void> {
    const loader = loading.show()
    try {
      const { data } = await axios.get<Users>('/api/users', { params })

      users.value = data.data

      page.value = data.page
      per_page.value = data.per_page
      total.value = data.total
      total_pages.value = data.total_pages
    } catch (err) {
      if (err instanceof AxiosError) {
        error.value = err
      }
    } finally {
      loader.hide()
    }
  }

  async function createUser(payload: Omit<User, 'id'>): Promise<User | undefined> {
    const loader = loading.show()
    try {
      const { data } = await axios.post<User>('/api/users', payload)
      users.value.push(data)

      return data
    } catch (err) {
      if (err instanceof AxiosError) {
        error.value = err
      }
    } finally {
      loader.hide()
    }
  }

  async function updateUser(payload: User): Promise<void> {
    const loader = loading.show()
    try {
      const { data } = await axios.put<User>(`/api/users/${payload.id}`, payload)
      const index = users.value.findIndex((user) => user.id === payload.id)
      if (index !== -1) {
        users.value.splice(index, 1, data)
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        error.value = err
      }
    } finally {
      loader.hide()
    }
  }

  async function deleteUser(userId: number): Promise<void> {
    const loader = loading.show()
    try {
      await axios.delete(`/api/users/${userId}`)
      users.value = users.value.filter((user) => user.id !== userId)
    } catch (err) {
      if (err instanceof AxiosError) {
        error.value = err
      }
    } finally {
      loader.hide()
    }
  }

  return {
    $reset,
    users,
    loading,
    error,
    page,
    per_page,
    total,
    total_pages,
    getUsers,
    createUser,
    updateUser,
    deleteUser
    // getUSerTotal
  }
})
