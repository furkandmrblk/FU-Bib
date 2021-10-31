const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

// Base Colors

export const white: string = '#fff';
export const whiteTransparent: string = 'rgba(255, 255, 255, 0.4)';

export const black100: string = '#000000';
export const black80: string = '#2D2D2D';

export const gray100: string = '#E0E0E0';
export const gray80: string = '#FBFBFB';
export const grayTransparent: string = 'rgba(227, 227, 227, 0.7)';

// Primary Colors

export const purple100: string = '#5D5FEF';
export const purple80: string = '#7879F1';
export const purple60: string = '#A5A6F6';

export const peach100: string = '#FF5C58';
export const peach80: string = '#FF6B6B';
export const peach60: string = '#FE8F8F';

// Secondary Colors

export const greenTransparent: string = 'rgba(10, 205, 30, 0.175)';
export const emerald100: string = '#138900';
export const emerald80: string = '#41B82D';

export const crimson100: string = '#F10C0C';
export const crimson80: string = '#FF5050';

export default {
  light: {
    text: black100,
    background: white,
    tint: purple100,
    tabIconDefault: white,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: black100,
    background: white,
    tint: purple100,
    tabIconDefault: white,
    tabIconSelected: tintColorLight,
  },
};
