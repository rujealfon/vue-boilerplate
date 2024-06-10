<script setup lang="ts">
import type { User, Users } from '@/models/user.model'
import UserRepository from '@/repositories/user.repository'
import { computed, ref } from 'vue'
import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query'

const queryClient = useQueryClient()

// Search
const { data, error, refetch, isPending, isLoading, isRefetching } = useQuery<Users>({
  queryKey: ['users'],
  queryFn: () => UserRepository.search()
})

const users = computed(() => data.value?.data)
const page = computed(() => data.value?.page)

// Create
const newUserName = ref<string>('')

const createMutation = useMutation<User, Error, Omit<User, 'id'>, unknown>({
  mutationFn: (payload: Omit<User, 'id'>): Promise<User> => {
    return UserRepository.create(payload)
  },
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['users'] })
  }
})

async function createNewUser(): Promise<void> {
  if (newUserName.value.trim() !== '') {
    await createMutation.mutateAsync({
      name: newUserName.value,
      year: 200,
      color: 'l',
      pantone_value: 'q'
    })
    newUserName.value = ''
  }
}

// Update
const updateMutation = useMutation<User, Error, User, unknown>({
  mutationFn: (payload: User): Promise<User> => {
    return UserRepository.update(payload)
  },
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['users'] })
  }
})

async function updateUser(user: User): Promise<void> {
  const newName = prompt('Enter new name', user.name)

  if (newName !== null) {
    await updateMutation.mutateAsync({
      ...user,
      name: newName
    })
  }
}

// Remove
const removeMutation = useMutation<void, Error, number, unknown>({
  mutationFn: (userId: number): Promise<void> => {
    return UserRepository.delete(userId)
  },
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['users'] })
  }
})

async function deleteUser(userId: number): Promise<void> {
  if (confirm('Are you sure you want to delete this user?')) {
    removeMutation.mutateAsync(userId)
  }
}
</script>

<template>
  <div id="app">
    <div v-if="error">Error: {{ error.message }}</div>
    <div v-if="isRefetching">isRefetching...</div>
    <div v-if="isPending">isPending...</div>
    <div v-if="isLoading">isLoading...</div>
    <div v-for="user in users" :key="user.id">
      <span>{{ user.name }}</span>
      <button @click="updateUser(user)">Update</button>
      <button @click="deleteUser(user.id)">Delete</button>
    </div>
    <form @submit.prevent="createNewUser">
      <input v-model="newUserName" type="text" placeholder="Enter user name" />
      <button type="submit">Add User</button>
    </form>
    <button @click="refetch()">Refresh Users</button>
    <!--
    <div class="my-4">
      <button :disabled="isFirstPage" @click="prev">prev</button>
      <button
        v-for="item in pageCount"
        :key="item"
        :disabled="currentPage === item"
        @click="currentPage = item"
      >
        {{ item }}
      </button>
      <button :disabled="isLastPage" @click="next">next</button>
    </div> -->

    <!-- <UseOffsetPagination
      v-slot="{ currentPage, currentPageSize, next, prev, pageCount, isFirstPage, isLastPage }"
      :total="total"
      @page-change="fetchUsers"
      @page-size-change="fetchUsers"
    >
      <div class="gap-x-4 gap-y-2 grid-cols-2 inline-grid items-center">
        <div opacity="50">total:</div>
        <div>{{ total }}</div>
        <div opacity="50">pageCount:</div>
        <div>{{ pageCount }}</div>
        <div opacity="50">currentPageSize:</div>
        <div>{{ currentPageSize }}</div>
        <div opacity="50">currentPage:</div>
        <div>{{ currentPage }}</div>
        <div opacity="50">isFirstPage:</div>
        <div>{{ isFirstPage }}</div>
        <div opacity="50">isLastPage:</div>
        <div>{{ isLastPage }}</div>
      </div>
      <div>
        <button :disabled="isFirstPage" @click="prev">prev</button>
        <button :disabled="isLastPage" @click="next">next</button>
      </div>
    </UseOffsetPagination> -->
  </div>
</template>
