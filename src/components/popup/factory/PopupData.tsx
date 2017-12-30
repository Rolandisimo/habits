import React from "react";

export enum PopupId {
    DeletePopup = "DELETE_POPUP",
}
export enum PopupButtonType {
    Yes = "yes",
    No = "no",
}
export interface PopupButton {
    id: PopupButtonType;
    icon?: JSX.Element;
    title: string;
    callback: (argument?: any) => void; 
}

export enum Priority {
    Low,
    Medium,
    High,
}

export enum PopupType {
    Info,
    Error,
}
export type PopupCallback = (data?: object) => void;
export type PopupContentCreator = () => React.ReactNode;

export class PopupData {
    public readonly type: PopupType;
    private popupId: PopupId;
    private popupButtons: PopupButton[];
    private popupCallback: PopupCallback | undefined;
    private popupPriority: Priority = Priority.Medium;
    private popupTitle: string | React.ReactNode;

    constructor(type: PopupType) {
        this.type = type;
    }

    public addId(id: PopupId): PopupData {
        this.popupId = id;
        return this;
    }
    public addButtons(buttons: PopupButton[]): PopupData {
        this.popupButtons = buttons;
        return this;
    }
    public addCallback(callback: PopupCallback | undefined): PopupData {
        this.popupCallback = callback;
        return this;
    }
    public addContent(content: () => React.ReactNode): PopupData {
        this.popupContent = content;
        return this;
    }
    public addPriority(value: number): PopupData {
        this.popupPriority = value;
        return this;
    }
    public addTitle(value: string | React.ReactNode): PopupData {
        this.popupTitle = value;
        return this;
    }
    get id(): string {
        return this.popupId;
    }
    get buttons(): Array<PopupButton> {
        return this.popupButtons;
    }
    get callback(): PopupCallback | undefined {
        return this.popupCallback;
    }
    get content(): PopupContentCreator {
        return this.popupContent;
    }
    get priority(): number {
        return this.popupPriority;
    }
    get title(): string | React.ReactNode {
        return this.popupTitle;
    }

    private popupContent: PopupContentCreator = () => null;
}