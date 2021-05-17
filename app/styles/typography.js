import { scaleFont } from './mixins';
// FONT FAMILY
// export const FONT_FAMILY_REGULAR = Platform.OS === "ios" ? "Helvetica Neue" : "Roboto";
export const FONT_FAMILY_BLACK = 'Roboto-Black';
export const FONT_FAMILY_BLACKITALIC = 'Roboto-BlackItalic';
export const FONT_FAMILY_BOLD = 'Roboto-Bold';
export const FONT_FAMILY_BOLDITALIC = 'Roboto-BoldItalic';
export const FONT_FAMILY_ITALIC = 'Roboto-Italic';
export const FONT_FAMILY_LIGHT = 'Roboto-Light';
export const FONT_FAMILY_LIGHTITALIC = 'Roboto-LightItalic';
export const FONT_FAMILY_MEDIUM = 'Roboto-Medium';
export const FONT_FAMILY_MEDIUMITALIC = 'Roboto-MediumItalic';
export const FONT_FAMILY_REGULAR = 'Roboto-Regular';
export const FONT_FAMILY_THIN = 'Roboto-Thin';
export const FONT_FAMILY_THINITALIC = 'Roboto-ThinItalic';

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_12 = scaleFont(12);
export const FONT_SIZE_10 = scaleFont(10);
export const FONT_SIZE_9 = scaleFont(9);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_18 = scaleFont(18);
export const LINE_HEIGHT_16 = scaleFont(16);

// FONT STYLE
export const FONT_REGULAR = {
    fontFamily: FONT_FAMILY_REGULAR,
    fontWeight: FONT_WEIGHT_REGULAR
};

export const FONT_BOLD = {
    fontFamily: FONT_FAMILY_BOLD,
    fontWeight: FONT_WEIGHT_BOLD
};

export const FONT_REGULAR_14 = {
    ...FONT_REGULAR,
    fontSize: FONT_SIZE_14
};

export const FONT_REGULAR_12 = {
    ...FONT_REGULAR,
    fontSize: FONT_SIZE_12
};

export const FONT_BOLD_14 = {
    ...FONT_BOLD,
    fontSize: FONT_SIZE_14
};

export const FONT_BOLD_12 = {
    ...FONT_BOLD,
    fontSize: FONT_SIZE_12
};
