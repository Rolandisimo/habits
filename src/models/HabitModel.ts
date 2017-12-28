import { AsyncStorage } from 'react-native';
import { HabitItemProps } from "../components/habit/types";

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
            window.setTimeout(() => {
                throw new Error("HabitModel.create() error: " + error)
            })
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
        const multiGetElements = await AsyncStorage.multiGet(keys, (_, stores) => {
            return stores;
        });

        const elements = multiGetElements.map((_, i, store) => {
            return JSON.parse(store[i][1]);
        });

        return elements;
    }

    static async listIds() {
        try {
            const keys = await AsyncStorage.getAllKeys();
            return keys;
        } catch (error) {
            window.setTimeout(() => {
                throw new Error("HabitModel.listIds() error: " + error)
            })
            return [];
        }
    }
}
