import { List } from "immutable";
import { Navigation } from "../types/General";
import { HabitItemProps } from "../components/habit/types";
import { Thunk } from "../types/types";
import {
    createDeletePopup,
} from '../components/popup/factory/PopupFactory';
import {
    PopupData,
    PopupButtonType,
    PopupId,
} from "../components/popup/factory/PopupData";
import { createButton } from "../components/popup/factory/utils";
import { deleteHabitRestActionCreator } from '../middleware/habitRest';
import { routes } from '../../routes';

// Habits
const HABITS_INIT = "habits/HABITS_INIT";
const HABIT_ADD = "habits/HABIT_ADD";
const HABIT_EDIT = "habits/HABIT_EDIT";
const HABIT_DELETE = "habits/HABIT_REMOVE";
// Navigation
const ADD_NAVIGATION = "navigation/ADD_NAVIGATION";
// Stats
const SET_STATISTICS = "navigation/SET_STATISTICS";
// Popups
const SET_POPUP_VISIBLE = "navigation/SET_POPUP_VISIBLE";
const SET_POPUP_HIDDEN = "navigation/SET_POPUP_HIDDEN";
const OPEN_POPUP = "navigation/OPEN_POPUP";
const CLOSE_POPUP = "navigation/CLOSE_POPUP";

// Selectors
export const selectHabits = (state: any): List<HabitItemProps> => state.habits;
export const selectDone = (state: any): number => state.statistics.done;
export const selectTotal = (state: any): number => state.statistics.total;
export const selectNavigation = (state: any) => state.navigation as Navigation;
// export const selectPopupVisibility = (state: any): boolean => state.popup.visible;
export const selectPopups = (state: any): PopupData[] => state.popups;

// Actions/Action Creators
export interface AddHabitAction {
    type: typeof HABIT_ADD;
    payload: HabitItemProps;
}
export function addHabitAction(habit: HabitItemProps): AddHabitAction {
    return {
        type: HABIT_ADD,
        payload: habit,
    }
};
export function addHabitActionCreator(habit: HabitItemProps): Thunk {
    return (dispatch, getState) => {
        dispatch(addHabitAction(habit));

        const state = getState();
        dispatch(setStatisticsAction({
            done: selectDone(state),
            total: selectHabits(state).size,
        }));
    };
}

export interface InitHabitsAction {
    type: typeof HABITS_INIT;
    payload: HabitItemProps[],
}
export function initHabitsAction(habits: HabitItemProps[]): InitHabitsAction {
    return {
        type: HABITS_INIT,
        payload: habits,
    }
};
export function initHabitActionCreator(habits: HabitItemProps[]): Thunk {
    return (dispatch) => {
        dispatch(initHabitsAction(habits));
    };
}

export interface EditHabitAction {
    type: typeof HABIT_EDIT;
    payload: HabitItemProps;
}
export function editHabitAction(habit: HabitItemProps): EditHabitAction {
    return {
        type: HABIT_EDIT,
        payload: habit,
    }
};
export function editHabitActionCreator(habit: HabitItemProps): Thunk {
    return (dispatch, getState) => {
        dispatch(editHabitAction(habit));

        // TODO: Move mutation to middleware
        if (habit.done) {
            const state = getState();
            const doneHabits = selectHabits(state)
                .filter(habit => {
                    if (habit && habit.done) {
                        return true;
                    }
                    return false;
                });
            dispatch(setStatisticsAction({
                done: doneHabits.size,
                total: selectTotal(state),
            }));
        }
    };
}

export interface DeleteHabitAction {
    type: typeof HABIT_DELETE;
    payload: number;
}
export function deleteHabitAction(id: number): DeleteHabitAction {
    return {
        type: HABIT_DELETE,
        payload: id,
    }
};
export function deleteHabitActionCreator(id: number): Thunk {
    return (dispatch, getState) => {
        dispatch(deleteHabitAction(id));

        const state = getState();
        dispatch(setStatisticsAction({
            done: selectDone(state),
            total: selectHabits(state).size,
        }));
    };
}

export interface SetNavigationAction {
    type: typeof ADD_NAVIGATION;
    payload: Navigation;
}
export function setNavigationAction(navigation: Navigation): SetNavigationAction {
    return {
        type: ADD_NAVIGATION,
        payload: navigation,
    }
};
export const setNavigationActionCreator = (navigation: Navigation): Thunk => {
    return (dispatch) => {
        dispatch(setNavigationAction(navigation));
    };
}

