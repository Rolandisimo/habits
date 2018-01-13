import {
    Middleware,
    MiddlewareAPI,
    Dispatch,
} from "redux";
// import { HabitItemProps } from "../components/habit/types";
import { 
    Notifications,
    Permissions,
} from "expo";
import {
    selectNavigation,
    createDoneNotDonePopupActionCreator,
} from '../ducks/common';
import { routes } from '../../routes';
import { HabitItemProps } from '../components/habit/types';
import { HabitModel } from '../models/HabitModel';

export const NOTIFICATIONS_INIT = "notifications/NOTIFICATIONS_INIT";
export const NOTIFICATIONS_PERMISSION = "notifications/NOTIFICATIONS_PERMISSION";

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

export interface NotificationsPermissionAction {
    type: typeof NOTIFICATIONS_PERMISSION;
}
export function notificationsPermissionAction(): NotificationsPermissionAction {
    return {
        type: NOTIFICATIONS_PERMISSION,
    }
};
export function notificationsPermissionActionCreator() {
    return (dispatch: Dispatch<any>) => {
        dispatch(notificationsPermissionAction());
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
    | NotificationsPermissionAction
;

export interface NotificationPayload {
    data: {
        habit: HabitItemProps;
    },
    origin: Origin;
    remote: boolean;
}

export const notificationsMiddleware = (<S extends PartialState>({ dispatch }: MiddlewareAPI<S>) => (next: any) => {
    return (action: NotificationsMiddlewareAction) => {
        switch (action.type) {
            case NOTIFICATIONS_PERMISSION: {
                // Should be: Permissions.NOTIFICATIONS
                Permissions.getAsync('remoteNotifications').then((getStatus) => {
                    // status === 'granted'
                    // status === 'undetermined'
                    if (getStatus.status !== 'granted') {
                        Permissions.askAsync('remoteNotifications').then((askStatus) => {
                            if (askStatus.status !== 'granted') {
                                // TODO: Fill functionality or delete @aigarsPidar
                                // Add popup asking if the user really wants not receiving notifs
                                alert("SUKA DAJ PERMISIJI!");
                            }
                        });
                    }
                });
            }
            case NOTIFICATIONS_INIT: {
                Notifications.addListener(async (payload) => {
                    switch (payload.origin) {
                        case Origin.Received:
                        case Origin.Selected:
                            const notifiedHabit = await HabitModel.getById(payload.data.habit.id);
                            if (!notifiedHabit.done) {
                                dispatch(createDoneNotDonePopupActionCreator(payload.data.habit));
                            }

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
