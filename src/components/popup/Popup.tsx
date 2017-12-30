import React from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import {
    closePopupActionCreator,
    selectPopups,
} from '../../ducks/common';
import { PopupData, PopupButton, PopupButtonType } from './factory/PopupData';
import { Button, ButtonTheme } from '../button/Button';
import { styles } from "./styles";

export interface PopupDispatchProps {
    hidePopup: typeof closePopupActionCreator;
}
export interface PopupStateProps {
    popups: PopupData[];
}
export type PopupProps = PopupStateProps & PopupDispatchProps;

export interface PopupState {
    hidden: boolean;
    lastPopup?: PopupData;
}

const ANIMATION_TIMING = 300;

export class Popup extends React.PureComponent<PopupProps, PopupState> {
    public constructor(props: PopupProps) {
        super(props);

        this.onPopupHide = this.onPopupHide.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.renderButtons = this.renderButtons.bind(this);

        this.state = {
            hidden: true,
            lastPopup: undefined,
        }
    }
    public componentDidMount() {
        const popups = this.props.popups;
        if (popups.length) {
            this.setState({
                lastPopup: popups[popups.length-1],
                hidden: false,
            });
        }
    }
    public componentWillReceiveProps(nextProps: PopupProps) {
            if (this.props.popups.length !== nextProps.popups.length) {
                if (nextProps.popups.length > 0) {
                    this.setState({
                        hidden: false,
                        lastPopup: nextProps.popups[0],
                    })
                } else {
                    this.onPopupHide();
                }
            } 
    }
    public render() {
        if (!this.state.lastPopup) {
            return null;
        }

        return (
            <Modal
                isVisible={!this.state.hidden}
                onBackdropPress={this.onPopupHide}
                animationOutTiming={ANIMATION_TIMING}
                animationInTiming={ANIMATION_TIMING}
            >
                <View style={styles.modal}>
                    <View style={styles.contentWrapper}>
                        {this.state.lastPopup.content()}
                    </View>
                    <View style={styles.buttonWrapper}>
                        {this.renderButtons(this.state.lastPopup.buttons)}
                    </View>
                </View>
            </Modal>
        );
    }
    private renderButton(buttonData: PopupButton) {
        const lastPopup = this.state.lastPopup;
        if (lastPopup) {
            return (
                <Button
                    label={buttonData.title}
                    onPress={() => {
                        this.onPopupHide();
                        buttonData.callback();
                    }}
                    theme={ButtonTheme.Small}
                    color={buttonData.id === PopupButtonType.Yes ? "green" : "grey"}
                />
            );
        }
        return false
    }
    private renderButtons(buttonData: PopupButton[]) {
        return buttonData.map((data) => {
            return this.renderButton(data);
        });
    }
    private onPopupHide() {
        if (this.state.lastPopup) {
            const lastPopupId = this.state.lastPopup.id;

            this.setState({
                hidden: true,
            }, () => {
                window.setTimeout(() => {
                    this.props.hidePopup(lastPopupId);
                }, ANIMATION_TIMING);
            })
        }
    }
}

const mapStateToProps = (state: any): PopupStateProps => ({
    popups: selectPopups(state),
});

const mapDispatchToProps: PopupDispatchProps = {
    hidePopup: closePopupActionCreator,
};

export const PopupConnected = connect<PopupStateProps, PopupDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Popup)
