import { List } from "immutable";
import { Navigation } from "../types/General";
import { HabitItemProps } from "../components/habit/types";
import { Thunk } from "../types/types";

// Constants
const HABITS_INIT = "habits/HABITS_INIT";
const HABIT_ADD = "habits/HABIT_ADD";
const HABIT_EDIT = "habits/HABIT_EDIT";
const HABIT_DELETE = "habits/HABIT_REMOVE";
const ADD_NAVIGATION = "navigation/ADD_NAVIGATION";
const SET_STATISTICS = "navigation/SET_STATISTICS";

// Selectors
export const selectHabits = (state: any): List<HabitItemProps> => state.habits;
export const selectDone = (state: any): number => state.statistics.done;
export const selectTotal = (state: any): number => state.statistics.total;
export const selectNavigation = (state: any) => state.navigation as Navigation;

// Actions/Action Creators
export interface AddHabitAction {
    type: typeof HABIT_ADD;
    payload: HabitItemProps;
}
export function addHabitAction(habit: HabitItemProps): AddHabitAction {
    return {
        type: HABIT_ADD,
        payload: habit,
    }
};
export function addHabitActionCreator(habit: HabitItemProps): Thunk {
    return (dispatch, getState) => {
        dispatch(addHabitAction(habit));

        const state = getState();
        dispatch(setStatisticsAction({
            done: selectDone(state),
            total: selectHabits(state).size,
        }));
    };
}

export interface InitHabitsAction {
    type: typeof HABITS_INIT;
    payload: HabitItemProps[],
}
export function initHabitsAction(habits: HabitItemProps[]): InitHabitsAction {
    return {
        type: HABITS_INIT,
        payload: habits,
    }
};
export function initHabitActionCreator(habits: HabitItemProps[]): Thunk {
    return (dispatch) => {
        dispatch(initHabitsAction(habits));
    };
}

export interface EditHabitAction {
    type: typeof HABIT_EDIT;
    payload: HabitItemProps;
}
export function editHabitAction(habit: HabitItemProps): EditHabitAction {
    return {
        type: HABIT_EDIT,
        payload: habit,
    }
};
export function editHabitActionCreator(habit: HabitItemProps): Thunk {
    return (dispatch, getState) => {
        dispatch(editHabitAction(habit));

        // TODO: Move mutation to middleware
        if (habit.done) {
            const state = getState();
            const doneHabits = selectHabits(state)
                .filter(habit => {
                    if (habit && habit.done) {
                        return true;
                    }
                    return false;
                });
            dispatch(setStatisticsAction({
                done: doneHabits.size,
                total: selectTotal(state),
            }));
        }
    };
}

export interface DeleteHabitAction {
    type: typeof HABIT_DELETE;
    payload: number;
}
export function deleteHabitAction(id: number): DeleteHabitAction {
    return {
        type: HABIT_DELETE,
        payload: id,
    }
};
export function deleteHabitActionCreator(id: number): Thunk {
    return (dispatch, getState) => {
        dispatch(deleteHabitAction(id));

        const state = getState();
        dispatch(setStatisticsAction({
            done: selectDone(state),
            total: selectHabits(state).size,
        }));
    };
}

export interface SetNavigationAction {
    type: typeof ADD_NAVIGATION;
    payload: Navigation;
}
export function setNavigationAction(navigation: Navigation): SetNavigationAction {
    return {
        type: ADD_NAVIGATION,
        payload: navigation,
    }
};
export const setNavigationActionCreator = (navigation: Navigation): Thunk => {
    return (dispatch) => {
        dispatch(setNavigationAction(navigation));
    };
}

export interface SetStatisticsAction {
    type: typeof SET_STATISTICS;
    payload: Statistics;
}
export function setStatisticsAction(statistics: Statistics): SetStatisticsAction {
    return {
        type: SET_STATISTICS,
        payload: statistics,
    }
};
export const setStatisticsActionCreator = (statistics: Statistics): Thunk => {
    return (dispatch) => {
        dispatch(setStatisticsAction(statistics));
    };
}

export interface Statistics {
    done: number;
    total: number;
}
export interface State {
    statistics: Statistics;
    habits: List<HabitItemProps>;
    navigation?: Navigation;
}

// Initial state
const initialState = {
    statistics: {},
    habits: List<HabitItemProps>(),
    navigation: {},
} as State;

export type ReducerActions =
    | InitHabitsAction
    | AddHabitAction
    | EditHabitAction
    | DeleteHabitAction
    | SetNavigationAction
    | SetStatisticsAction
;

// Reducer
export function reducer(state = initialState, action: ReducerActions) {
    switch (action.type) {
        case HABITS_INIT: {
            return {
                ...state,
                habits: List(action.payload),
            }
        }
        case HABIT_ADD: {
            return {
                ...state,
                habits: List([action.payload, ...state.habits.toArray()]),
            };
        }
        case HABIT_EDIT: {
            // TODO: Fix typings
            const newHabits = state.habits
                .map((habit: any) => {
                    if (habit.id === action.payload.id) {
                        return action.payload;
                    }
                    return habit;
                });

            return { ...state, habits: newHabits };
        }
        case HABIT_DELETE:
            const habits = state.habits.filter(habit => {
                if (habit) {
                    return habit.id !== action.payload
                }
                return false;
            })
            
            return { ...state, habits };
        case ADD_NAVIGATION: {
            return { ...state, navigation: action.payload };
        }
        case SET_STATISTICS: {
            return {
                ...state,
                statistics: action.payload,
            }
        }
        default:
            return state;
    }
}
