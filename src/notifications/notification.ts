import { Notifications } from "expo";

import { HabitItemProps } from "../components/habit/types";

// Expo.Notifications.dismissNotificationAsync(localNotificationId)
// Android only.Dismisses the notification with the given id.

// Expo.Notifications.dismissAllNotificationsAsync()
// Android only.Clears any notifications that have been presented by the app.


export async function setHabitNotification(habit: HabitItemProps, repeat=true) {
    // https://docs.expo.io/versions/latest/sdk/notifications.html#localnotification
    // Returns Notification ID to store in Habit Model
    return await Notifications.scheduleLocalNotificationAsync(
        {
            title: habit.name,
            body: "It is time to get shit done",
            data: {
                habit,
            },
            ios: {
                sound: true,
            },
            android: {
                sound: true,
                priority: "max",
            },
        },
        {
            time: nextNotificationTime(habit.notificationTime),
            repeat: repeat ? 'day' : undefined,
        }
    ) as number;
}

export function cancelScheduled(id: number) {
    Notifications.cancelScheduledNotificationAsync(id);
}

export function cancelAllScheduled() {
    Notifications.cancelAllScheduledNotificationsAsync();
}

export enum Origin {
    Received = "received",
    Selected = "selected",
}

export async function listenHabit() {
    Notifications.addListener((payload: any) => {
        switch (payload.origin) {
            case Origin.Received: // if the notification was received while the user was in the app

                break;
            case Origin.Selected: // if the notification was tapped on by the user

                break;
            default:
                break;
        }
    });
}

function nextNotificationTime(time: string) {
    const split = time.split(":");

    const myDate = new Date();
    myDate.setHours(+split[0]);
    myDate.setMinutes(+split[1]);
    myDate.setSeconds(0);

    if ((new Date()) > myDate) {
        myDate.setDate(myDate.getDate() + 1);
    }

    return myDate.getTime();
}
