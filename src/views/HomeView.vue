<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'

import { UserApi } from '@/api/user.api'

const lists = ref([])
const selectedId = ref(7)

onMounted(async () => {
  lists.value = await UserApi.get({ page: 2 })
})

const filteredList = computed(() => {
  // console.log(list.value?.data)
  return lists.value.data?.filter((data) => data.id === selectedId.value)
})
</script>

<template>
  <main>
    <select v-model="selectedId">
      <template v-for="list in lists.data" :key="list.id">
        <option :value="list.id">{{ list.id }}</option>
      </template>
    </select>
    <div>
      {{ filteredList }}
    </div>
    <TheWelcome />
  </main>
</template>
