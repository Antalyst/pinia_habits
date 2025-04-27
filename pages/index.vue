<template>
   <div class="mx-auto p-6 max-w-2xl">
        <h1 class="text-4xl font-bold text-center mb-8">Habit Tracker</h1>
        <habitsform  />
        <habitslist :habits="habitStore.habits"/>
  </div>
</template>

<script setup>
import { useHabitStore } from '@/stores/habits'

import habitsform from '@/components/habitsform.vue'
import habitslist from '@/components/habitslist.vue'

const habitStore = useHabitStore()
habitStore.getHabits()



</script>

