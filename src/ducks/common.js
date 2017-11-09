import { Map, List } from "immutable";

// Constants
const HABIT_ADD = "habits/HABIT_ADD";
const HABIT_EDIT = "habits/HABIT_EDIT";
const HABIT_REMOVE = "habits/HABIT_REMOVE";
const ADD_NAVIGATION = "navigation/ADD_NAVIGATION";

// Selectors
export const selectHabits = (state) => state.get("habits");
export const selectTodayDone = (state) => state.getIn(["statistics", "todayDone"]);
export const selectTodayGoal = (state) => state.getIn(["statistics", "todayGoal"]);
export const selectTotalDone = (state) => state.getIn(["statistics", "totalDone"]);
export const selectTotal = (state) => state.getIn(["statistics", "total"]);
export const selectNavigation = (state) => state.get("navigation");

// Action Creator
export const editHabitAction = (habit) => ({
    type: HABIT_EDIT,
    payload: habit,
});
export const editHabitActionCreator = (habit) => {
    return (dispatch) => {
        dispatch(editHabitAction(habit));
    };
}

export const setNavigationAction = (navigation) => ({
    type: ADD_NAVIGATION,
    payload: navigation,
});
export const setNavigationActionCreator = (navigation) => {
    return (dispatch) => {
        dispatch(setNavigationAction(navigation));
    };
}


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
            id: 1,
            name: "Eat Kashka",
            period: 1814000000,
            notificationTime: "08:00",
            done: false,
        },
        {
            id: 2,
            name: "Brush teeth with left hand",
            period: 2629746000,
            notificationTime: "23:00",
            done: false,
        },
        {
            id: 3,
            name: "Make the bed",
            period: 7889238000,
            notificationTime: "10:00",
            done: true,
        }
    ]),
    navigation: undefined,
});

// Reducer
export function reducer(state = initialState, action) {
    switch (action.type) {
        case HABIT_ADD: {
            return state.set(
                "habits",
                List([state.get("habits"), action.payload]),
            );
        }
        case HABIT_EDIT: {
            const newHabits = state.get("habits")
                .map(habit => {
                    if (habit.id === action.payload.id) {
                        return action.payload;
                    }
                    return habit;
                });

            return state.set("habits", newHabits);
        }
        case HABIT_REMOVE: {
            return state;
        }
        case ADD_NAVIGATION: {
            return state.set("navigation", action.payload);
        }
        default:
            return state;
    }
}
