import { HabitItemProps } from "../components/habit/types";

export interface NavigationParamsWithHabits {
    habit: Partial<HabitItemProps>;
    isNew: boolean;
    isEditing: boolean;
}
export type NavigationParams = Partial<NavigationParamsWithHabits>;

export interface State {
    key: string;
    routeName: string;
    params: NavigationParamsWithHabits;
}

export interface Navigation<> {
    navigate: (routeName: string, params: NavigationParams, action?: {[K: string]: any}) => void; // TODO: Add types to params
    state: State;
}
