import React, { Component } from 'react';
import { View, StatusBar, TextInput, Text } from 'react-native';

export class FloatingLabelInput extends Component {
    state = {
        isFocused: false
    };

    handleFocus = () => this.setState({ isFocused: true });

    handleBlur = () => this.setState({ isFocused: false });

    render() {
        const { label, ...props } = this.props;

        const { isFocused } = this.state;
        const labelStyle = {
            position: 'absolute',
            left: 12,
            top: !isFocused ? 13 : 3,
            fontSize: !isFocused ? 16 : 12,
            color: !isFocused ? '#aaa' : '#000'
        };
        const inputAndTit = {
            borderColor: '#D6E0F5',
            borderRadius: 4,
            borderStyle: 'solid',
            borderWidth: 1,
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 5
        };
        return (
            <View style={inputAndTit}>
                <Text style={labelStyle}>{label}</Text>
                <TextInput
                    {...props}
                    style={{
                        height: 45,
                        fontSize: 14
                    }}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
            </View>
        );
    }
}
export default FloatingLabelInput;
