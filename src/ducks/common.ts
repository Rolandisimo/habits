import { Map, List } from "immutable";
import { Dispatch } from 'redux';
import { Navigation } from "../types/General";
import { HabitItemProps } from "../components/habit/types";
import { HabitModel } from "../models/HabitModel";

// Constants
const HABITS_INIT = "habits/HABITS_INIT";
const HABIT_ADD = "habits/HABIT_ADD";
const HABIT_EDIT = "habits/HABIT_EDIT";
const HABIT_DELETE = "habits/HABIT_REMOVE";
const ADD_NAVIGATION = "navigation/ADD_NAVIGATION";

// Selectors
export const selectHabits = (state: any) => state.habits;
export const selectTodayDone = (state: any) => state.statistics.get("todayDone");
export const selectTodayGoal = (state: any) => state.statistics.get("todayGoal");
export const selectTotalDone = (state: any) => state.statistics.get("totalDone");
export const selectTotal = (state: any) => state.statistics.get("total");
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
export function addHabitActionCreator(habit: HabitItemProps) {
    return (dispatch: Dispatch<any>) => {
        dispatch(addHabitAction(habit));
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
export function initHabitActionCreator(habits: HabitItemProps[]) {
    return (dispatch: Dispatch<any>) => {
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
export function editHabitActionCreator(habit: HabitItemProps) {
    return (dispatch: Dispatch<any>) => {
        dispatch(editHabitAction(habit));
    };
}

export interface DeleteHabitAction {
    type: typeof HABIT_DELETE;
    payload: HabitItemProps;
}
export function deleteHabitAction(habit: HabitItemProps): DeleteHabitAction {
    return {
        type: HABIT_DELETE,
        payload: habit,
    }
};
export function deleteHabitActionCreator(habit: HabitItemProps) {
    return (dispatch: Dispatch<any>) => {
        dispatch(deleteHabitAction(habit));
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
export const setNavigationActionCreator = (navigation: Navigation) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(setNavigationAction(navigation));
    };
}

// TODO: Make as a record
export interface Statistics {
    todayDone: number;
    todayGoal: number;
    totalDone: number;
    total: number;
}
export interface State {
    statistics: any;
    habits: List<HabitItemProps>;
}

// TODO: Define state types
// Initial state
const initialState = {
    statistics: Map({
        todayDone: 2,
        todayGoal: 5,
        totalDone: 50,
        total: 79,
    }),
    habits: List<HabitItemProps>(),
    navigation: {},
};

// TODO: Add Action union types
export type ReducerActions =
    | InitHabitsAction
    | AddHabitAction
    | EditHabitAction
    | DeleteHabitAction
    | SetNavigationAction
;

// Reducer
export function reducer(state = initialState, action: ReducerActions) {
    switch (action.type) {
        case HABITS_INIT: {
            console.log(action.payload);

            return {
                ...state,
                habits: action.payload,
            }
        }
        case HABIT_ADD: {
            return {
                ...state,
                habits: List([...state.habits.toArray(), action.payload]),
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
        case ADD_NAVIGATION: {
            return { ...state, navigation: action.payload };
        }
        case HABIT_DELETE:
            // TODO: Implement
            return state;
        default:
            return state;
    }
}
