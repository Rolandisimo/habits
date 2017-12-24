import { AsyncStorage } from 'react-native';
import { HabitItemProps } from "../components/habit/types";

export type HabitKeys = 
    | "id"
    | "name"
    | "period"
    | "notificationTime"
    | "done"
;
export default class HabitModel {
    static AVAILABLE_KEYS: HabitKeys[] = ["name"];
    habit: HabitItemProps;
    public constructor(habit: any) {
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
    const new_habit = HabitModel.copyHabitWithAvailableKeys(habit);

    try {
        await AsyncStorage.mergeItem(`${new_habit.id}`, JSON.stringify(new_habit));
        return true;
    } catch (error) {
        console.error("HabitModel.update() error");
        console.error(error);
        return false;
    }
  }

  static async findById(id: string) {
    const habit = await AsyncStorage.getItem(id);
    return new HabitModel(habit);
  }

  static async create(habit: HabitItemProps) {
    const new_habit = HabitModel.copyHabitWithAvailableKeys(habit);

    try {
      await AsyncStorage.setItem(
        `habit:${new_habit.id}`,
        JSON.stringify(new_habit),
      );
    } catch (error) {
        console.error("HabitModel.create() error");
        console.error(error);
    }

    return habit;
  }

  static copyHabitWithAvailableKeys(habit: HabitItemProps) {
      const new_habit: HabitItemProps = {
          ...habit,
          id: Math.round(new Date().getTime() / 1000),
      };

    HabitModel.AVAILABLE_KEYS.forEach((key: HabitKeys) => {
        new_habit[key] = habit[key];
    });
    return new_habit;
  }

  static initDummyObject() {
    return {
      name: "",
    };
  }

  static async listIds() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log(keys);
    } catch (error) {
      console.error("HabitModel.lastId() error");
      console.error(error);
    }
  }
}
