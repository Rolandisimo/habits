import { AsyncStorage } from 'react-native';

export default class HabitModel {

  static AVAILABLE_KEYS = ["name"];

  constructor(id) {
    this.habit = HabitModel.initDummyObject();
    this.loaded = false;

    HabitModel.getHabitObject(id).then((habit) => {
      this.habit = habit;
      this.loaded = true;
      console.log(this.habit);
    });
  }


  async destroy() {
    try {
      await AsyncStorage.removeItem(this.habit.id);
      return true;
    } catch (error) {
      console.error("HabitModel.destroy() error");
      console.error(error);
      return false;
    }
  }


  static async create(habit) {
    new_habit = HabitModel.copyHabitWithAvailableKeys(habit);

    try {
      await AsyncStorage.setItem(
        `habit:${new_habit.id}`,
        JSON.stringify(new_habit),
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


  static initDummyObject() {
    return {
      name: "",
    };
  }


  static async getHabitObject(id) {
    return await AsyncStorage.getItem(id);
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