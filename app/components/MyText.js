import React, { PureComponent } from 'react';
import { StyleSheet, Linking, Alert, Platform } from 'react-native';
import { Mixins, Typography } from '@app/styles';

import ParsedText from 'react-native-parsed-text';

export default class MyText extends PureComponent {
    render() {
        let fontSize = Typography.FONT_SIZE_14;
        let lineHeight = Typography.LINE_HEIGHT_18; // Default line height is 120% of the font size.

        if (this.props.addSize !== null && this.props.addSize !== undefined) {
            fontSize += Mixins.scaleFont(this.props.addSize);
            // if (helper.IsValidateObject(this.props.lineHeight)) lineHeight = this.props.lineHeight;
            lineHeight =
                fontSize *
                (Typography.LINE_HEIGHT_18 / Typography.FONT_SIZE_14);
        }
        return (
            <ParsedText
                onLayout={this.props.onLayout}
                parse={[
                    {
                        pattern: /@hyperlink:{(.*?)}/i,
                        style: styles.hyperLinkStyle,
                        onPress: this.props.hyperLinkPress
                            ? this.props.hyperLinkPress
                            : this.pressNumber,
                        renderText: this.renderTextHyperLink
                    },
                    {
                        pattern: /@bold:{(.*?)}/i,
                        style: [styles.boldStyle, this.props.styleBold],
                        onPress: null,
                        renderText: this.renderTextBold
                    }
                ]}
                includeFontPadding={false}
                numberOfLines={this.props.numberOfLines}
                ellipsizeMode={this.props.ellipsizeMode}
                onPress={
                    this.props.onCall
                        ? this.openTelephoneWithText(this.props.text)
                        : this.props.onPress
                }
                // onLongPress={this.props.onLongPress ? this.props.onLongPress : (() => Clipboard.setString(this.props.text)).bind(this)}
                allowFontScaling={false}
                selectable
                style={StyleSheet.flatten([
                    {
                        color: color.black,
                        fontSize,
                        lineHeight
                    },
                    this.defaultStyle(this.props.typeFont),
                    this.props.style
                ])}>
                {this.props.text}
                {this.props.children}
            </ParsedText>
        );
    }

    defaultStyle = (typeFont) => {
        switch (typeFont) {
            case 'black':
                return robotoStyles.black;
            case 'blackitalic':
                return robotoStyles.blackitalic;
            case 'thin':
                return robotoStyles.thin;
            case 'thinitalic':
                return robotoStyles.thinitalic;
            case 'italic':
                return robotoStyles.italic;
            case 'light':
                return robotoStyles.light;
            case 'regular':
                return robotoStyles.regular;
            case 'medium_regular':
                return robotoStyles.medium_regular;
            case 'medium':
                return robotoStyles.medium;

            case 'bold':
                return robotoStyles.bold;

            case 'bolditalic':
                return robotoStyles.bolditalic;

            default:
                return robotoStyles.regular;
        }
    };

    openTelephoneWithText = () => (text) => {
        return callNumber(text);
    };
}

export const callNumber = (phone) => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
        phoneNumber = `tel://${phoneNumber}`;
    } else {
        phoneNumber = `tel:${phone}`;
    }

    Linking.canOpenURL(phoneNumber)
        .then((supported) => {
            if (!supported) {
                Alert.alert('Phone number is not available');
            } else {
                return Linking.openURL(phoneNumber);
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

const color = {
    hyperColor: '#3490D6',
    black: 'black'
};

const styles = StyleSheet.create({
    boldStyle: {
        color: color.black,
        fontWeight: Typography.FONT_REGULAR.fontWeight
    },
    hyperLinkStyle: {
        color: color.hyperColor
    }
});

MyText.defaultProps = {
    typeFont: 'regular'
};

const robotoStyles = {
    black: {
        includeFontPadding: false,
        fontFamily: Typography.FONT_FAMILY_BLACK,
        fontWeight: 'normal',
        backgroundColor: 'transparent'
    },
    blackitalic: {
        includeFontPadding: false,
        fontFamily: Typography.FONT_FAMILY_BLACKITALIC,
        fontWeight: 'normal',
        backgroundColor: 'transparent'
    },
    thin: {
        includeFontPadding: false,
        fontFamily: Typography.FONT_FAMILY_THIN,
        fontWeight: 'normal',
        backgroundColor: 'transparent'
    },
    thinitalic: {
        includeFontPadding: false,
        fontFamily: Typography.FONT_FAMILY_THINITALIC,
        fontWeight: 'normal',
        backgroundColor: 'transparent'
    },
    italic: {
        includeFontPadding: false,
        fontFamily: Typography.FONT_FAMILY_ITALIC,
        fontWeight: 'normal',
        backgroundColor: 'transparent'
    },
    light: {
        includeFontPadding: false,
        fontFamily: Typography.FONT_FAMILY_LIGHT,
        fontWeight: 'normal',
        backgroundColor: 'transparent'
    },
    regular: {
        includeFontPadding: false,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontWeight: 'normal',
        backgroundColor: 'transparent'
    },
    medium_regular: {
        includeFontPadding: false,
        fontFamily: Typography.FONT_FAMILY_MEDIUM,
        fontWeight: '500',
        backgroundColor: 'transparent'
    },
    medium: {
        includeFontPadding: false,
        fontFamily: Typography.FONT_FAMILY_MEDIUM,
        fontWeight: '500',
        backgroundColor: 'transparent'
    },
    bold: {
        includeFontPadding: false,
        fontFamily: Typography.FONT_FAMILY_BOLD,
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    },
    bolditalic: {
        includeFontPadding: false,
        fontFamily: Typography.FONT_FAMILY_BOLDITALIC,
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    }
};
