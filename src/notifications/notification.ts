import { Notifications } from "expo";
import { HabitItemProps } from "../components/habit/types";

// Expo.Notifications.dismissNotificationAsync(localNotificationId)
// Android only.Dismisses the notification with the given id.

// Expo.Notifications.dismissAllNotificationsAsync()
// Android only.Clears any notifications that have been presented by the app.


export async function setHabitNotification(habit: HabitItemProps, repeat = true) {
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
            time: nextNotificationTime(habit.notificationTime, habit.done),
            repeat: repeat ? 'day' : undefined,
        }
    ) as number;
}

// For testing purposes
export async function setImmediateHabitNotification(habit: HabitItemProps) {
    return await Notifications.presentLocalNotificationAsync({
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
    });
}

export function cancelScheduled(id: string | number) {
    Notifications.cancelScheduledNotificationAsync(id);
}

export function cancelAllScheduled() {
    Notifications.cancelAllScheduledNotificationsAsync();
}

export function shouldSetNotificationTime(endTimestamp: number): boolean {
    const currentTimestamp: number = + new Date();
    return endTimestamp > currentTimestamp;
}

function nextNotificationTime(time: string, setToNextDay: boolean) {
    const split = time.split(":");

    const myDate = new Date();
    myDate.setHours(+split[0]);
    myDate.setMinutes(+split[1]);
    myDate.setSeconds(0);

    if ((new Date()) > myDate) {
        myDate.setDate(myDate.getDate() + 1);
    }
    const timeToSet = myDate.getTime();

    // 86400000 = 24h
    return setToNextDay ? timeToSet + 86400000 : timeToSet;
}
