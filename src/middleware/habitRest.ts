import {
    Middleware,
    MiddlewareAPI,
    Dispatch,
} from "redux";
import { HabitItemProps } from "../components/habit/types";
import {
    addHabitActionCreator,
    initHabitActionCreator,
} from "../ducks/common";
import { HabitModel } from "../models/HabitModel";

export const HABIT_ADD = "habitRest/HABIT_ADD";
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
export function addHabitRestActionCreator(habit: HabitItemProps) {
    return (dispatch: Dispatch<any>) => {
        dispatch(addHabitRestAction(habit));
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
export function initHabitRestActionCreator() {
    return (dispatch: Dispatch<any>) => {
        dispatch(initHabitsRestAction());
    };
}


// TODO: Add typings, bitch
export interface PartialState {
}

export type HabitRestMiddlewareAction =
    | AddHabitRestAction
    | InitHabitsRestAction
;

export const habitRestMiddleware = (<S extends PartialState>({
    dispatch,
    getState,
}: MiddlewareAPI<S>) => (next: any) => {
    return (action: HabitRestMiddlewareAction) => {
        switch (action.type) {
            case HABIT_ADD:
                HabitModel.create(action.payload).then((response) => {
                    dispatch(addHabitActionCreator(response));
                });

                break;
            case HABITS_INIT:
                HabitModel.all().then((response) => {
                    dispatch(initHabitActionCreator(response));
                })
                break;
            default:

        }

        return next(action);
    }
}) as Middleware;
