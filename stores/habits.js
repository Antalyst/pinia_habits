import {getDocs, addDoc,collection,doc, deleteDoc, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import {format, differenceInDays} from "date-fns";

export const useHabitStore = defineStore("habitStore",{
    state: () => ({
        habits: [],
    }),
    actions: {
        // all habits

        async getHabits(){
            const {$db} = useNuxtApp()
            const snapshot = await getDocs(collection($db, 'habits'))
            this.habits =snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data()
            }))
        },



        //add habits
        async addHabits(name){
            const {$db} = useNuxtApp()

            const habit = {
                name: name,
                completions:[] ,
                streak:0            
            }

            const addRef = await addDoc(collection($db, 'habits'),habit)
            
            this.habits.push({
                id:addRef.id,
                ...habit
            })
        },
        //delete habits
        async deleteHabits(id){
            const {$db} = useNuxtApp()

            const docRef = doc($db, 'habits',id)
            await deleteDoc(docRef)

            //filter the habits that match on the array but not on the selected array there for i can remove it onto array
            this.habits = this.habits.filter((habit) => habit.id !== id)
        },
        //update habits

        async updateHabits(id, updates){
            const {$db} = useNuxtApp()

            const docRef = doc($db, 'habits',id)
            await updateDoc(docRef, updates)
            const index = this.habits.findIndedx((habit)=> habit.id === id)
            if(index !== -1){
                this.habits[index] = {
                    ...this.habits[index],
                    ...updates
                }
            }
        },
        //complitions habits

        toggleCom(habit) {
            const today = format(new Date(), 'yyyy-MM-dd')
            if(habit.completions.includes(today)){
                habit.completions = habit.completions.filter((date) => date !== today)
            } else {
                habit.completions.push(today)
            }

            habit.streak = this.calculateStreak(habit.completions)

            this.updateHabits(habit.id, {
                completions: habit.completions,
                streak: habit.streak
            })
        },
        //calculate habits

        calculateStreak(complitions) {
            const sorteDates = complitions.map((date) => new Date(date)).sort((a, b) => b - a)
            let streak = 0
            let currentDate = new Date()
            
            for (const date of sorteDates) {
                const diff = differenceInDays(currentDate, date)

                if(diff > 1){
                    break
                }
                streak+=1
                currentDate = new Date(date)
            }
            return streak
        }
    }
})