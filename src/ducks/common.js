//@ts-check
import { Map, List } from "immutable";

// Constants
const HABIT_ADD = "habits/HABIT_ADD";
const HABIT_EDIT = "habits/HABIT_EDIT";
const HABIT_REMOVE = "habits/HABIT_REMOVE";

// Initial state
const initialState = Map({
    habits: List([{
        id: 0,
        name: "Test habit",
        period: 1509792730516, // date time when habit should end
    }]),
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
