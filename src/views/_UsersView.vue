<script setup lang="ts">
import { useOffsetPagination } from '@vueuse/core'
import type { User } from '@/models/user.model'

import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const { users, error, total, per_page, page } = storeToRefs(userStore)

const newUserName = ref<string>('')

// const page = ref(1)
///const pageSize = ref(10)

// fetchData({
//   currentPage: page.value,
//   currentPageSize: pageSize.value
// })

// function fetchData({
//   currentPage,
//   currentPageSize
// }: {
//   currentPage: number
//   currentPageSize: number
// }) {
//   fetch(currentPage, currentPageSize).then((responseData) => {
//     users.value = responseData
//   })
// }

onMounted(async () => {
  await fetchUsers()
})

const fetchUsers = async () => {
  // userStore.$reset()

  await userStore.getUsers({ page: page.value })
}

const { currentPage, currentPageSize, pageCount, isFirstPage, isLastPage, prev, next } =
  useOffsetPagination({
    total,
    page,
    pageSize: per_page,
    onPageChange: fetchUsers,
    onPageSizeChange: fetchUsers
  })

const createNewUser = async () => {
  if (newUserName.value.trim() !== '') {
    await userStore.createUser({
      first_name: newUserName.value,
      email: '',
      last_name: '',
      avatar: ''
    })
    newUserName.value = ''
  }
}

const updateUser = async (user: User) => {
  const newName = prompt('Enter new name', user.first_name)
  if (newName !== null) {
    await userStore.updateUser({ ...user, first_name: newName })
  }
}

const deleteUser = async (userId: number) => {
  if (confirm('Are you sure you want to delete this user?')) {
    await userStore.deleteUser(userId)
  }
}
</script>

<template>
  <div id="app">
    <div v-if="error">Error: {{ error.message }}</div>
    <div v-for="user in users" :key="user.id">
      <span>{{ user.first_name }}</span>
      <button @click="updateUser(user)">Update</button>
      <button @click="deleteUser(user.id)">Delete</button>
    </div>
    <form @submit.prevent="createNewUser">
      <input v-model="newUserName" type="text" placeholder="Enter user name" />
      <button type="submit">Add User</button>
    </form>
    <button @click="fetchUsers">Refresh Users</button>

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
    </div>

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
