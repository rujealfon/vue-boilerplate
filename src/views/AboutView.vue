<template>
  <div id="app">
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error: {{ error.message }}</div>
    <div v-for="user in users" :key="user.id">
      <span>{{ user.name }}</span>
      <button @click="updateUser(user)">Update</button>
      <button @click="deleteUser(user.id)">Delete</button>
    </div>
    <form @submit.prevent="createNewUser">
      <input v-model="newUserName" type="text" placeholder="Enter user name" />
      <button type="submit">Add User</button>
    </form>
    <button @click="fetchUsers">Refresh Users</button>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/models/user.model'

import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user.store.setup'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const { users, loading, error, page } = storeToRefs(userStore)

console.log(page)

const newUserName = ref<string>('')

// onMounted(async () => {
//   await fetchUsers()
// })

const fetchUsers = async () => {
  userStore.$reset()

  await userStore.getUsers()
}

const createNewUser = async () => {
  if (newUserName.value.trim() !== '') {
    await userStore.createUser({ id: Date.now(), name: newUserName.value })
    newUserName.value = ''
  }
}

const updateUser = async (user: User) => {
  const newName = prompt('Enter new name', user.name)
  if (newName !== null) {
    await userStore.updateUser({ ...user, name: newName })
  }
}

const deleteUser = async (userId: number) => {
  if (confirm('Are you sure you want to delete this user?')) {
    await userStore.deleteUser(userId)
  }
}
</script>
