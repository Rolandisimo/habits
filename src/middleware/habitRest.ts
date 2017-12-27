import {
    Middleware,
    MiddlewareAPI,
    Dispatch,
} from "redux";
import { HabitItemProps } from "../components/habit/types";
import { addHabitActionCreator } from "../ducks/common";
import { HabitModel } from "../models/HabitModel";

export const HABIT_ADD = "habitRest/HABIT_ADD";

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

export interface PartialState {
}

export type HabitRestMiddlewareAction =
    | AddHabitRestAction
;

// TODO: Add typings, bitch
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
            default:

        }

        return next(action);
    }
}) as Middleware;
