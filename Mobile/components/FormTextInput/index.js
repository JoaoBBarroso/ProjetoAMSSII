import React, { Component } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export default class FormTextInput extends Component{

    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render() {
        const { style, ...otherProps } = this.props;
        return (
            <TextInput
                selectionColor={"#428AF8"}
                style={[styles.textInput, style]}
                {...otherProps}
            />
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: "#BEBEBE",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20
    }
});