export interface SetStatisticsAction {
    type: typeof SET_STATISTICS;
    payload: Statistics;
}
export function setStatisticsAction(statistics: Statistics): SetStatisticsAction {
    return {
        type: SET_STATISTICS,
        payload: statistics,
    }
};
export const setStatisticsActionCreator = (statistics: Statistics): Thunk => {
    return (dispatch) => {
        dispatch(setStatisticsAction(statistics));
    };
}

export interface SetPopupVisibleAction {
    type: typeof SET_POPUP_VISIBLE;
}
export function setPopupVisibleAction(): SetPopupVisibleAction {
    return {
        type: SET_POPUP_VISIBLE,
    }
};
export const setPopupVisibleActionCreator = (): Thunk => {
    return (dispatch) => {
        dispatch(setPopupVisibleAction());
    };
}

export interface SetPopupHiddenAction {
    type: typeof SET_POPUP_HIDDEN;
}
export function setPopupHiddenAction(): SetPopupHiddenAction {
    return {
        type: SET_POPUP_HIDDEN,
    }
};
export const setPopupHiddenActionCreator = (): Thunk => {
    return (dispatch) => {
        dispatch(setPopupHiddenAction());
    };
}

export interface OpenPopupAction {
    type: typeof OPEN_POPUP;
    payload: PopupData;
}
export function openPopupAction(popup: PopupData): OpenPopupAction {
    return {
        type: OPEN_POPUP,
        payload: popup,
    }
};
export const openPopupActionCreator = (popup: PopupData): Thunk => {
    return (dispatch) => {
        dispatch(openPopupAction(popup));
    };
}

export interface ClosePopupAction {
    type: typeof CLOSE_POPUP;
    payload: string;
}
export function closePopupAction(popupId: string): ClosePopupAction {
    return {
        type: CLOSE_POPUP,
        payload: popupId,
    }
};
export const closePopupActionCreator = (popupId: string): Thunk => {
    return (dispatch) => {
        dispatch(closePopupAction(popupId));
    };
}

export const createDeletePopupActionCreator = (habit: HabitItemProps): Thunk => {
    return (dispatch, getState) => {
        dispatch(openPopupAction(createDeletePopup({
            buttons: [
                createButton(
                    PopupButtonType.Yes,
                    () => {
                        dispatch(deleteHabitRestActionCreator(habit));
                        dispatch(closePopupActionCreator(PopupId.DeletePopup));
                        selectNavigation(getState()).navigate(routes.MainScreen, {});
                    },
                ),
                createButton(
                    PopupButtonType.No,
                    () => dispatch(closePopupActionCreator(PopupId.DeletePopup)),
                ),
            ],
        })));
    };
}

export enum Priority {
    Low,
    Medium,
    High,
}

export interface Statistics {
    done: number;
    total: number;
}
export interface State {
    statistics: Statistics;
    habits: List<HabitItemProps>;
    navigation?: Navigation;
    popups: PopupData[];
}

// Initial state
const initialState = {
    statistics: {},
    habits: List<HabitItemProps>(),
    navigation: {},
    popups: [] as PopupData[],
} as State;

export type ReducerActions =
    | InitHabitsAction
    | AddHabitAction
    | EditHabitAction
    | DeleteHabitAction
    | SetNavigationAction
    | SetStatisticsAction
    | OpenPopupAction
    | ClosePopupAction
;

// Reducer
export function reducer(state = initialState, action: ReducerActions) {
    switch (action.type) {
        case HABITS_INIT: {
            return {
                ...state,
                habits: List(action.payload),
            }
        }
        case HABIT_ADD: {
            return {
                ...state,
                habits: List([action.payload, ...state.habits.toArray()]),
            };
        }
        case HABIT_EDIT: {
            const newHabits = state.habits
                .map((habit?: HabitItemProps) => {
                    if (habit && habit.id === action.payload.id) {
                        return action.payload;
                    }
                    return habit;
                });

            return { ...state, habits: newHabits };
        }
        case HABIT_DELETE:
            const habits = state.habits.filter(habit => {
                if (habit) {
                    return habit.id !== action.payload
                }
                return false;
            })

            return { ...state, habits };
        case ADD_NAVIGATION: {
            return { ...state, navigation: action.payload };
        }
        case SET_STATISTICS: {
            return {
                ...state,
                statistics: action.payload,
            }
        }
        case OPEN_POPUP: {
            return {
                ...state,
                popups: [
                    ...selectPopups(state),
                    action.payload,
                ],
            }
        }
        case CLOSE_POPUP:  {
            const newPopups = selectPopups(state)
                .filter(popup => {
                    if (popup && popup.id === action.payload) {
                        return false
                    }

                    return true;
                });

            return {
                ...state,
                popups: newPopups,
            }
        }
        default:
            return state;
    }
}
