<template>
    <form @submit.prevent="submit" class="mb-6 flex items-center gap-2">
        <input
        v-model="habit"
        type="text"
        placeholder="Enter a new habit..."
        class="w-full p-3 border border-gray-300 rounded-sm"
        />
        <button
        type="submit"
        class="w-full p-3 bg-purple-500 text-white rounded-sm"
        >
        Add Habit
    </button>
  </form>
</template>

<script setup>
    import { ref } from 'vue'
    import { useHabitStore } from '@/stores/habits'
    const habit = ref('')
    const habitStore = useHabitStore()
    const submit = async ()=>{
        if(habit.value.trim()){
            await habitStore.addHabits(habit.value)
            habit.value = ''
        }
    }
</script>
