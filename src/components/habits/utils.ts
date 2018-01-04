import { List } from "immutable"
import { HabitItemProps } from '../habit/types';
import { Filter } from '../filter-bar/types';

export function getFilteredHabits(habits: List<HabitItemProps>, filter: Filter) {
    switch (filter) {
        case Filter.Done: {
            return habits.filter(habit => {
                if (habit) {
                    return habit.done;
                }

                return false;
            }) as List<HabitItemProps>;
        }
        case Filter.NotDone: {
            return habits.filter(habit => {
                if (habit) {
                    return !habit.done;
                }

                return false;
            }) as List<HabitItemProps>;
        }
        default:
        return habits;
    }
}
