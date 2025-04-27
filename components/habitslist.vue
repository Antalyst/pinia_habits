<template>
    <div>
        <ul class="space-y-4" v-for="habit in habits" :key="habit.id">
        <li class="bg-white px-3 py-2 rounded-sm">

            <div class="flex items-center justify-between mb-4">
            <p class="text-purple-500 font-bold">
                <span :class="{'line-through':habit.completions.includes(today)}">
                    {{ habit.name }}
                </span>
            </p>
            <button @click="deleteHabtis(habit.id)" class="text-gray-800">Delete</button>
            </div>

            <div class="flex items-center">
            <input 
                type="checkbox" 
                class="mr-2 accent-purple-500"
                @change="toggleCom(habit)"
                :checked="habit.completions.includes(today)"
            />
            <p class="text-sm text-gray-500">I did this today.</p>
            </div>

            <p class="text-sm text-gray-500 mt-2">Current Streak: {{ habit.streak }} days.</p>
        </li>
        </ul>
  </div>
</template>

<script setup>

import { useHabitStore } from '@/stores/habits';
import { format } from 'date-fns';


const habitStore = useHabitStore()
const deleteHabtis = async(id) => {
    await habitStore.deleteHabits(id)
    habitStore.getHabits()
} 

const toggleCom = async(habit) => { 
    await habitStore.toggleCom(habit) 
    
}

const today = format(new Date(), 'yyyy-MM-dd')


const props = defineProps({
    habits:Array 
    // reciece the data as a array from the parent element
})




    
</script>