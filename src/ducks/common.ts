import { List } from "immutable";
import { Dispatch } from 'redux';
import { Navigation } from "../types/General";
import { HabitItemProps } from "../components/habit/types";

// Constants
const HABITS_INIT = "habits/HABITS_INIT";
const HABIT_ADD = "habits/HABIT_ADD";
const HABIT_EDIT = "habits/HABIT_EDIT";
const HABIT_DELETE = "habits/HABIT_REMOVE";
const ADD_NAVIGATION = "navigation/ADD_NAVIGATION";
const SET_STATISTICS = "navigation/SET_STATISTICS";

// Selectors
export const selectHabits = (state: Pick<State, "habits">): List<HabitItemProps> => state.habits;
export const selectDone = (state: Pick<State, "statistics">) => state.statistics.done;
export const selectTotal = (state: Pick<State, "statistics">) => state.statistics.total;
export const selectNavigation = (state: Pick<State, "navigation">) => state.navigation as Navigation;

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
    payload: number;
}
export function deleteHabitAction(id: number): DeleteHabitAction {
    return {
        type: HABIT_DELETE,
        payload: id,
    }
};
export function deleteHabitActionCreator(id: number) {
    return (dispatch: Dispatch<any>) => {
        dispatch(deleteHabitAction(id));
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
export const setStatisticsActionCreator = (statistics: Statistics) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(setStatisticsAction(statistics));
    };
}

// TODO: Make as a record
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

// TODO: Add Action union types
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
