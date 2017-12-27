import { AsyncStorage } from 'react-native';
import { HabitItemProps } from "../components/habit/types";

export type HabitKeys =
    | "id"
    | "name"
    | "period"
    | "createdAt"
    | "notificationTime"
    | "done"
;
export class HabitModel {
    habit: HabitItemProps;

    public constructor(habit: HabitItemProps) {
        this.habit = habit;
    }

    async destroy() {
        try {
            await AsyncStorage.removeItem(`${this.habit.id}`);
            return true;
        } catch (error) {
            console.error("HabitModel.destroy() error");
            console.error(error);
            return false;
        }
    }

    async update(habit: HabitItemProps) {
        try {
            await AsyncStorage.mergeItem(`${habit.id}`, JSON.stringify(habit));
            return true;
        } catch (error) {
            console.error("HabitModel.update() error");
            console.error(error);
            return false;
        }
    }

    static async findById(id: string) {
        const habit: HabitItemProps = JSON.parse(await AsyncStorage.getItem(id));
        return new HabitModel(habit);
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
            console.error("HabitModel.create() error");
            console.error(error);
        }

        return newHabit;
    }

    static initDummyObject() {
        return {
            name: "",
        };
    }

    static async all(): Promise<HabitItemProps[]> {
        const keys = await HabitModel.listIds();
        const multiGetElements = await AsyncStorage.multiGet(keys, (err, stores) => {
            return stores;
        });

        const elements = multiGetElements.map((result, i, store) => {
            return JSON.parse(store[i][1]);
        });

        return elements;
    }

    static async listIds() {
        try {
            const keys = await AsyncStorage.getAllKeys();
            return keys;
        } catch (error) {
            console.error("HabitModel.lastId() error");
            console.error(error);
            return [];
        }
    }
}
