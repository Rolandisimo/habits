import { PopupButtonType } from "./PopupData";

export function createButton(id: PopupButtonType, callback: () => void) {
    switch (id) {
        case PopupButtonType.Yes: {
            return {
                id: PopupButtonType.Yes,
                title: "Yes",
                callback,
            }
        }
        case PopupButtonType.No: {
            return {
                id: PopupButtonType.No,
                title: "No",
                callback,
            }
        }
        default:
            throw new Error("No such button. Add it to createButton!");
    }
}
