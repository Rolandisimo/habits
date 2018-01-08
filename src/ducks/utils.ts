import { List } from 'immutable';
import { HabitItemProps } from '../components/habit/types';

export function getDoneHabits(habits: List<HabitItemProps>) {
    return habits.filter(habit => {
        if (habit && habit.done) {
            return true;
        }
        return false;
    });
}
