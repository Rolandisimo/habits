import { AsyncStorage } from 'react-native';

export default class HabitModel {

  static AVAILABLE_KEYS = ["name"];

  constructor() { }

  static async create(habit) {
    HabitModel.listIds();
    new_habit = HabitModel.copyHabitWithAvailableKeys(habit);

    try {
      await AsyncStorage.setItem(
        `habit:${new_habit.id}`,
        JSON.stringify(new_habit)
      );
    } catch (error) {
      console.error("HabitModel.create() error");
      console.error(error);
    }

    // Return object
    return habit;
  }

  static copyHabitWithAvailableKeys(habit) {
    new_habit = {};
    new_habit.id = Math.round(new Date().getTime() / 1000);
    HabitModel.AVAILABLE_KEYS.forEach(key => {
      new_habit[key] = habit[key];
    });

    return new_habit;
  }

  static async listIds() {
    try {
      console.log(await AsyncStorage.getItem("habit:1510667062"));
      const keys = await AsyncStorage.getAllKeys();
      console.log(keys);
    } catch (error) {
      console.error("HabitModel.lastId() error");
      console.error(error);
    }
  }

}