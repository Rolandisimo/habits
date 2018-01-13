import { AsyncStorage } from 'react-native';
import { HabitItemProps } from "../components/habit/types";
import { historyDate, keyExists } from './utils';
import { Notifications } from "expo"; // Do not delete I use it to clear scheduled notifications

export class HabitModel {
    habit: HabitItemProps;

    public constructor(habit: HabitItemProps) {
        this.habit = habit;
    }

    static async destroy(habit: HabitItemProps) {
        try {
            await AsyncStorage.removeItem(`habit:${habit.id}:history`);
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
            await HabitModel.updateTodayDone(habit, habit.done);
            return true;
        } catch (error) {
            window.setTimeout(() => {
                throw new Error("HabitModel.update() error: " + error)
            })
            return false;
        }
    }

    static async getTodayDone(id: number): Promise<boolean> {
        const stringifiedResult = await AsyncStorage.getItem(`habit:${id}:history`);
        const history = JSON.parse(stringifiedResult);

        return history instanceof Object && !!history[historyDate()];
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

        return Promise.all(multiGetElements.map(async (_: any, i: number, store: [string, string][]) => {
            const element: HabitItemProps = JSON.parse(store[i][1]);
            const done = await HabitModel.getTodayDone(element.id);
    
            return Promise.resolve({
                ...element,
                done: !!done,
            });
        }));
    }

    static async getById(id: number): Promise<HabitItemProps> {
        const allHabits = await HabitModel.all();
        const habitIndex = allHabits.findIndex(habit => habit.id === id);
        return allHabits.slice(habitIndex, habitIndex + 1)[0];
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
