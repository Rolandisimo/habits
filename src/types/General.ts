import { HabitItemProps } from "../components/habit/types";

export interface NavigationParamsWithHabits {
    habit: HabitItemProps;
    isNew: boolean;
    isEditing: boolean;
}
export type NavigationParams = Partial<NavigationParamsWithHabits> | {[K: string]: any};

export interface StateWithoutParams {
    key: string;
    routeName: string;
}
export interface StateWithParams {
    key: string;
    routeName: string;
    params: NavigationParamsWithHabits;
}

export function hasParams(state: any): state is StateWithParams {
    return state.params;
}

export interface Navigation<> {
    navigate: (routeName: string, params?: NavigationParams, action?: {[K: string]: any}) => void; // TODO: Add types to params
    state: StateWithParams | StateWithoutParams;
}
