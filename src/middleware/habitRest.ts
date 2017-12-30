import {
    Middleware,
    MiddlewareAPI,
} from "redux";
import { HabitItemProps } from "../components/habit/types";
import {
    addHabitActionCreator,
    initHabitActionCreator,
    deleteHabitActionCreator,
    editHabitActionCreator,
    setStatisticsActionCreator,
    Statistics,
} from "../ducks/common";
import { HabitModel } from "../models/HabitModel";
import {
    getDoneHabits,
    sortHabits,
} from "./utils";
import { Thunk } from '../types/types';

export const HABIT_ADD = "habitRest/HABIT_ADD";
export const HABIT_DELETE = "habitRest/HABIT_DELETE";
export const HABIT_EDIT = "habitRest/HABIT_EDIT";
export const HABITS_INIT = "habitRest/HABITS_INIT";

// Actions/Action Creators
export interface AddHabitRestAction {
    type: typeof HABIT_ADD;
    payload: HabitItemProps;
}
export function addHabitRestAction(habit: HabitItemProps): AddHabitRestAction {
    return {
        type: HABIT_ADD,
        payload: habit,
    }
};
export function addHabitRestActionCreator(habit: HabitItemProps): Thunk {
    return (dispatch) => {
        dispatch(addHabitRestAction(habit));
    };
}

export interface DeleteHabitRestAction {
    type: typeof HABIT_DELETE;
    payload: HabitItemProps;
}
export function deleteHabitRestAction(habit: HabitItemProps): DeleteHabitRestAction {
    return {
        type: HABIT_DELETE,
        payload: habit,
    }
};
export function deleteHabitRestActionCreator(habit: HabitItemProps): Thunk {
    return (dispatch) => {
        dispatch(deleteHabitRestAction(habit));
    };
}

export interface EditHabitRestAction {
    type: typeof HABIT_EDIT;
    payload: HabitItemProps;
}
export function editHabitRestAction(habit: HabitItemProps): EditHabitRestAction {
    return {
        type: HABIT_EDIT,
        payload: habit,
    }
};
export function editHabitRestActionCreator(habit: HabitItemProps): Thunk {
    return (dispatch) => {
        dispatch(editHabitRestAction(habit));
    };
}

export interface InitHabitsRestAction {
    type: typeof HABITS_INIT;
}
export function initHabitsRestAction(): InitHabitsRestAction {
    return {
        type: HABITS_INIT,
    }
};
export function initHabitRestActionCreator(): Thunk {
    return (dispatch) => {
        dispatch(initHabitsRestAction());
    };
}


// TODO: Add typings, bitch
export interface PartialState {
}

export type HabitRestMiddlewareAction =
    | AddHabitRestAction
    | DeleteHabitRestAction
    | EditHabitRestAction
    | InitHabitsRestAction
;

export const habitRestMiddleware = (<S extends PartialState>({ dispatch }: MiddlewareAPI<S>) => (next: any) => {
    return (action: HabitRestMiddlewareAction) => {
        switch (action.type) {
            case HABIT_ADD: {
                HabitModel.create(action.payload).then((response) => {
                    dispatch(addHabitActionCreator(response));
                });
                break;
            }
            case HABIT_DELETE: {
                HabitModel.destroy(action.payload).then(response => {
                    if (response) {
                        dispatch(deleteHabitActionCreator(action.payload.id));
                    }
                });
                break;
            }
            case HABIT_EDIT: {
                HabitModel.update(action.payload).then(response => {
                    if (response) {
                        dispatch(editHabitActionCreator(action.payload));
                    }
                });
                break;
            }
            case HABITS_INIT: {
                HabitModel.all().then((response) => {
                    const sortedHabits = sortHabits(response);
                    // Add today done and today goal
                    const statistics: Statistics = {
                        done: getDoneHabits(sortedHabits).length,
                        total: sortedHabits.length,
                    };
                    dispatch(setStatisticsActionCreator(statistics));
                    dispatch(initHabitActionCreator(sortedHabits));
                })
                break;
            }
            default:

        }

        return next(action);
    }
}) as Middleware;
