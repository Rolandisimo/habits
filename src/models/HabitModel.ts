import { AsyncStorage } from 'react-native';
import { HabitItemProps } from "../components/habit/types";
import { historyDate, keyExists } from './utils';

export class HabitModel {
    habit: HabitItemProps;

    public constructor(habit: HabitItemProps) {
        this.habit = habit;
    }

    static async destroy(habit: HabitItemProps) {
        try {
            await AsyncStorage.removeItem(`habit:${habit.id}`);
            return true;
        } catch (error) {
            window.setTimeout(() => {
                throw new Error("HabitModel.destroy() error: " + error)
            })
            return false;
        }
    }

    static async update(habit: HabitItemProps) {
        try {
            await AsyncStorage.mergeItem(`habit:${habit.id}`, JSON.stringify(habit));
            return true;
        } catch (error) {
            window.setTimeout(() => {
                throw new Error("HabitModel.update() error: " + error)
            })
            return false;
        }
    }


    static async updateTodayDone(habit: HabitItemProps, done: boolean) {
        try {
            const record = {
                [historyDate()]: done,
            };

            const keys = await AsyncStorage.getAllKeys();
            if (keyExists(keys, `habit:${habit.id}:history`)) {
                await AsyncStorage.mergeItem(`habit:${habit.id}:history`, JSON.stringify(record));
            } else {
                await AsyncStorage.setItem(`habit:${habit.id}:history`, JSON.stringify(record));
            }
            return true;
        } catch (error) {
            window.setTimeout(() => {
                throw new Error("HabitModel.updateTodayDone() error: " + error)
            })
            return false;
        }
    }

    static async create(habit: HabitItemProps) {
        const newHabit: HabitItemProps = {
            ...habit,
            id: Math.round(new Date().getTime() / 1000),
            createdAt: Date.now(),
        };

        try {
            await AsyncStorage.setItem(
                `habit:${newHabit.id}`,
                JSON.stringify(newHabit),
            );
        } catch (error) {
            window.setTimeout(() => {
                throw new Error("HabitModel.create() error: " + error)
            })
        }

        return newHabit;
    }

    static async all(): Promise<HabitItemProps[]> {
        // AsyncStorage.clear();
        // Notifications.cancelAllScheduledNotificationsAsync();

        const keys = await HabitModel.listHabitKeys();
        const multiGetElements = await AsyncStorage.multiGet(keys, (_, stores) => {
            return stores;
        });

        const elements = multiGetElements.map((_, i, store) => {
            return JSON.parse(store[i][1]);
        });

        return elements;
    }

    static async listHabitKeys() {
        try {
            const keys = await AsyncStorage.getAllKeys();
            return keys.filter((key) => {
                const segments = key.split(":");
                return (segments[0] === "habit" && segments.length == 2);
            });
        } catch (error) {
            window.setTimeout(() => {
                throw new Error("HabitModel.listHabitKeys() error: " + error)
            })
            return [];
        }
    }
}
