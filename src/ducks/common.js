//@ts-check
import { Map, List } from "immutable";

// Constants
const HABIT_ADD = "habits/HABIT_ADD";
const HABIT_EDIT = "habits/HABIT_EDIT";
const HABIT_REMOVE = "habits/HABIT_REMOVE";

// Selectors
export const selectHabits = (state) => state.get("habits");
export const selectTodayDone = (state) => state.getIn(["statistics", "todayDone"]);
export const selectTodayGoal = (state) => state.getIn(["statistics", "todayGoal"]);
export const selectTotalDone = (state) => state.getIn(["statistics", "totalDone"]);
export const selectTotal = (state) => state.getIn(["statistics", "total"]);


// Initial state
const initialState = Map({
    statistics: Map({
        todayDone: 2,
        todayGoal: 5,
        totalDone: 50,
        total: 79,
    }),
    habits: List([
        {
            id: 0,
            name: "Eat Kashka",
            period: 1509792730516, // date time when habit should end
            done: false,
        },
        {
            id: 1,
            name: "Brush teeth with left hand",
            period: 1509792730516, // date time when habit should end
            done: false,
        },
        {
            id: 2,
            name: "Make the bed",
            period: 1509792730516, // date time when habit should end
            done: true,
        }
    ]),
});


// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case HABIT_ADD: {
            return state;
        }
        case HABIT_EDIT: {
            return state;
        }
        case HABIT_REMOVE: {
            return state;
        }
        default:
            return state;
    }
}
