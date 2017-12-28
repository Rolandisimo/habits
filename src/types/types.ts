import { Action, Dispatch } from "redux";

export type __FIX_ME_TS4023 = Dispatch<any>;

export type ThunkAction<R, S, E = undefined> = (dispatch: Dispatch<S>, getState: () => S, extraArgument?: E) => R;
export type Thunk<S = any> = ThunkAction<void, S, any>;

export interface ThunkDispatch<S> {
    <R, E>(asyncAction: ThunkAction<R, S, E>): R;
    <A extends Action>(action: A): A;
}

/**
 * TypeScript middleware fix for ThunkAction and Action incompatibility
 * @param action
 * @returns {action is Function}
 */
export const isAsyncAction = (action: any): action is Function => false;
