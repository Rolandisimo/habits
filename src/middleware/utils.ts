import { HabitItemProps } from "../components/habit/types";

export function getDoneHabits(habits: HabitItemProps[]) {
    return habits.filter(habit => {
        if (habit) {
            return habit.done;
        }
        return false;
    });
}
export function sortHabits(habits: HabitItemProps[], ascending = false) {
    if (ascending) {
        return habits.sort((a, b) => {
            return a.createdAt - b.createdAt;
        })
    }

    // Descending by default
    return habits.sort((a, b) => {
        return b.createdAt - a.createdAt;
    })
}
