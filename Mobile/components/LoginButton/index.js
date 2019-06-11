import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default class LoginButton extends Component{

    constructor(props) {
        super(props);

        this.state = {
            // label: this.props.label
        };
    }

    render() {
        const { label, onPress } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Text style={styles.text}>{label}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#428AF8",
        marginBottom: 12,
        paddingVertical: 12,
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.7)"
    },
    text: {
        color: "#FFF",
        textAlign: "center",
        height: 20
    }
});