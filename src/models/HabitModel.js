import { AsyncStorage } from 'react-native';

export default class HabitModel {

  static AVAILABLE_KEYS = ["name"];

  constructor(habit) {
    this.habit = habit;
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


  async update(habit) {
    new_habit = HabitModel.copyHabitWithAvailableKeys(habit);

    try {
      await AsyncStorage.mergeItem(new_habit.id, new_habit);
      return true;
    } catch (error) {
      console.error("HabitModel.update() error");
      console.error(error);
      return false;
    }
  }


  // Returns a Promise.
  static async findById(id) {
    const habit = await AsyncStorage.getItem(id);
    return new HabitModel(habit);
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