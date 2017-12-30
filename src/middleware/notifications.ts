import {
    Middleware,
    MiddlewareAPI,
    Dispatch,
} from "redux";
// import { HabitItemProps } from "../components/habit/types";
import { Notifications } from "expo";
import { HabitModel } from "../models/HabitModel";

export const NOTIFICATIONS_INIT = "notifications/NOTIFICATIONS_INIT";

export interface NotificationsInitAction {
    type: typeof NOTIFICATIONS_INIT;
}
export function notificationsInitAction(): NotificationsInitAction {
    return {
        type: NOTIFICATIONS_INIT,
    }
};
export function notificationsInitActionCreator() {
    return (dispatch: Dispatch<any>) => {
        dispatch(notificationsInitAction());
    };
}


// TODO: Add typings, bitch
export enum Origin {
    Received = "received", // if the notification was received while the user was in the app
    Selected = "selected", // if the notification was tapped on by the user
}

export interface PartialState {
}

export type NotificationsMiddlewareAction =
    | NotificationsInitAction
;

export const notificationsMiddleware = (<S extends PartialState>({ dispatch }: MiddlewareAPI<S>) => (next: any) => {
    return (action: NotificationsMiddlewareAction) => {
        switch (action.type) {
            case NOTIFICATIONS_INIT: {
                console.log("Start listening notifications.")
                Notifications.addListener((payload: any) => {
                    console.log(payload);
                    switch (payload.origin) {
                        case Origin.Received:

                            break;
                        case Origin.Selected:

                            break;
                        default:
                    }
                });
                break;
            }
            default:
        }

        return next(action);
    }
}) as Middleware;
